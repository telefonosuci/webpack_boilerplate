import React, { useEffect, useState, useRef, useContext } from "react";
import { PlaylistContext } from "../../contexts/PlaylistProvider";


export default function TrackBar({audioRef}) {

  const {
      playlist,
      currentTrack,
      setCurrentTrack,
      isLoading,
      setIsLoading,
      isPlaying,
      setIsPlaying,
      isShuffle, setIsShuffle,
      currentTime, setCurrentTime,
      isMuted, setIsMuted,
      volume, setVolume,
      duration, setDuration
    } = useContext(PlaylistContext);

    const playPauseHandler = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.warn("Playback blocked", err));
      }
      setIsPlaying(!isPlaying);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSeek = (e) => {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;

      console.log("New time ", newTime);

      setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
    };

    const toggleMute = () => {
      setIsMuted((prevMuted) => {
        const newMutedState = !prevMuted;
        audioRef.current.muted = newMutedState;
        return newMutedState;
      });
    };

    const changeTrack = (direction) => {
      if (currentTime > 0 && direction < 0) audioRef.current.currentTime = 0;
      else {
        let newTrack =
          (currentTrack + direction + playlist.tracks.length) %
          playlist.tracks.length;
        setCurrentTrack(newTrack);
      }
    };

  return(
    <div className="musicplayer_trackbar">
        <div className="musicplayer_trackbar_currentsong p-2 flex">
          <img
            src={playlist.tracks[currentTrack].image}
            alt="Description"
            className="w-12 h-12 object-cover"
          />
          <h2 className="text-xl font-bold m-4 underline">
            {playlist.tracks[currentTrack].title}
          </h2>
        </div>

        <div className="musicplayer_trackbar_currenttime p-2">
          {/* Barra di avanzamento */}

          <div className="flex gap-4 justify-center">
            <button onClick={() => setIsShuffle(!isShuffle)} className="p-2">
              {isShuffle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 3h5v5M4 20l6-6M20 3l-8 8M4 4l6 6M16 21h5v-5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
                </svg>
              )}
            </button>
            <button onClick={() => changeTrack(-1)} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 5v14M19 19V5l-10 7 10 7z" />
              </svg>
            </button>

            <button
              onClick={playPauseHandler}
              className="p-2 w-10 h-10 bg-transparent border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              )}
            </button>
            <button onClick={() => changeTrack(1)} className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24px"
                height="24px"
              >
                <path d="M4 18V6l10 6-10 6zm12-12h2v12h-2V6z" />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="text-sm flex justify-between w-full">
                <span>{formatTime(currentTime)}</span>
                <span className="flex-grow mx-4">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full mt-2"
                  />
                </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="musicplayer_trackbar_volume p-2">
          <div className="w-full flex flex-col items-center">
            <div className="flex">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full mt-2"
              />

              <label className="mx-1 text-sm">
                {Math.round(volume * 100)}%
              </label>
            </div>
            <button onClick={toggleMute} className="p-2 mt-2">
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <line x1="22" y1="9" x2="16" y2="15"></line>
                  <line x1="16" y1="9" x2="22" y2="15"></line>
                </svg>
              ) : volume > 0.5 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M17 9a3 3 0 0 1 0 6"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
  );
};