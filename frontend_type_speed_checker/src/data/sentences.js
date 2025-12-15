const SENTENCES = [
  'The quick brown fox jumps over the lazy dog.',
  'Typing speed improves with practice and patience.',
  'React makes it painless to create interactive UIs.',
  'Simplicity is the soul of efficiency.',
  'Always write code as if the person who ends up maintaining it will be a violent psychopath who knows where you live.',
  'A journey of a thousand miles begins with a single step.',
  'To be or not to be, that is the question.',
  'Perfection is not attainable, but if we chase perfection we can catch excellence.',
  'The only way to do great work is to love what you do.',
  'Do not count the days; make the days count.',
  'Every moment is a fresh beginning.',
  'The purpose of our lives is to be happy.',
  'Believe you can and you’re halfway there.',
  'Difficult roads often lead to beautiful destinations.',
  'It always seems impossible until it’s done.',
  'Success is not final; failure is not fatal: It is the courage to continue that counts.',
  'Quality is not an act, it is a habit.',
  'Don’t watch the clock; do what it does. Keep going.',
  'Simplicity is the ultimate sophistication.',
  'Knowledge is power.',
];

/**
 * PUBLIC_INTERFACE
 * getRandomSentence
 * Returns a random sentence from the local list.
 */
export function getRandomSentence() {
  const idx = Math.floor(Math.random() * SENTENCES.length);
  return SENTENCES[idx];
}

export default SENTENCES;
