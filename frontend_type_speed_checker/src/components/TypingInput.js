import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * TypingInput
 * A controlled textarea for typing the sentence.
 * - Starts timer by parent on first keystroke
 * - Allows backspaces and extra characters
 * - Disabled when complete
 */
function TypingInput({ value, onChange, disabled, placeholder, ariaLabel }) {
  return (
    <div className="input-wrap">
      <textarea
        className="tsc-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        rows={3}
      />
    </div>
  );
}

TypingInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
};

TypingInput.defaultProps = {
  disabled: false,
  placeholder: '',
  ariaLabel: 'Typing input',
};

export default TypingInput;
