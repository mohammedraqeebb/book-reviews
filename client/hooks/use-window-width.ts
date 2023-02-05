import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(500);
  useEffect(() => {
    setWidth(window.innerWidth);
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return width;
};

export default useWindowWidth;
