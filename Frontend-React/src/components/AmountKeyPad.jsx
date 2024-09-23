import React from "react";
import { useNavigate } from "react-router-dom";

export default function AmountKeyPad({
  toState,
  submitPin,
  handleClick,
  cancelDig,
  extraClass,
  message
}) {
  return (
    <div className={`w-full ${extraClass ? extraClass : ""}`}>
      <div className="grid grid-cols-3 gap-4 text-center w-full">
        <div
          onClick={() => handleClick("1")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          1
        </div>
        <div
          onClick={() => handleClick("2")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          2
        </div>
        <div
          onClick={() => handleClick("3")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          3
        </div>
        <div
          onClick={() => handleClick("4")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          4
        </div>
        <div
          onClick={() => handleClick("5")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          5
        </div>
        <div
          onClick={() => handleClick("6")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          6
        </div>
        <div
          onClick={() => handleClick("7")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          7
        </div>
        <div
          onClick={() => handleClick("8")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          8
        </div>
        <div
          onClick={() => handleClick("9")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          9
        </div>
        <div className="flex items-center justify-between">
          <div
            onClick={() => cancelDig()}
            className="bg-red-600 cursor-pointer text-white p-2 rounded-lg w-[45%]"
          >
            x
          </div>{" "}
          <div
            onClick={() => handleClick(".")}
            className="w-[45%] bg-lightgray p-2 rounded-lg cursor-pointer"
          >
            .
          </div>
        </div>
        <div
          onClick={() => handleClick("0")}
          className="bg-lightgray rounded-lg p-2 cursor-pointer"
        >
          0
        </div>
        {toState ? (
          <button
            onClick={() => submitPin()}
            className="bg-primary cursor-pointer p-2 rounded-lg"
          >
            Next
          </button>
        ) : (
          <a
            target="_blank"
            href={`https://wa.me/+2348123186689?text=${message}`}
            className="bg-primary cursor-pointer p-2 rounded-lg"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
