// components/Modal.js
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95 -translate-y-10"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 -translate-y-10"
        >
          <div className="fixed inset-0 flex items-center justify-center p-2">
            <Dialog.Panel className="bg-stone-800 bg-opacity-90 px-8 py-4 rounded-lg shadow-xl w-full max-w-md">
              {children}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
