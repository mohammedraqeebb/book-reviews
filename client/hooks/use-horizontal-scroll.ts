import React, { useState, useRef, useEffect } from 'react';

const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [lastX, setLastX] = useState(0);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setClicked(true);
      setLastX(event.clientX);
      console.log('mouse down triggered');
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setClicked(false);
      console.log('mouse up triggered');
    };

    const handleMouseMove = (event: MouseEvent) => {
      console.log('mouse move triggered');
      if (!clicked) return;
      console.log('mouse move triggered, clicked passed');

      const diff = lastX - event.clientX;
      containerRef.current!.scrollLeft += diff;
      setLastX(event.clientX);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('mouse leave run');
      setClicked(false);
    };

    const current = containerRef.current;
    if (!current) {
      return;
    }

    current.addEventListener('mousedown', handleMouseDown);
    current.addEventListener('mouseup', handleMouseUp);
    current.addEventListener('mousemove', handleMouseMove);
    current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      current.removeEventListener('mousedown', handleMouseDown);
      current.removeEventListener('mouseup', handleMouseUp);
      current.removeEventListener('mousemove', handleMouseMove);
    };
  }, [clicked, lastX]);

  return containerRef;
};

export default useHorizontalScroll;
