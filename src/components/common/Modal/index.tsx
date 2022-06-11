import { ReactNode, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from 'store/atom';

import Portal from '../Portal';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: Props) {
  const [onModal, setOnModal] = useRecoilState(modalState);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (onModal && e.target.contains(modalRef.current)) setOnModal(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <Portal>
      <div
        role="presentation"
        className={styles.modalBackground}
        ref={modalRef}
      >
        <div className={styles.modalBox}>
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
