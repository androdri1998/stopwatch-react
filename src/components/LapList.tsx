interface LapListProps {
  laps: string[];
}

const LapList = ({ laps }: LapListProps) => {
  return (
    <section className="timer-laps">
      <h3>Laps:</h3>
      <ul>
        {laps.length === 0 && <div>No laps</div>}
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {laps.length - index}: {lap}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LapList;
