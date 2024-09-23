import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import phoneData from "../lottieAnimation/phoneAnimation.json";
import cryptoData from "../lottieAnimation/cryptoAnimation.json";
import savingData from "../lottieAnimation/savingAnimation.json";
import phoneData4 from "../lottieAnimation/phoneAnimation.json";
import logoSRC from "../assets/logo sign.png";
import Logo from "../components/Logo";

export default function Welcome() {
  const [images, setImages] = useState([
    phoneData,
    cryptoData,
    savingData,
    phoneData4,
  ]);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const sliderRef2 = useRef(null);

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
  useEffect(() => {
    if (!isTransitioning) {
      sliderRef2.current.style.transition = "none";
      sliderRef2.current.style.transform = `translateX(0)`;
      void sliderRef2.current.offsetHeight;
      setIsTransitioning(true);
    } else {
      sliderRef2.current.style.transition = "transform 2s";
      sliderRef2.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index, isTransitioning]);

  return (
    <div className="h-svh flex items-center bg-secondary">
      <div className="flex md:flex-row flex-col h-full w-full items-center justify-around md:justify-between">
        <div className="md:hidden px-2 block text-center">
          <p className="text-white font-semibold flex items-center justify-center">
            <Logo extraClass="w-[70px]" imageSrc={logoSRC} />
          </p>
          <p className="text-white font-semibold text-2xl text-center w-full">
            Your best money decisions start here.
          </p>
        </div>
        <div className="hidden md:block h-1/2 w-1/2 overflow-hidden">
          <div ref={sliderRef} className="flex basis-1/2 h-full w-full">
            {[...images, images[0]].map((image, idx) => (
              <div
                key={idx}
                className="w-1/4 flex items-center justify-center text-white font-semibold"
                style={{ minWidth: "100%" }}
              >
                <Lottie
                  speed={1}
                  className="w-3/4 h-full"
                  animationData={image}
                  loop={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex px-2 md:px-0 items-center justify-center h-3/5 md:basis-1/2 md:h-1/2 w-full md:w-1/2">
          <div className="flex w-full h-full flex-col items-center justify-between">
            <div className="md:hidden  block h-1/2 w-full md:w-1/2 overflow-hidden">
              <div ref={sliderRef2} className="flex basis-1/2 h-full w-full">
                {[...images, images[0]].map((image, idx) => (
                  <div
                    key={idx}
                    className="w-1/2 flex items-center justify-center text-white font-semibold"
                    style={{ minWidth: "100%" }}
                  >
                    <Lottie
                      speed={1}
                      className="w-3/4 h-full"
                      animationData={image}
                      loop={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center flex-col text-center">
            <p className="text-white font-semibold flex items-center justify-center"><Logo extraClass="w-[70px]" imageSrc={logoSRC} /></p>
              <p className="text-white font-semibold text-3xl text-center w-[60%]">
                Your best money decisions start here.
              </p>
            </div>
            <div className="flex  p-2 h-2/5 md:h-1/2 w-full items-center flex-col justify-between">
              <Link
                to="/login"
                className="p-3 text-center block w-full md:w-1/2 rounded-xl bg-primary"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="p-3 text-center block w-full md:w-1/2 rounded-xl border border-white text-white"
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
