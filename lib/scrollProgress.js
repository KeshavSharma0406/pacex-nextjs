// Mutable, module-level scroll progress (0-1 across current page's scrollable height).
// Updated by SmoothScroll on every Lenis scroll event, read directly inside
// CrystalScene's useFrame loop. Deliberately NOT React state — updating state
// every scroll frame would cause a re-render storm. R3F's render loop runs
// outside React anyway, so reading a plain mutable ref here is the correct,
// performant pattern.
export const scrollState = { progress: 0 };
