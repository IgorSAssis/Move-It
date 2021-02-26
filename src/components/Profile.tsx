import { useContext } from "react";
import styles from "../styles/components/Profile.module.css";

import { ChallengesContext } from "../contexts/ChallengesContext";

function Profile() {

    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/IgorSAssis.png" alt="Igor Semphoski de Assis" />
            <div>
                <strong>Igor Semphoski de Assis</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}

export default Profile;