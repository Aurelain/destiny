import fs from 'fs';
import fsExtra from 'fs-extra';
import esbuild from 'esbuild';

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
    fsExtra.emptyDirSync(OUTPUT_DIR);
    fsExtra.copySync('public', OUTPUT_DIR);

    const clientBundle = await createBundle('src/main.jsx', 'js/[name]-[hash]');
    const swBundle = await createBundle('sw/sw.js', '[name]');

    updateVersion(clientBundle, swBundle);
    updateIndex(clientBundle);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const createBundle = async (target, outputPattern) => {
    await esbuild.build({
        entryPoints: [target],
        bundle: true,
        minify: true,
        outdir: OUTPUT_DIR,
        entryNames: outputPattern,
        logLevel: 'info',
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

/**
 *
 */
const updateVersion = (clientBundle, swBundle) => {
    const hash = clientBundle.filePath.match(/-(\w+)\.js$/)[1];

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

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
run();
