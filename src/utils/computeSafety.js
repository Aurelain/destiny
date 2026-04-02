/**
 *
 */
const computeSafety = () => {
    const isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isApple) {
        return {
            top: 48, // Sufficient for most Dynamic Islands/Notches
            bottom: 32, // Sufficient for the iOS Home Indicator
        };
    }

    const div = document.createElement('div');

    // Set properties so we can measure both top and bottom
    div.style.paddingTop = 'env(safe-area-inset-top)';
    div.style.paddingBottom = 'env(safe-area-inset-bottom)';

    div.style.position = 'fixed';
    div.style.visibility = 'hidden';
    div.style.pointerEvents = 'none'; // Ensure it doesn't block clicks while briefly in DOM

    document.body.appendChild(div);

    const computedStyle = getComputedStyle(div);
    const insets = {
        top: parseInt(computedStyle.paddingTop) || 0,
        bottom: parseInt(computedStyle.paddingBottom) || 0,
    };

    document.body.removeChild(div);

    return insets;
};

export default computeSafety;
