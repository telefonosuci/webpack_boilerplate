import React, { useState, useRef, useEffect } from "react";
import "./musicPlayer.css";

const playlist = {
  title: "Your daily mix",
  description: "Your favourite music, plus some new discoveries you'll love.",
  owner: "Sintra",
  image: "assets/playlist_image.png",
  artists: ["Arctic Monkeys", "Dirty Pretty Things", "The Fratellis"],
  tracks: [
    { title: "Song 1", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { title: "Song 2", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Song 3", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Song 4", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { title: "Song 5", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "Song 6", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { title: "Song 7", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { title: "Song 8", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Song 9", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
  ]
};

export default function NewMusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio(playlist.tracks[currentTrack].src));



  // Added
  const [isShuffle, setIsShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);


  const getRandomTrack = () => {
    // return Math.floor(Math.random() * tracks.length);
    const validIndexes = playlist.tracks
      .map((_, index) => index)
      .filter((i) => i !== currentTrack);
    return validIndexes[Math.floor(Math.random() * validIndexes.length)];
  };

  useEffect(() => {
    // Preload all tracks
    playlist.tracks.forEach(track => {
      const audio = new Audio(track.src);
      audio.preload = "auto";
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    setIsLoading(true);
    audio.src = playlist.tracks[currentTrack].src;
    audio.load();

    const handleCanPlayThrough = () => {
      setIsLoading(false);
      if (isPlaying) {
        audio.play().catch(err => console.warn("Playback retry needed", err));
      }
    };

    const handleError = () => {
      console.warn("Error loading track. Retrying in 2 seconds...");
      setTimeout(() => {
        audio.load();
        if (isPlaying) audio.play().catch(() => {});
      }, 2000);
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);


    const updateTime = () => {
      //console.log("Timeupdate ", audio.currentTime);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateTime);
    //audio.addEventListener("progress", updateTime);


    audio.addEventListener("ended", () => {
      console.log("Track has finished playing.");

      let nextTrack;

      if (!isShuffle) {
        nextTrack = currentTrack + 1;
        console.log("Get next track, isshuffle is ", isShuffle);
      } else {
        nextTrack = getRandomTrack();
        console.log("Get random track, isshuffle is ", isShuffle);
        console.log("Get random track ", nextTrack);
      }
      setCurrentTrack(nextTrack);
    });

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
    };
  }, [currentTrack, isPlaying]);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.warn("Playback blocked", err));
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (direction) => {
    let newTrack = (currentTrack + direction + playlist.tracks.length) % playlist.tracks.length;
    setCurrentTrack(newTrack);
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

    console.log("New time ", newTime);

    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (

    <>



    <div
      style={{ margin: "0 auto" }}
      className="musicplayer flex flex-col items-center justify-center p-4 bg-gray-900 text-white shadow-lg bg-gradient-to-b from-gray-500 to-black"
    >
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
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className="p-2"
            >
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
            <button
              onClick={() => changeTrack(-1)}
              className="p-2"
            >
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
            <button
              onClick={() => changeTrack(1)}
              className="p-2"
            >
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




          {isLoading ?

            <div>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
            </div>

          :
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
          }



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
            <button
              onClick={toggleMute}
              className="p-2 mt-2"
            >
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

      <div className="musicplayer_playlist flex w-full">
        <div className="musicplayer_playlist_image">
          <img
            src={playlist.image}
            alt="Description"
            className="w-32 h-32 object-cover"
          />
        </div>

        <div className="musicplayer_playlist_data flex-grow mx-4">
          <h2 className="uppercase">Made for {playlist.owner}</h2>
          <h1>{playlist.title}</h1>
          <h3>{playlist.description}</h3>
          <div>
            {playlist.artists.map((artist, index) => (
              <span key={index} className="">
                {artist}
              </span>
            ))}
          </div>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition">
            PLAY
          </button>

        </div>
      </div>

      <div className="mt-4 w-full">

        <ol className="musicplayer_songlist list-decimal list-inside mt-2">
            <li className="musicplayer_songlistitem cursor-pointer m-3" >
              <div className="p-1 flex justify-between">
                <span>TITLE</span>
                <span>ARTIST</span>
                <span>ALBUM</span>
              </div>
            </li>

          {playlist.tracks.map((track, index) => (
            <li
              key={index}
              className={`musicplayer_songlistitem cursor-pointer m-3 ${
                index === currentTrack
                  ? "text-blue-400 underline"
                  : "text-white"
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <div className="p-1 flex justify-between">
                <span>{track.title}</span>
                <span>artist</span>

                <span>album</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>





    </>
  );
}
