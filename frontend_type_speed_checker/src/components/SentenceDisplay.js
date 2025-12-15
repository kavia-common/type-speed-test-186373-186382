import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * SentenceDisplay
 * Renders the target sentence with live feedback:
 * - correct chars highlighted with subtle success background
 * - incorrect chars underlined in red
 * - pending chars muted
 * - current caret position highlighted
 */
function SentenceDisplay({ target, input, complete }) {
  const chars = target.split('');
  const inputChars = input.split('');
  const len = Math.max(chars.length, inputChars.length);

  const parts = [];
  for (let i = 0; i < len; i += 1) {
    const expected = chars[i] ?? '';
    const given = inputChars[i] ?? '';

    let className = 'pending';
    if (i < inputChars.length) {
      if (given === expected) className = 'correct';
      else className = 'incorrect';
    }

    // caret position visual at next position to type if not complete
    const isCaret = !complete && i === inputChars.length;

    parts.push(
      <span
        key={`ch-${i}`}
        className={`${className}${isCaret ? ' caret' : ''}`}
        aria-hidden="true"
      >
        {expected || ''}
      </span>
    );
  }

  return (
    <div className="sentence" aria-live="polite" aria-label="Target sentence">
      {parts}
    </div>
  );
}

SentenceDisplay.propTypes = {
  target: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
};

export default SentenceDisplay;
