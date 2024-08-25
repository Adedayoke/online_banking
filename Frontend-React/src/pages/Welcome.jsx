import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import  Lottie  from "lottie-react";
import phoneData1 from "../lottieAnimation/phoneAnimation.json"; 
import phoneData2 from "../lottieAnimation/phoneAnimation.json"; 
import phoneData3 from "../lottieAnimation/phoneAnimation.json"; 
import phoneData4 from "../lottieAnimation/phoneAnimation.json"; 
export default function Welcome() {
  const [images, setImages] = useState([
    phoneData1,
    phoneData2,
    phoneData3,
    phoneData4,
  ]);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index === images.length) {
        setIsTransitioning(false);
        setIndex(0); // Reset index without transition
      } else {
        setIsTransitioning(true);
        setIndex((prev) => prev + 1); // Move to the next image
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [index, images.length]);

  useEffect(() => {
    if (!isTransitioning) {
      sliderRef.current.style.transition = "none";
      sliderRef.current.style.transform = `translateX(0)`;
      void sliderRef.current.offsetHeight;
      setIsTransitioning(true);
    } else {
      sliderRef.current.style.transition = "transform 2s";
      sliderRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index, isTransitioning]);

  return (
    <div className="h-full flex items-center bg-secondary">
      <div className="flex h-full w-full items-center justify-between">
        <div className="h-1/2 w-1/2 overflow-hidden">
          <div ref={sliderRef} className="flex basis-1/2 h-full w-full">
            {[...images, images[0]].map((image, idx) => (
              <div
                key={idx}
                className="w-1/4 flex items-center justify-center text-white font-semibold"
                style={{ minWidth: "100%" }}
              >

                <Lottie speed={1} className="w-3/4 h-full" animationData={image} loop={true} />

              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center basis-1/2 h-1/2 w-1/2">
          
          <div className="flex w-full h-full flex-col items-center justify-between">
            <p className="text-white font-semibold">My logo</p>
            <p className="text-white font-semibold text-3xl text-center w-[60%]">
              Your best money decisions start here.
            </p>
            <div className="flex h-1/2 w-full items-center flex-col justify-between">
              <Link
                to="/login"
                className="p-3 text-center block w-1/2 rounded-xl bg-primary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="p-3 text-center block w-1/2 rounded-xl border border-white text-white"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
