import React from "react";
import ReactDOM from "react-dom";
import { BiError } from "react-icons/bi";
import { DELETE_DATA } from "../../store/actions/action_types";

const modalStyles = {
  top: "0px",
  left: "0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "90%",
};

const Modal = ({ show, close }) => {
  //modal-state

  return ReactDOM.createPortal(
    <>
      {show && (
        <main
          id="confirmation-modal"
          className="antialiased text-gray-900 font-sans overflow-x-hidden"
        >
          <div
            style={modalStyles}
            className="fixed px-4 md:flex md:items-center md:justify-center z-10"
          >
            <div className="bg-black opacity-25 w-full fixed z-10 inset-0"></div>
            <div className="bg-white rounded-lg p-4 z-50 mb-4 mx-4">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <BiError className="text-3xl" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Delete the Post!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Are you sure do you want to delete this post. This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={() => close(DELETE_DATA)}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete Post
                </button>
                <button
                  onClick={() => close("cancel")}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>,
    document.body
  );
};

export default Modal;
