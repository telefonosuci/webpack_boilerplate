import React, { useState, useRef, useEffect } from "react";
import './musicPlayer.css';

/*
const tracks = [
    { title: "Song 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Song 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Song 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];*/

const tracks = [
    { title: "Song 1", src: "assets/music/SoundHelix-Song-1.mp3" },
    { title: "Song 2", src: "assets/music/SoundHelix-Song-2.mp3" },
    { title: "Song 3", src: "assets/music/SoundHelix-Song-3.mp3" }
];


export default function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(new Audio(tracks[currentTrack].src));

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };
    }, [currentTrack]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(tracks[currentTrack].src);
        audioRef.current.volume = volume;
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentTrack]);

    const playPauseHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const changeTrack = (direction) => {
        audioRef.current.pause();
        let newTrack = currentTrack + direction;
        if (newTrack < 0) newTrack = tracks.length - 1;
        if (newTrack >= tracks.length) newTrack = 0;
        setCurrentTrack(newTrack);
        audioRef.current = new Audio(tracks[newTrack].src);
        setCurrentTime(0);
        if (isPlaying) audioRef.current.play();
    };

    const toggleMute = () => {
        setIsMuted((prevMuted) => {
            const newMutedState = !prevMuted;
            audioRef.current.muted = newMutedState;
            return newMutedState;
        });
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div style={{margin: '0 auto'}} className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white rounded-lg shadow-lg w-80">


            <div className="musicplayer_trackbar">


                <div className="musicplayer_trackbar_currentsong">

                    <h2 className="text-xl font-bold mb-4 underline">{tracks[currentTrack].title}</h2>

                </div>


                <div className="musicplayer_trackbar_currenttime">
                    {/* Barra di avanzamento */}
                    <div className="w-full flex flex-col items-center">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full mt-2"
                        />
                        <div className="text-sm flex justify-between w-full">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>


                    <div className="flex gap-4 mt-4">
                        <button onClick={() => changeTrack(-1)} className="p-2 bg-gray-700 rounded-full">⏮</button>
                        <button onClick={playPauseHandler} className="p-2 bg-blue-600 rounded-full">{isPlaying ? "⏸" : "▶"}</button>
                        <button onClick={() => changeTrack(1)} className="p-2 bg-gray-700 rounded-full">⏭</button>
                    </div>

                </div>
                <div className="mt-4 w-full flex flex-col items-center">
                    <label className="text-sm">Volume: {Math.round(volume * 100)}%</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full mt-2"
                    />

                    <button onClick={toggleMute} className="p-2 bg-gray-700 rounded-full mt-2">
                        {isMuted ? "🔇" : volume > 0.5 ? "🔊" : "🔉"}
                    </button>
                </div>

            </div>

            <div className="mt-4">
                <h5 className="text-lg font-semibold">Song List</h5>
                <ol className="list-decimal list-inside mt-2">
                    {tracks.map((track, index) => (
                        <li key={index} className={`cursor-pointer ${index === currentTrack ? 'text-blue-400 underline' : 'text-white'}`} onClick={() => setCurrentTrack(index)}>
                            {track.title}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
