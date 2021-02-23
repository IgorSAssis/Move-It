import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

function Countdown() {

    const [time, setTime] = useState(22.5*60);
    const [isActive, setIsActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    const startCountdown = () => {

        setIsActive(true);

    }

    useEffect(() => {

        if (isActive && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }

    }, [isActive, time]);

    return (

        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <button 
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
            >
                Iniciar um ciclo
            </button>
        </div>

    );
}

export default Countdown;