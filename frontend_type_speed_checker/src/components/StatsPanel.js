import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * StatsPanel
 * Displays elapsed time, WPM, and accuracy.
 * Shows live updates while typing and final values on completion.
 */
function StatsPanel({ wpm, accuracy, elapsedSeconds, showFinal }) {
  const timeLabel = showFinal ? 'Total Time' : 'Elapsed';
  const wpmLabel = showFinal ? 'Final WPM' : 'WPM';
  const accLabel = showFinal ? 'Final Accuracy' : 'Accuracy';

  return (
    <section className="stats" aria-label="Typing statistics">
      <div className="stat">
        <div className="label">{timeLabel}</div>
        <div className="value primary">{elapsedSeconds.toFixed(1)}s</div>
      </div>
      <div className="stat">
        <div className="label">{wpmLabel}</div>
        <div className="value success">{wpm.toFixed(1)}</div>
      </div>
      <div className="stat">
        <div className="label">{accLabel}</div>
        <div className={`value ${accuracy >= 95 ? 'success' : accuracy >= 80 ? 'primary' : 'error'}`}>
          {accuracy.toFixed(1)}%
        </div>
      </div>
    </section>
  );
}

StatsPanel.propTypes = {
  wpm: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired,
  elapsedSeconds: PropTypes.number.isRequired,
  showFinal: PropTypes.bool.isRequired,
};

export default StatsPanel;
