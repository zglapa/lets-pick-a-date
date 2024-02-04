import { Dispatch, SetStateAction, useState } from 'react';
import styles from './IntervalTimer.module.css';
import useSound from 'use-sound';
const COUNTDOWN_BEEP = 'sounds/90s-game-ui-5-185098.mp3';
const END_BEEP = 'sounds/90s-game-ui-9-185102.mp3';

const MILISTOSEC = 1000;

export default function IntervalTimer() {
  const [length, setLength] = useState(10);
  const [sets, setSets] = useState(5);
  const [breakLength, setBreakLength] = useState(5);
  const [timer, setTimer] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  const [playCountdown] = useSound(COUNTDOWN_BEEP);
  const [playEnd] = useSound(END_BEEP);
  const startTimer = (value: number, next?: () => void) => {
    setTimer(value);
    const interval = setInterval(() => {
      setTimer((timer) => {
        if (timer === 1) {
          playEnd();
        } else if (timer <= 4) {
          playCountdown();
        }
        return timer - 1;
      });
    }, MILISTOSEC);
    setIntervalID(interval);
    setTimeoutID(
      setTimeout(
        () => {
          clearInterval(interval);
          next && next();
        },
        (value + 1) * MILISTOSEC
      )
    );
  };
  const startBreak = (setsLeft: number) => () => {
    startTimer(breakLength, startSet(setsLeft));
  };
  const startSet = (setsLeft: number) => () => {
    if (setsLeft === 0) {
      console.log('done');
      return;
    }
    console.log('start set', setsLeft);
    setSetIndex(setsLeft);
    startTimer(length, startBreak(setsLeft - 1));
  };
  const reset = () => {
    playEnd();
    setTimer(0);
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    if (intervalID) {
      clearInterval(intervalID);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2>Interval Timer</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.setters}>
          <Setter name="Interval length" value={length} setValue={setLength} step={5} />
          <Setter name="Break length" value={breakLength} setValue={setBreakLength} step={5} />
          <Setter name="Number of sets" value={sets} setValue={setSets} step={1} />
        </div>
        <div className={styles.timer}>
          <div className={styles.display}>
            <span className={styles.timerValue}>{timer}</span>
            <span className={styles.setValue}>{setIndex}</span>
          </div>
          <div className={styles.buttons}>
            <button onClick={startSet(sets)}>start</button>
            <button onClick={reset}>reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

type SetterProps = {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  step: number;
};

function Setter({ name, value, setValue, step }: SetterProps) {
  const [decrementDisabled, setDecrementDisabled] = useState(false);
  const increment = () => {
    setDecrementDisabled(false);
    setValue(value + step);
  };
  const decrement = () => {
    if (value - step === 0) {
      setDecrementDisabled(true);
    }
    setValue(value - step);
  };
  return (
    <div className={styles.setterContainer}>
      <h3>{name}</h3>
      <div className={styles.setter}>
        <button onClick={decrement} disabled={decrementDisabled}>
          -
        </button>
        <span>{value}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}
