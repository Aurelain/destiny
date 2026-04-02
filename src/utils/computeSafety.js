/**
 *
 */
const computeSafety = () => {
    // Create hidden element:
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.visibility = 'hidden';
    div.style.pointerEvents = 'none';

    // Set properties so we can measure both top and bottom:
    div.style.paddingTop = 'env(safe-area-inset-top)';
    div.style.paddingBottom = 'env(safe-area-inset-bottom)';

    // Read properties:
    document.body.appendChild(div);
    const computedStyle = getComputedStyle(div);
    const insets = {
        top: parseInt(computedStyle.paddingTop) || 0,
        bottom: parseInt(computedStyle.paddingBottom) || 0,
    };
    document.body.removeChild(div);

    // Account for iPhone issues:
    if (/iPhone|iPad/i.test(navigator.userAgent) && !insets.top) {
        return {
            top: 48, // Sufficient for most Dynamic Islands/Notches
            bottom: 32, // Sufficient for the iOS Home Indicator
        };
    }

    return insets;
};

export default computeSafety;
