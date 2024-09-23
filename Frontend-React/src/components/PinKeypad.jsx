import React from "react";
import {useNavigate} from "react-router-dom"
import LoaderSmall from "./LoaderSmall";

export default function PinKeypad({isLoadingTran, submitPin, handleClick, cancelDig, extraClass}){
    return(
        <div className={`w-full ${extraClass ? extraClass : ""}`}>
            <div className="grid grid-cols-3 gap-4 text-center w-full">
                <div onClick={()=>handleClick("1")} className="bg-lightgray rounded-lg p-2 cursor-pointer">1</div>
                <div onClick={()=>handleClick("2")} className="bg-lightgray rounded-lg p-2 cursor-pointer">2</div>
                <div onClick={()=>handleClick("3")} className="bg-lightgray rounded-lg p-2 cursor-pointer">3</div>
                <div onClick={()=>handleClick("4")} className="bg-lightgray rounded-lg p-2 cursor-pointer">4</div>
                <div onClick={()=>handleClick("5")} className="bg-lightgray rounded-lg p-2 cursor-pointer">5</div>
                <div onClick={()=>handleClick("6")} className="bg-lightgray rounded-lg p-2 cursor-pointer">6</div>
                <div onClick={()=>handleClick("7")} className="bg-lightgray rounded-lg p-2 cursor-pointer">7</div>
                <div onClick={()=>handleClick("8")} className="bg-lightgray rounded-lg p-2 cursor-pointer">8</div>
                <div onClick={()=>handleClick("9")} className="bg-lightgray rounded-lg p-2 cursor-pointer">9</div>
                <div onClick={()=>cancelDig()} className="bg-red-600 cursor-pointer text-white p-2 rounded-lg">x</div>
                <div onClick={()=>handleClick("0")} className="bg-lightgray rounded-lg p-2 cursor-pointer">0</div>
                {!isLoadingTran ? <div onClick={()=>submitPin()} className="bg-primary cursor-pointer p-2 rounded-lg">Next</div> : <div className="flex items-center justify-center"><LoaderSmall extraClass="border-black" /></div>}
            </div>
        </div>
    )
}