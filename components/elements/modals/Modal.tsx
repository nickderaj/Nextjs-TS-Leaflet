import { closeAllModals } from '@/redux/slices/modalSlice';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

export interface IModal {
  children: React.ReactNode;
}

// <Modal>{children}</Modal> to separate modals into the modal-root div
export default function Modal({ children }: IModal) {
  const [modalRoot, setModalRoot] = useState<HTMLElement>();
  const dispatch = useDispatch();

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root') as HTMLElement);
  }, []);

  if (modalRoot)
    return createPortal(
      <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-30">
        <div
          className="bg-black/[0.5] z-40 absolute h-full w-full backdrop-blur-[1px]"
          onClick={() => dispatch(closeAllModals())}
        />
        {children}
      </div>,
      modalRoot
    );
  return <></>;
}
