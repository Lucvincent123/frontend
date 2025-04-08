import React, { useRef } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return <audio ref={audioRef} src={src} />;
};

export default AudioPlayer;
