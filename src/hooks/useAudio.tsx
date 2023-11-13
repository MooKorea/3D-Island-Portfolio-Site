import {useMemo, useEffect, useState} from "react";

const useAudio = (url:string) => {
    const audio = useMemo(() => new Audio(url), []);
    const [playing, setPlaying] = useState(false);

    const toggleAudio = () => setPlaying(!playing);
    const playAudio = () => setPlaying(true);
    const stopAudio = () => setPlaying(false);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return {playing, toggleAudio, playAudio, stopAudio};
};

export default useAudio;