// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const cloneShallow = (target, omitProperties) => {
    target = {...target};
    omitProperties = Array.isArray(omitProperties) ? omitProperties : [omitProperties];
    for (const property of omitProperties) {
        delete target[property];
    }
    return target;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default cloneShallow;
