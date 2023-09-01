import fs from 'fs';
import fsExtra from 'fs-extra';
import esbuild from 'esbuild';
import sendkeys from 'sendkeys-js';
import process from 'node:process';
import {hashElement} from 'folder-hash';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const OUTPUT_DIR = 'docs';
const BUILD_VERSION_MARKER = '$BUILD_VERSION';
const CLIENT_PATH_MARKER = '$CLIENT_PATH';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const run = async () => {
    const time = Date.now();
    const isDev = process.argv.includes('--dev');

    // Build fresh:
    fsExtra.emptyDirSync(OUTPUT_DIR);
    fsExtra.copySync('public', OUTPUT_DIR);
    const clientBundle = await createBundle('src/main.jsx', 'js/[name]-[hash]', isDev);
    const swBundle = await createBundle('sw/sw.js', '[name]', isDev);
    const {hash} = await hashElement(OUTPUT_DIR);

    // Inject version and cache filenames:
    // tweakClient(clientBundle);
    updateVersion(clientBundle, swBundle, hash);
    updateIndex(clientBundle);

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
const updateVersion = (clientBundle, swBundle, hash) => {
    const freshClientContent = clientBundle.content.replace(BUILD_VERSION_MARKER, hash);
    fs.writeFileSync(clientBundle.filePath, freshClientContent);

    const freshSwContent = swBundle.content.replace(BUILD_VERSION_MARKER, hash);
    fs.writeFileSync(swBundle.filePath, freshSwContent);
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
