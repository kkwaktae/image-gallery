import { ReactNode } from 'react';
import reactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

function Portal({ children }: Props) {
  const modalRoot = document.getElementById('modal') as HTMLElement;
  return reactDom.createPortal(children, modalRoot);
}

export default Portal;
