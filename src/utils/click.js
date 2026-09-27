export function clickRecursive(element) {
    if (element && typeof element.click === 'function') {
        element.click();
    } else if (element && element.parentElement) {
        clickRecursive(element.parentElement);
    }
}