import fs from 'fs';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX_PATTERN = /const SX =[\s\S]*?;/;
const RULE_PATTERN = /([^\r\n]*):\s*{/g;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const EsbuildEmotionPlugin = {
    name: 'EsbuildEmotionPlugin',
    setup(build) {
        const isDev = build.initialOptions.sourcemap;
        if (isDev) {
            build.onLoad({filter: /\.jsx$/}, async (args) => {
                const code = await fs.promises.readFile(args.path, 'utf8');
                const sxMatch = code.match(SX_PATTERN);
                if (sxMatch) {
                    const sxWithLabels = sxMatch[0].replace(RULE_PATTERN, addLabel);
                    return {
                        contents: code.replace(SX_PATTERN, sxWithLabels),
                        loader: 'jsx',
                    };
                }
            });
        }
    },
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const addLabel = (found, ruleName) => {
    const label = ruleName.replace(/[^a-zA-Z0-9]/g, '');
    return `${ruleName}:{label:'${label}',`;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default EsbuildEmotionPlugin;
