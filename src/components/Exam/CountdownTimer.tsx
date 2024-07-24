import { useEffect, useState, CSSProperties } from 'react';

interface CountdownTimerProps {
    initialHours: number;
    initialMinutes: number;
    initialSeconds: number;
}

export const CountdownTimer = ({ initialHours, initialMinutes, initialSeconds }: CountdownTimerProps) => {
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (seconds === 0) {
                if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else if (minutes === 0) {
                    if (hours > 0) {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    } else {
                        clearInterval(timer);
                    }
                }
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [hours, minutes, seconds]);

    const timeStyle: CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
    };

    const timeUpStyle: CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'red',
    };

    return (
        <div>
            {hours === 0 && minutes === 0 && seconds === 0 ? (
                <span style={timeUpStyle}>Time's up!</span>
            ) : (
                <span style={timeStyle}>
                    {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            )}
        </div>
    );
};
