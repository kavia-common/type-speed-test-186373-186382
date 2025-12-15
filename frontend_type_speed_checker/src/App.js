import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import './index.css';
import SentenceDisplay from './components/SentenceDisplay';
import TypingInput from './components/TypingInput';
import StatsPanel from './components/StatsPanel';
import { getRandomSentence } from './data/sentences';
import { calculateAccuracy, calculateWPM, clamp } from './utils/metrics';

// PUBLIC_INTERFACE
function App() {
  /**
   * A complete Type Speed Checker app.
   * - Shows a random sentence
   * - Accepts user input with live per-character feedback
   * - Starts timer on first keystroke
   * - Computes WPM and accuracy on completion
   * - Offers Reset (same sentence) and Try another (new sentence)
   * - Modern light theme styling, no external libs, all client-side
   */
  const [target, setTarget] = useState(getRandomSentence());
  const [input, setInput] = useState('');
  const [startedAt, setStartedAt] = useState(null); // Date or null
  const [endedAt, setEndedAt] = useState(null); // Date or null
  const [isComplete, setIsComplete] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [theme] = useState('light'); // fixed light per requirement theme guide (can be extended)

  const timerRef = useRef(null);

  // Keep root themed for potential future use
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const trimmedTarget = useMemo(() => target.trim(), [target]);

  // Start timer on first keystroke
  useEffect(() => {
    if (input.length > 0 && !startedAt) {
      const now = new Date();
      setStartedAt(now);
      timerRef.current = setInterval(() => {
        setElapsedMs(prev => prev + 100);
      }, 100);
    }
    return () => {};
  }, [input.length, startedAt]);

  // Stop timer when complete
  useEffect(() => {
    if (isComplete && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [isComplete]);

  // Compute completion whenever input matches or exceeds target (ignoring leading/trailing whitespace).
  useEffect(() => {
    const normalizedInput = input.trimEnd();
    const isDone =
      normalizedInput.length >= trimmedTarget.length &&
      normalizedInput.slice(0, trimmedTarget.length) === trimmedTarget;

    if (isDone && !isComplete) {
      setIsComplete(true);
      setEndedAt(new Date());
    }
  }, [input, trimmedTarget, isComplete]);

  const totalTyped = input.length;
  const correctChars = useMemo(() => {
    // Count correct characters positionally against target
    const maxCompare = Math.min(totalTyped, trimmedTarget.length);
    let count = 0;
    for (let i = 0; i < maxCompare; i += 1) {
      if (input[i] === trimmedTarget[i]) count += 1;
    }
    return count;
  }, [input, trimmedTarget, totalTyped]);

  const elapsedForStatsMs = useMemo(() => {
    if (!startedAt) return 0;
    if (isComplete && endedAt) {
      return Math.max(endedAt - startedAt, 0);
    }
    // While typing
    return elapsedMs;
  }, [startedAt, isComplete, endedAt, elapsedMs]);

  const wpm = useMemo(() => {
    return calculateWPM(correctChars, elapsedForStatsMs);
  }, [correctChars, elapsedForStatsMs]);

  const accuracy = useMemo(() => {
    return calculateAccuracy(correctChars, totalTyped);
  }, [correctChars, totalTyped]);

  // PUBLIC_INTERFACE
  const onChangeInput = (val) => {
    // Allow backspace edits and extra chars beyond length
    setInput(val);
  };

  // PUBLIC_INTERFACE
  const onReset = () => {
    // Restart same sentence
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setInput('');
    setStartedAt(null);
    setEndedAt(null);
    setElapsedMs(0);
    setIsComplete(false);
  };

  // PUBLIC_INTERFACE
  const onTryAnother = () => {
    onReset();
    setTarget(getRandomSentence());
  };

  const elapsedSeconds = clamp((elapsedForStatsMs || 0) / 1000, 0, Number.POSITIVE_INFINITY);

  return (
    <div className="App themeroot" data-theme={theme}>
      <main className="tsc-page">
        <div className="tsc-card" role="region" aria-label="Type Speed Checker">
          <h1 className="tsc-title">Type Speed Checker</h1>
          <p className="tsc-subtitle">Type the sentence below as quickly and accurately as you can.</p>

          <SentenceDisplay target={trimmedTarget} input={input} complete={isComplete} />

          <TypingInput
            value={input}
            onChange={onChangeInput}
            disabled={isComplete}
            placeholder="Start typing here..."
            ariaLabel="Typing input area"
          />

          <div className="tsc-actions">
            <button className="btn btn-secondary" type="button" onClick={onReset}>
              Reset
            </button>
            <button className="btn btn-primary" type="button" onClick={onTryAnother}>
              Try another
            </button>
          </div>

          <StatsPanel
            wpm={wpm}
            accuracy={accuracy}
            elapsedSeconds={elapsedSeconds}
            showFinal={isComplete}
          />
        </div>

        <footer className="tsc-footer">
          No data is sent to any server. Everything runs locally in your browser.
        </footer>
      </main>
    </div>
  );
}

export default App;
