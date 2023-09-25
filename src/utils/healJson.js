import Ajv from 'ajv';
import assume from './assume.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ajv = new Ajv();

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const healJson = (json, schema) => {
    const validate = ajv.compile(schema);
    const id = schema['$id'];
    let errorFingerprint = '';
    let errorCount = 0;

    while (true) {
        if (validate(json)) {
            // The json is now healed. Praise be!
            return;
        }

        errorCount++;
        assume(errorCount < 100, 'Too many errors!');

        const [error] = validate.errors; // we're only interested in the first error
        const freshFingerprint = JSON.stringify(error, null, 4);
        assume(errorFingerprint !== freshFingerprint, 'Repeated error!');
        errorFingerprint = freshFingerprint;

        const {keyword, dataPath, params, schemaPath} = error;
        console.log('error:', error);
        console.log('schemaPath:', schemaPath);
        switch (keyword) {
            case 'enum': // fall-through
            case 'minLength': {
                const prop = schemaPath.match(/(\w+)\/\w+$/)[1];
                const completeAddress = id + schemaPath.replace(/\/\w+$/, '');
                const dataParentPath = dataPath.replace(/\.\w+$/, '');
                // const dataParent = eval('json' + dataParentPath);
                const dataParent = getDeep(json, dataParentPath);

                const value = chooseValue(completeAddress);
                dataParent[prop] = value;
                console.warn(`Changed: ${dataParentPath.substr(1)}[${prop}] = ${JSON.stringify(value)}`);

                break;
            }
            case 'type': {
                const match = dataPath.match(/\[(\d+)]$|\.(\w+)$/);
                const key = match[1] || match[2];
                const dataParentPath = dataPath.replace(/\[\d+]$|\.\w+$/, '');
                // const dataParent = eval('json' + dataParentPath);
                const dataParent = getDeep(json, dataParentPath);

                const completeAddress = id + schemaPath.replace(/\/\w+$/, '');
                const value = chooseValue(completeAddress);
                dataParent[key] = value === null ? {} : value;
                console.warn(`Changed: ${dataParentPath.substr(1)}[${key}] = ${JSON.stringify(dataParent[key])}`);

                break;
            }
            case 'required': {
                const prop = params.missingProperty;
                const completeAddress = id + schemaPath.replace(/\w+$/, `properties/${prop}`);
                //  const dataParent = eval('json' + dataPath);
                const dataParent = getDeep(json, dataPath);

                const value = chooseValue(completeAddress);
                dataParent[prop] = value;
                console.warn(`Added: ${dataPath.substr(1)}[${prop}] = ${JSON.stringify(value)}`);

                break;
            }
            case 'additionalProperties': {
                //const dataParent = eval('json' + dataPath);
                const dataParent = getDeep(json, dataPath);
                delete dataParent[params.additionalProperty];
                console.warn(`Removed: ${dataPath.substr(1)}[${params.additionalProperty}]`);
                errorCount--;
                break;
            }
            case 'minItems': {
                // const dataParent = eval('json' + dataPath);
                const dataParent = getDeep(json, dataPath);
                const completeAddress = id + schemaPath.replace(/\w+$/, 'items');
                const itemsSchema = ajv.getSchema(completeAddress).schema;

                const defaultValue = itemsSchema.default || {};
                dataParent.push(defaultValue);
                const prop = `${dataPath.substr(1)}[${dataParent.length - 1}]`;
                console.warn(`Pushed: ${prop} = ${JSON.stringify(defaultValue)}`);

                break;
            }
            case 'const': // fall-through
            case 'minimum': // fall-through
            case 'maximum': {
                const prop = dataPath.match(/\w+$/)[0];
                const dataParentPath = dataPath.replace(/\.\w+$/, '');
                //const dataParent = eval('json' + dataParentPath);
                const dataParent = getDeep(json, dataParentPath);

                const completeAddress = id + schemaPath.replace(/\w+$/, '');
                const subSchema = ajv.getSchema(completeAddress).schema;
                dataParent[prop] = subSchema[keyword];
                console.warn(`Changed: ${prop} = ${subSchema[keyword]}`);

                break;
            }
            default: {
                console.warn('Unknown error!', errorFingerprint);
            }
        }
    }
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const getSubSchema = (completeAddress) => {
    const subSchema = ajv.getSchema(completeAddress).schema;
    assume(subSchema, `Cannot find schema at ${completeAddress}!`);
    return subSchema;
};

/**
 *
 */
const chooseValue = (completeAddress) => {
    const {type, default: defaultValue} = getSubSchema(completeAddress);
    if (defaultValue === undefined) {
        switch (type) {
            case 'array':
                return [];
            case 'object':
                return {};
            default:
                assume(false, `Missing default in ${completeAddress}!`);
                return;
        }
    }
    return defaultValue;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default healJson;
