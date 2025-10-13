import React, { useMemo } from 'react';
import Lottie from 'lottie-react';
import LoadingAnimation from '../assets/Loading.json';

const LOTTIE_SIZE = 200;

const LoadingSpinner = () => {
  
  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed', 
      top: 0,
      left: 0,
      width: '100vw', 
      height: '100vh', 
      zIndex: 1000, 
    } as React.CSSProperties,
    
    lottie: {
      width: LOTTIE_SIZE,
      height: LOTTIE_SIZE,
    } as React.CSSProperties,
    
  }), []);

  return (
    <div style={styles.container}> 
      <Lottie 
        animationData={LoadingAnimation} 
        style={styles.lottie}
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default LoadingSpinner;