import { createContext, useState, ReactNode, useEffect } from "react";

import challengesList from "../challenges.json";

interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: "Body" | "Eye",
    description: String,
    amount: number
}

interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challengesList.length);
        const randomChallenge = challengesList[randomChallengeIndex];

        setActiveChallenge(randomChallenge);

        new Audio("/notification.mp3").play();

        if (Notification.permission === "granted") {
            new Notification("Novo desafio", {
                body: `Valendo ${randomChallenge.amount}!`
            })
        }

    }

    function resetChallenge () {
        setActiveChallenge(null);
    }

    function completeChallenge () {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            levelUp();
            finalExperience -= experienceToNextLevel;
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}