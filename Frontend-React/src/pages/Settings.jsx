import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import card1 from "../assets/card_background.png";
import { IoCameraOutline } from "react-icons/io5";
import { logout } from "../slice/authUserSlice";
import axios from "axios";
import useRefetchUser from "../hooks/useRefetchUser";
import { BankContext } from "../context/BankContext";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import LoaderSmall from "../components/LoaderSmall";
import { IoMdCheckmarkCircle } from "react-icons/io";

const apiUrl = process.env.REACT_APP_API_URL;

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userAuth);
  // Initialize state for each input field
  const [firstName, setFirstName] = useState(currentUser?.firstname || "");
  const [lastName, setlastName] = useState(currentUser?.lastname || "");
  const [userName, setUserName] = useState(currentUser?.username || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [country, setCountry] = useState(currentUser?.country || "");
  const [ssn, setSsn] = useState(currentUser?.ssn || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [imageFile, setImageFile] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);

  const [isLoadingSv, setIsLoadingSv] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  const [nextView, setNextView] = useState("pf");
  const [translateNext, setTranslateNext] = useState(false);
  const { setIsLoading } = useContext(BankContext);
  const { refetchUser } = useRefetchUser(setIsLoading);
  const dispatch = useDispatch();

  // State to manage save button visibility
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setIsSaveButtonVisible(true);
  };

  const handleImageSet = (e) => {
    setImageFile(e.target.files[0]);
    setIsSaveButtonVisible(true);
  };
  const handleImageSet2 = (e) => {
    setImageFile2(e.target.files[0]);
    if (imageFile3) {
      setIsSaveButtonVisible(true);
    }
  };
  const handleImageSet3 = (e) => {
    setImageFile3(e.target.files[0]);
    if (imageFile2) {
      setIsSaveButtonVisible(true);
    }
  };

  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${apiUrl}/users/image-upload/${currentUser?.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      toast.error("Error uploading image:");
    }
  };
  const uploadImage2_3 = async (imageFileX, imageFileY) => {
    try {
      const formData = new FormData();
      formData.append("front", imageFileX); // Match "front" with FastAPI field
      formData.append("back", imageFileY); // Match "back" with FastAPI field

      await axios.post(
        `${apiUrl}/users/bankcheck/${currentUser?.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      toast.error("Error uploading images:", error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${apiUrl}/users/edit/${currentUser?.email}`, {
        username: userName,
        email: currentUser.email,
        phone: phone,
        country: country,
        firstname: firstName,
        lastname: lastName,
        ssn: ssn,
        address: address
      });

      if (imageFile) {
        await uploadImage(imageFile);
      }

      if (imageFile2 && imageFile3) {
        await uploadImage2_3(imageFile2, imageFile3);
      }

      refetchUser();

      setIsSaveButtonVisible(false);
      navigate("/bank");
    } catch (err) {
      setUploadErr("Try again");
      setTimeout(() => {
        setUploadErr("");
      }, 5000);
    } finally {
      // Set loading state back to false whether successful or not
      setIsLoading(false);
    }
  };

  const handleNewView = function (val) {
    setNextView(val);
    setTranslateNext(true);
  };
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div
      onClick={() => navigate("/bank")}
      className="bg-customOverlay fixed left-0 top-0 w-full h-full z-50 flex items-center justify-center p-2"
    >
      <div
        onClick={stopPropagation}
        className="bg-white overflow-hidden shadow-deep h-[80%] md:h-[90%] w-[500px] rounded-2xl flex items-center flex-col justify-between relative"
      >
        <div className="min-h-[100px] w-full relative bg-secondary p-2">
          <div className="font-semibold flex items-center justify-between w-full">
            <div
              className="hover:text-red-600 cursor-pointer text-white"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowRoundBack size={50} />
            </div>
            <span className="text-yellow-500 uppercase font-semibold">
              {currentUser?.level}
            </span>
          </div>
          <div
            style={{
              backgroundImage: `url("${currentUser?.image_url ? currentUser?.image_url : ""}")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="w-[100px] h-[100px] border-[3px] border-yellow-500 rounded-full  absolute left-1/2 -translate-x-1/2 -bottom-10 bg-white overflow-hidden"
          >
            <div className="h-full w-full bg-customOverlay flex items-center justify-center">
              <label className="relative" htmlFor="image">
                <FiEdit color="white" size={25} />
                <input
                  className="opacity-0 absolute left-0 top-0"
                  onChange={(e) => handleImageSet(e)}
                  type="file"
                  name="image"
                  accept="image/*"
                  id=""
                />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[50%] mt-[50px] flex gap-4">
          <div
            style={{
              transform: translateNext ? `translateX(-100%)` : "translateX(0%)",
              transition: "all .5s",
            }}
            className="min-w-full pb-4 h-full overflow-y-scroll px-2"
          >
            <form>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">First Name:</span>
                <input
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">Last Name:</span>
                <input
                  value={lastName}
                  onChange={handleInputChange(setlastName)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">Username:</span>
                <input
                  value={userName}
                  onChange={handleInputChange(setUserName)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">Phone:</span>
                <input
                  value={phone}
                  onChange={handleInputChange(setPhone)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">Address:</span>
                <input
                  value={address}
                  onChange={handleInputChange(setAddress)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">SSN:</span>
                <input
                  value={ssn}
                  onChange={handleInputChange(setSsn)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">Email:</span>
                <input
                  value={email}
                  readOnly
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="email"
                />
              </div>
              <div className="py-2 mb-2 px-2 rounded-xl">
                <span className="font-semibold">Country:</span>
                <input
                  value={country}
                  onChange={handleInputChange(setCountry)}
                  className="block border-b-2 outline-none p-1 w-full bg-transparent border-gray-300"
                  type="text"
                />
              </div>
              <div
                onClick={() => handleNewView("pf")}
                className="py-4 mb-4 px-2 rounded-lg flex items-center justify-between bg-lightgray"
              >
                <span>Profile Level </span>
                <span>{currentUser?.level}</span>
              </div>
              <div
                onClick={() => handleNewView("idf")}
                className="py-4 mb-4 px-2 rounded-lg flex items-center justify-between bg-lightgray"
              >
                <span>Identification type </span>
                <span>{currentUser?.identification_type || "None"}</span>
              </div>
            </form>

            {isSaveButtonVisible &&
              (!isLoadingSv ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 transition-all text-white rounded-xl w-full m-auto p-2 mt-4 hover:bg-green-700"
                >
                  Save Changes
                </button>
              ) : (
                <div className="w-full flex items-center justify-center p-3">
                  <LoaderSmall />
                </div>
              ))}

            <div
              onClick={() => dispatch(logout())}
              className="bg-secondary transition-all hover:bg-red-600 text-center text-white rounded-xl w-full m-auto p-2 cursor-pointer mt-4"
            >
              Logout
            </div>
          </div>
          {nextView === "pf" ? (
            <div
              style={{
                transform: translateNext
                  ? `translateX(-102%)`
                  : "translateX(0%)",
                transition: "all .5s",
              }}
              className="min-w-full h-full px-2"
            >
              <div className="h-full w-full pb-4 overflow-y-scroll">
                <span
                  className="cursor-pointer"
                  onClick={() => setTranslateNext(false)}
                >
                  <div className="hover:text-red-600 cursor-pointer text-secondary">
                    <IoIosArrowRoundBack size={40} />
                  </div>
                </span>
                <div className="w-full h-[38%] md:h-[60%] mb-4">
                  {currentUser?.level?.toLowerCase() === "pro" && (
                    <div className="rounded-xl profileCard shadow-soft h-full w-[80%] p-2 m-auto flex flex-col justify-between text-secondary">
                      <p className="text-lg md:text-xl font-semibold ">PRO</p>
                      <div className="flex">
                        <div className="mr-4">
                          <p className="text-sm opacity-80">Maximum balance</p>
                          <p className="text-lg md:text-xl font-semibold">$10,000</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80">Crypto balance</p>
                          <p className="text-lg md:text-xl font-semibold opacity-80">
                            Restricted
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          <span className="text-sm">{currentUser?.phone}</span>
                        </p>
                        <p>
                          <span className="font-semibold">Country:</span>{" "}
                          <span className="text-sm">
                            {currentUser?.country}
                          </span>
                        </p>
                      </div>
                      <div className="text-center text-sm">
                        To upgrade, view the details below
                      </div>
                    </div>
                  )}
                  {currentUser?.level?.toLowerCase() === "premium" && (
                    <div className="rounded-xl profileCard shadow-soft h-full w-[80%] p-2 m-auto flex flex-col justify-between text-secondary">
                      <p className="text-lg md:text-xl font-semibold ">Premium</p>
                      <div className="flex">
                        <div className="mr-4">
                          <p className="text-sm opacity-80">Maximum balance</p>
                          <p className="text-lg md:text-xl font-semibold">$55,000</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80">Crypto balance</p>
                          <p className="text-lg md:text-xl font-semibold opacity-80">
                            $10,000 Worth
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          <span className="text-sm">{currentUser?.phone}</span>
                        </p>
                        <p>
                          <span className="font-semibold">Country:</span>{" "}
                          <span className="text-sm">
                            {currentUser?.country}
                          </span>
                        </p>
                      </div>
                      <div className="text-center text-sm">
                        To upgrade, view the details below
                      </div>
                    </div>
                  )}
                  {currentUser?.level?.toLowerCase() === "vip" && (
                    <div className="rounded-xl profileCard shadow-soft h-full w-[80%] p-2 m-auto flex flex-col justify-between text-secondary">
                      <p className="text-lg md:text-xl font-semibold ">VIP</p>
                      <div className="flex">
                        <div className="mr-4">
                          <p className="text-sm opacity-80">Maximum balance</p>
                          <p className="text-lg md:text-xl font-semibold">Unlimited</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80">Crypto balance</p>
                          <p className="text-lg md:text-xl font-semibold opacity-80">
                            Unlimited
                          </p>
                        </div>
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          <span className="text-sm">{currentUser?.phone}</span>
                        </p>
                        <p>
                          <span className="font-semibold">Country:</span>{" "}
                          <span className="text-sm">
                            {currentUser?.country}
                          </span>
                        </p>
                      </div>
                      <div className="text-center text-sm">
                        To upgrade, view the details below
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center w-full flex items-center justify-center">
                  <span className="w-[30%] h-[1px] bg-secondary block mr-2"></span>
                  Profile Level{" "}
                  <span className="w-[30%] h-[1px] bg-secondary block ml-2"></span>
                </div>
                <div className="w-full h-[50%] py-4 px-6 mt-4 flex items-center overflow-x-auto profile-scroller justify-between gap-6">
                  <div
                    style={{
                      backgroundImage: `url("${card1}")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="rounded-xl profile-item flex justify-between bg-secondary text-white px-2 py-4 flex-col shadow-soft h-full min-w-[80%] m-auto"
                  >
                    <p className="text-lg font-semibold">PRO</p>
                    <div className="flex">
                      <div className="mr-4">
                        <p className="text-sm opacity-80">Maximum balance</p>
                        <p className="text-lg">$10,000</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Crypto balance</p>
                        <p className="text-lg opacity-80">Restricted</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Requirements</p>
                      <ul className="flex flex-wrap text-xs gap-4 list-disc px-4">
                        <li>Phone number</li>
                        <li>Country</li>
                        <li>Email</li>
                      </ul>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url("${card1}")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="rounded-xl profile-item flex justify-between bg-secondary text-white px-2 py-4 flex-col shadow-soft h-full min-w-[80%] m-auto"
                  >
                    <p className="text-lg font-semibold">PREMIUM</p>
                    <div className="flex">
                      <div className="mr-4">
                        <p className="text-sm opacity-80">Maximum balance</p>
                        <p className="text-lg">$55,000</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Crypto balance</p>
                        <p className="text-lg opacity-80">$10,000 worth</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Requirements</p>
                      <ul className="flex flex-wrap text-xs gap-4 list-disc px-4">
                        <li>SSN</li>
                      </ul>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url("${card1}")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    className="rounded-xl profile-item flex justify-between bg-secondary text-white px-2 py-4 flex-col shadow-soft h-full min-w-[80%] m-auto"
                  >
                    <p className="text-lg font-semibold">VIP</p>
                    <div className="flex">
                      <div className="mr-4">
                        <p className="text-sm opacity-80">Maximum balance</p>
                        <p className="text-lg">Unlimited</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">Crypto balance</p>
                        <p className="text-lg opacity-80">Unlimited</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Requirements</p>
                      <ul className="flex flex-wrap text-xs gap-4 list-disc px-4">
                        <li>Identity verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                transform: translateNext
                  ? `translateX(-102%)`
                  : "translateX(0%)",
                transition: "all .5s",
              }}
              className="min-w-full h-full px-2 overflow-y-auto"
            >
              <span
                className="cursor-pointer"
                onClick={() => setTranslateNext(false)}
              >
                <div className="hover:text-red-600 cursor-pointer text-secondary">
                  <IoIosArrowRoundBack size={40} />
                </div>
              </span>
              <div className="flex items-center justify-center flex-col">
                {uploadErr && (
                  <div className="text-center w-full text-red-600">
                    {uploadErr}
                  </div>
                )}
                <div className="flex items-center justify-center flex-col md:flex-row">
                  {!currentUser?.identification_state ? (
                    <>
                      <div className="rounded-xl border-dashed cursor-pointer flex items-center justify-center h-[200px] w-[200px] border-4 flex-col p:2 md:p-4 relative mb-4 md:mb-0 md:mr-4">
                        <IoCameraOutline color="#06151a" size={50} />

                        <input
                          className="opacity-0 absolute w-full h-full left-0 top-0"
                          onChange={(e) => handleImageSet2(e)}
                          type="file"
                          name="front"
                          accept="image/*"
                          id=""
                        />
                        <p className="font-semibold text-xs text-center mt-4 relative">
                          Upload front of ID card, front of Driver's license,
                          front of State ID e.t.c
                        </p>
                      </div>
                      <div className="rounded-xl border-dashed cursor-pointer flex items-center justify-center h-[200px] w-[200px] border-4 flex-col p-2 md:p-4 relative">
                        <IoCameraOutline color="#06151a" size={50} />

                        <input
                          className="opacity-0 absolute w-full h-full left-0 top-0"
                          onChange={(e) => handleImageSet3(e)}
                          type="file"
                          name="back"
                          accept="image/*"
                          id=""
                        />
                        <p className="font-semibold text-xs text-center mt-4 relative">
                          Upload back of ID card, back of Driver's license, back
                          of State ID e.t.c
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center font-semibold">
                      <div className="text-primary">
                      <IoMdCheckmarkCircle size={100} />
                      </div>
                      Verified
                    </div>
                  )}
                </div>
              </div>
              {isSaveButtonVisible && (
                <button
                  onClick={handleSave}
                  className="bg-green-500 transition-all text-white rounded-xl w-full m-auto p-2 mt-4 hover:bg-green-700"
                >
                  Save Changes
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
