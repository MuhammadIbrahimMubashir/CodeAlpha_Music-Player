"use client";

import { useEffect, useRef, useState } from "react";

const songs = [
  {
    title: "Chal Diye Tum Kahan",
    artist: "Aur",
    src: "/songs/a.mp4",
    cover: "/covers/a.jpg",
  },
  {
    title: "Hasi",
    artist: "Ami Mishra, Shreya Ghoshal",
    src: "/songs/b.mp4",
    cover: "/covers/b.jpg",
  },
  {
    title: "Ilahi",
    artist: "Arijit Singh",
    src: "/songs/c.mp4",
    cover: "/covers/c.jpg",
  },
  {
    title: "Tu Maan Meri Jaan",
    artist: "King",
    src: "/songs/d.mp4",
    cover: "/covers/d.jpg",
  },
  {
    title: "Pal Pal",
    artist: "Ali Soomro",
    src: "/songs/e.mp4",
    cover: "/covers/e.jpg",
  },
  {
    title: "Pheli Dafa",
    artist: "Atif Aslam",
    src: "/songs/f.mp4",
    cover: "/covers/f.jpg",
  },
  {
    title: "Raanjhanaa",
    artist: "Parampara Thakur",
    src: "/songs/g.mp4",
    cover: "/covers/g.jpg",
  },
  {
    title: "Sooraj Dooba Hain",
    artist: "Arijit Singh, Aditi Singh Sharma",
    src: "/songs/h.mp4",
    cover: "/covers/h.jpg",
  },
  {
    title: "Suniyan Suniyan",
    artist: "Juss",
    src: "/songs/i.mp4",
    cover: "/covers/i.jpg",
  },
  {
    title: "Ye Tune Kya Kiya",
    artist: "Javed Bashir",
    src: "/songs/j.mp4",
    cover: "/covers/j.jpg",
  },
];

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const loadSong = (index: number) => {
    setCurrentSong(index);
    const audio = audioRef.current;
    if (audio) {
      audio.src = songs[index].src;
      audio.load();
      if (isPlaying) audio.play();
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const playNext = () => {
    const next = (currentSong + 1) % songs.length;
    loadSong(next);
    setIsPlaying(true);
  };

  const playPrev = () => {
    const prev = (currentSong - 1 + songs.length) % songs.length;
    loadSong(prev);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = parseFloat(e.target.value);
    }
  };

  useEffect(() => {
    loadSong(currentSong);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-800/70 to-gray-900/80 backdrop-blur-md p-8 rounded-3xl w-full max-w-md shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-gray-700/50 text-center transition-all">
        {/* Cover Image */}
        <img
          src={songs[currentSong].cover}
          alt={songs[currentSong].title}
          className="w-56 h-40 object-fit mx-auto rounded-xl shadow-lg mb-4 border border-gray-700 hover:scale-105 transition-transform duration-300"
        />

        {/* Song Info */}
        <h2 className="text-3xl font-semibold mb-1 tracking-wide">
          {songs[currentSong].title}
        </h2>
        <p className="text-md text-gray-400 mb-6 italic">
          {songs[currentSong].artist}
        </p>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={playNext}
        />

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 my-6">
          <button
            onClick={playPrev}
            className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-md hover:shadow-purple-500/30 transition duration-300 text-2xl"
          >
            ⏮️
          </button>
          <button
            onClick={togglePlay}
            className="bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-purple-400/40 transition duration-300 text-3xl scale-105"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={playNext}
            className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-md hover:shadow-purple-500/30 transition duration-300 text-2xl"
          >
            ⏭️
          </button>
        </div>

        {/* Slider */}
        <div className="flex items-center gap-3 text-sm text-gray-300 mb-5">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-full bg-gray-700 accent-purple-500 transition-all"
          />
          <span className="w-10 text-left">{formatTime(duration)}</span>
        </div>

        {/* Playlist */}
        <ul className="space-y-2 text-left max-h-48 overflow-y-auto px-2 custom-scrollbar">
          {songs.map((song, index) => (
            <li
              key={index}
              onClick={() => loadSong(index)}
              className={`cursor-pointer px-4 py-3 rounded-xl transition duration-300 ${
                index === currentSong
                  ? "bg-purple-600/90 text-white shadow-md shadow-purple-800"
                  : "hover:bg-gray-700/80"
              }`}
            >
              <strong className="block text-base">{song.title}</strong>
              <span className="text-xs text-gray-400">{song.artist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
