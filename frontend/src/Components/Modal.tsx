import React from 'react';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div
        className='modal'
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <header className='modal-header'>
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </header>

        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
}
