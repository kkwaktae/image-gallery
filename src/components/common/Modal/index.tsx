import { ReactNode } from 'react';
import Portal from '../Portal';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: Props) {
  return (
    <Portal>
      <div
        role="presentation"
        className={styles.modalBackground}
        onClick={onClose}
      >
        <div className={styles.modalContent}>
          {children}
          <button type="button" className={styles.close} onClick={onClose}>
            close
          </button>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
