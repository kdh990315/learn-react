import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge(props) {
  const [timeRemaining, setTimeRemaining] = useState(props.targetTime * 1000);

  const timer = useRef();
  const dialog = useRef();

  const timerActive =
    timeRemaining > 0 && timeRemaining < props.targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    setTimeRemaining(props.targetTime * 1000);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(props.targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaing) => prevTimeRemaing - 10);
    }, props.targetTime * 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={props.targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      ></ResultModal>

      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerActive ? "active" : undefined}>
          {timerActive ? "Time is running" : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
