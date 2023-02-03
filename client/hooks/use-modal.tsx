import React, { useState, useEffect, useRef } from 'react';

const useModal = (message: string) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowModal(false), 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  return showModal ? <div style={modalStyles}>{message}</div> : null;
};

const modalStyles = {
  top: 0,
  left: 0,
  right: 0,
  padding: '20px',
  background: '#eee',
  width: '150px',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

export default useModal;
