import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.show();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900 bg-opacity-70 backdrop-blur-md"></div>
      )}
      <dialog
        ref={dialog}
        className={`outline-none z-50 mt-10 py-10 rounded-xl bg-accent p-6 shadow-3xl w-[60%] ${className}`}
        onClose={onClose}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal")
  );
}
