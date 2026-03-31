import fs from 'fs';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const EsbuildMuteReact = {
    name: 'EsbuildMuteReact',
    setup(build) {
        const isDev = build.initialOptions.sourcemap;
        if (isDev) {
            build.onLoad({filter: /react-dom\.development\.js$/}, async (args) => {
                const original = await fs.promises.readFile(args.path, 'utf8');
                let code = original;
                code = code.replace(/(console.info[^)]*You might need to use a local HTTP)/, 'false && $1');
                code = code.replace(/(console.info[^)]*Download the React DevTools)/, 'false && $1');
                if (code === original) {
                    console.log(args.path);
                    throw new Error('The EsbuildMuteReact plugin did nothing!');
                }
                return {
                    contents: code,
                    loader: 'js',
                };
            });
        }
    },
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default EsbuildMuteReact;
