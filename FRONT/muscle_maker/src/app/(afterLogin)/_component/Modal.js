import React from "react";
import styles from "./Modal.module.css"; // 스타일 파일 경로, 실제 경로에 맞게 조정하세요.

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalBackground} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
