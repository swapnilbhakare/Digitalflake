import React from "react";
import { createPortal } from "react-dom";

const Modal = ({
  onClose,
  children,
  direction = "top",

  position,
  backdropOpacity = 0.5,
}) => {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <>
      <div
        style={{ backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})` }}
        className={`fixed top-0 left-0 w-full h-full  z-20`}
        onClick={onClose}
      ></div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div className={`flex flex-col ${position} overflow-hidden`}>
          <div
            className={`transition-transform duration-300 ease-in-out ${
              direction === "top" ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
