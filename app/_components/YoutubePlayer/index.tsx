'use client';

import { useState } from 'react';
import styles from './index.module.css';

type Props = {
  videoId: string;
};

export default function YoutubePlayer({ videoId }: Props) {
  const [playing, setPlaying] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={styles.wrap}>
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0`}
          title="NEXTGAME PV"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        />
      ) : (
        <div className={styles.thumbnail} onClick={() => setPlaying(true)}>
          <img
            src={thumbnail}
            alt="NEXTGAME PV"
            className={styles.thumbnailImg}
          />
          <div className={styles.playButton}>
            <svg viewBox="0 0 68 48" className={styles.playIcon}>
              <path
                d="M66.5 7.7c-.8-2.9-2.9-5.1-5.8-5.8C55.8 .7 34 .7 34 .7S12.2.7 7.3 1.9C4.4 2.6 2.3 4.9 1.5 7.7.3 12.6.3 24 .3 24s0 11.4 1.2 16.3c.8 2.9 2.9 5.1 5.8 5.8C12.2 47.3 34 47.3 34 47.3s21.8 0 26.7-1.2c2.9-.7 5-2.9 5.8-5.8 1.2-4.9 1.2-16.3 1.2-16.3s0-11.4-1.2-16.3z"
                fill="rgba(0,0,0,0.7)"
              />
              <path d="M27 33l18-9-18-9v18z" fill="#fff" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
