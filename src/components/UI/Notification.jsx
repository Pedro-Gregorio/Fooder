import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const TIMER = 3000;

export default function Notification({ open, close, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.show(); // Use show() instead of showModal()
      console.log("TIMER SET");
      const timer = setTimeout(() => {
        dialog.current.close();
      }, TIMER);

      return () => {
        console.log("Cleaning up timer");
        clearTimeout(timer);
      };
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="outline-none z-30 fixed mt-10 py-5 rounded-xl bg-accent p-6 shadow-3xl w-fit"
      ref={dialog}
      onClose={close}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        {open ? children : null}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
