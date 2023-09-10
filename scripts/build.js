import fs from 'fs';
import fsExtra from 'fs-extra';
import esbuild from 'esbuild';
import sendkeys from 'sendkeys-js';
import process from 'node:process';
import {hashElement} from 'folder-hash';
import findFiles from './utils/findFiles.js';
import EsbuildEmotionPlugin from './plugins/EsbuildEmotionPlugin.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const OUTPUT_DIR = 'docs';
const BUILD_VERSION_MARKER = '@BUILD_VERSION';
const CLIENT_PATH_MARKER = '@CLIENT_PATH';
const CACHED_PATHS_MARKER = '@CACHED_PATHS';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const run = async () => {
    const time = Date.now();
    const isDev = process.argv.includes('--dev');
    // const isDev = false;

    // Build fresh:
    fsExtra.emptyDirSync(OUTPUT_DIR);
    fsExtra.copySync('public', OUTPUT_DIR);
    const clientBundle = await createBundle('src/main.jsx', 'js/[name]', isDev);
    const swBundle = await createBundle('sw/sw.js', '[name]', isDev);

    // Rename `main.js`:
    const {hash} = await hashElement(OUTPUT_DIR);
    const cleanHash = hash.replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
    renameClient(clientBundle, cleanHash);

    // Inject version and cache filenames:
    // tweakClient(clientBundle);
    updateVersion(clientBundle, swBundle, cleanHash);
    updateCachedPaths(swBundle);
    updateIndex(clientBundle);
    fs.writeFileSync(clientBundle.filePath, clientBundle.content);
    fs.writeFileSync(swBundle.filePath, swBundle.content);

    console.log(`Done in ${Date.now() - time} ms.`);
    await refreshBrowser();
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const createBundle = async (target, outputPattern, isDev) => {
    await esbuild.build({
        entryPoints: [target],
        bundle: true,
        minify: !isDev,
        sourcemap: isDev,
        outdir: OUTPUT_DIR,
        entryNames: outputPattern,
        // logLevel: 'info',
        legalComments: 'none',
        jsx: 'automatic', // this option, along with the next one, allow us to avoid using the jsx emotion pragma
        jsxImportSource: '@emotion/react',
        plugins: [EsbuildEmotionPlugin],
    });

    const filePath = getOutputFilePath(outputPattern);
    return {
        filePath,
        content: fs.readFileSync(filePath, 'utf8'),
    };
};

/**
 *
 */
const getOutputFilePath = (outputPattern) => {
    const parentDirPath = (OUTPUT_DIR + '/' + outputPattern).replace(/\/[^/]*$/, '');
    const fileNames = fs.readdirSync(parentDirPath);
    for (const fileName of fileNames) {
        if (fileName.endsWith('.js')) {
            return parentDirPath + '/' + fileName;
        }
    }
};

/*
const tweakClient = (clientBundle) => {
    const freshClientContent = clientBundle.content.replace('console.info', 'false&&console.info');
    clientBundle.content = freshClientContent;
};*/

/**
 *
 */
const renameClient = (clientBundle, hash) => {
    const freshFilePath = clientBundle.filePath.replace('main.js', `main-${hash}.js`);
    fs.renameSync(clientBundle.filePath, freshFilePath);
    const mapFilePath = clientBundle.filePath + '.map';
    if (fs.existsSync(mapFilePath)) {
        const freshMapFilePath = mapFilePath.replace('main.js', `main-${hash}.js`);
        fs.renameSync(mapFilePath, freshMapFilePath);
    }
    clientBundle.filePath = freshFilePath;
    clientBundle.content = clientBundle.content.replace('main.js.map', `main-${hash}.js.map`);
};

/**
 *
 */
const updateVersion = (clientBundle, swBundle, hash) => {
    clientBundle.content = clientBundle.content.replace(BUILD_VERSION_MARKER, hash);
    swBundle.content = swBundle.content.replace(BUILD_VERSION_MARKER, hash);
};

/**
 *
 */
const updateCachedPaths = (swBundle) => {
    const filePaths = findFiles(OUTPUT_DIR);
    const outputDirNameLength = OUTPUT_DIR.length;
    const relativePaths = filePaths.map((filePath) => filePath.substring(outputDirNameLength));
    const cachedPaths = relativePaths.filter((relativePath) => !relativePath.includes('/sw.js'));
    cachedPaths.unshift('/');
    const cachedPathsMarkerRegExp = new RegExp(`['"]${CACHED_PATHS_MARKER}['"]`);
    swBundle.content = swBundle.content.replace(cachedPathsMarkerRegExp, JSON.stringify(cachedPaths));
};

/**
 *
 */
const updateIndex = (clientBundle) => {
    const indexPath = OUTPUT_DIR + '/index.html';
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const relativePath = clientBundle.filePath.substring(OUTPUT_DIR.length + 1);
    const freshIndexContent = indexContent.replace(CLIENT_PATH_MARKER, relativePath);
    fs.writeFileSync(indexPath, freshIndexContent);
};

/**
 *
 */
const refreshBrowser = async () => {
    await sendkeys.activate('Google Chrome');
    sendkeys.send('^r');
    await sendkeys.activate('destiny –'); // reactivate WebStorm
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
run();
