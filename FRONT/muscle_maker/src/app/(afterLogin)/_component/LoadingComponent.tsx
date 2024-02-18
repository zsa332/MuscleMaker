import React from 'react';
import styles from './loading.module.css';

const CircularLoading3D: React.FC = () => {
  const loadingText = "Loading...".split('');

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.circular3D}>
        {loadingText.map((letter, index) => (
          <div key={index} className={styles.letter3D} style={{
            transform: `rotateY(${index * (360 / loadingText.length)}deg) translateZ(100px)`
          }}>
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularLoading3D;
