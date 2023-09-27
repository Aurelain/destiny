import Ajv from 'ajv';

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
const validateJson = (json, schema) => {
    const validate = ajv.compile(schema);
    if (!validate(json)) {
        const [error] = validate.errors; // get the first error
        throw new Error(JSON.stringify(error.instancePath + ' ' + error.message));
    }
    return json;
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default validateJson;
