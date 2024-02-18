// components/FollowModal.tsx
import React from 'react';
import styles from './FollowModal.module.css'; // CSS 모듈 import

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FollowModal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default FollowModal;
