import styles from "../styles/components/Profile.module.css";

function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/IgorSAssis.png" alt="Igor Semphoski de Assis" />
            <div>
                <strong>Igor Semphoski de Assis</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 01
                </p>
            </div>
        </div>
    );
}

export default Profile;