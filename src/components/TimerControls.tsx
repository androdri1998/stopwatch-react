interface TimerControlsProps {
  onStart: () => void;
  onStop: () => void;
  timerOn: boolean;
  onReset: () => void;
  onLap: () => void;
}

const TimerControls = ({
  onStart,
  onStop,
  timerOn,
  onReset,
  onLap,
}: TimerControlsProps) => {
  return (
    <section className="timer-controls">
      {!timerOn && (
        <button className="timer-controls__start" onClick={onStart}>
          Start
        </button>
      )}
      {timerOn && (
        <button className="timer-controls__start" onClick={onStop}>
          Pause
        </button>
      )}
      {timerOn && (
        <button className="timer-controls__lap" onClick={onLap}>
          Lap
        </button>
      )}
      <button className="timer-controls__stop" onClick={onReset}>
        Reset
      </button>
    </section>
  );
};

export default TimerControls;
