interface TimerDisplayPro {
  time: string;
}

const TimerDisplay = ({ time }: TimerDisplayPro) => {
  return <h1 className="timer-display">{time}</h1>;
};

export default TimerDisplay;
