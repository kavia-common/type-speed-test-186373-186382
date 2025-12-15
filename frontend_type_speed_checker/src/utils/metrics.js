 /**
  * PUBLIC_INTERFACE
  * calculateWPM
  * WPM = (correct characters / 5) / elapsed minutes.
  * If elapsedMs is 0, returns 0.
  */
export function calculateWPM(correctChars, elapsedMs) {
  if (!elapsedMs || elapsedMs <= 0) return 0;
  const words = correctChars / 5;
  const minutes = elapsedMs / 60000;
  return words / minutes;
}

/**
 * PUBLIC_INTERFACE
 * calculateAccuracy
 * Accuracy = (correct characters / total typed characters) * 100
 * If totalTyped is 0, returns 100 (no errors yet).
 */
export function calculateAccuracy(correctChars, totalTyped) {
  if (!totalTyped || totalTyped <= 0) return 100;
  return (correctChars / totalTyped) * 100;
}

/**
 * PUBLIC_INTERFACE
 * clamp
 * Utility to clamp numbers within range.
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
