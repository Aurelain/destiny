import {execSync} from 'child_process';

/**
 *
 */
const run = async () => {
    execSync('vite build', {stdio: 'inherit'});
    execSync('esbuild sw/sw.js --bundle --minify --outdir=docs --allow-overwrite', {stdio: 'inherit'});
};

run();
