import '@testing-library/jest-dom/extend-expect';
global.ResizeObserver = require('resize-observer-polyfill');

/**
 * fixing an issue with jest-axe
 * https://github.com/nickcolley/jest-axe/issues/147
 */
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
