import sleep from '../utils/sleep.js';
import {execSync} from 'child_process';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const preview = async () => {
    const browserId = findBrowser();
    if (!browserId) {
        console.log('Could not find browser!');
        return;
    }
    try {
        const editorId = execSync(`xdotool getwindowfocus`).toString().match(/\w+/)[0];
        execSync(`xdotool windowactivate ${browserId}`);
        await sleep(100);
        execSync(`xdotool key ctrl+r`);
        await sleep(100);
        execSync(`xdotool windowactivate ${editorId}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const findBrowser = () => {
    try {
        return execSync(`xdotool search --name " Chromium$"`).toString().match(/\w+/)[0];
    } catch (error) {
        // console.error('Error:', error.message);
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default preview;
