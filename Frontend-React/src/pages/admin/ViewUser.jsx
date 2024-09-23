import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosAddCircleOutline, IoIosArrowRoundBack } from "react-icons/io";
import { setcurrentViewTransactions } from "../../slice/adminUserSlice";
import AdminOverlay from "./AdminOverlay";
import Transaction from "../../components/Transaction";
const apiUrl = process.env.REACT_APP_API_URL;
const ViewUser = () => {
  const { viewUser, currentViewTransactions } = useSelector(
    (state) => state.adminFunctions
  );
  const [updatedUser, setUpdatedUser] = useState(viewUser);
  const [saveBtn, setSaveBtn] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [linkedAccounts, setLinkedAccounts] = useState([]);
  const [addTransactionPage, setAddTransactionPage] = useState(false);
  const [linkedAccountsPage, setLinkedAccountsPage] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setselectedType] = useState("Credit");
  const [inputFields, setInputFields] = useState({
    trans_type: "",
    description: "",
    amount: "",
    bank: "",
    merchant: "",
    merchant_number: "",
  });
  const [inputFields2, setInputFields2] = useState({
    trans_type: "",
    description: "",
    amount: "",
    bank: "",
    merchant: "",
    merchant_number: "",
    timestamp: "",
  });
  const [userDetInputFields, setUserDetInputFields] = useState({
    firstname: viewUser?.firstname,
    lastname: viewUser?.lastname,
    username: viewUser?.username,
    phone: viewUser?.phone,
    accnumber: viewUser?.accnumber,
    email: viewUser?.email,
    country: viewUser?.country,
    balance: viewUser?.balance,
    cryptoBalance: viewUser?.cryptoBalance,
    pin: viewUser?.pin,
    identification_src: viewUser?.identification_src,
    identification_state: viewUser?.identification_state,
    identification_type: viewUser?.identification_type,
    ssn: viewUser?.ssn,
    image_url: viewUser?.image_url,
    level: viewUser?.level,
    status: viewUser?.status,
    address: viewUser?.address,
    pin: 0,
  });
  const [updatedFields, setUpdatedFields] = useState({});
  const [cryptoEditDetals, setCryptoEditDetals] = useState({
    btc_balance: viewUser?.cryptos[0]?.btc_balance || 0,
    eth_balance: viewUser?.cryptos[0]?.eth_balance || 0,
    usdt_balance: viewUser?.cryptos[0]?.usdt_balance || 0,
    bnb_balance: viewUser?.cryptos[0]?.bnb_balance || 0,
  });
  const [linkCardInputFields, setLinkCardInputFields] = useState({
    cardholder_name: "",
    card_number: 0,
    expire_month: "",
    expire_year: "",
    cvv: 0,
    billing_street_address: "",
    billing_city: "",
    billing_state: "",
    billing_postal_code: "",
    billing_country: "",
    card_type: "",
  });
  const transactionType = ["Debit", "Credit"];
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [editTransactionPage, setEditTransactionPage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editableFields, setEditableFields] = useState({
    name: false,
    pin: false,
    username: false,
    email: false,
    userPassword: false,
    phone: false,
    country: false,
    accnumber: false,
    accountbalance: false,
    cryptoBalance: false,
    pin: false,
    linkedAccounts: false,
    identification_src: false,
    identification_state: false,
    identification_type: false,
    ssn: false,
    BTC: false,
    USDT: false,
    BNB: false,
    ETH: false,
    address: false,
    status: false,
  });
  useEffect(() => {
    async function fetchUserTransaction() {
      try {
        const response = await axios.get(
          `${apiUrl}/admin/user/transaction/${viewUser?.email}`
        );
        setTransactions(response.data.reverse());
      } catch (error) {
        toast.error("Error fetching transactions:", error);
      }
    }

    fetchUserTransaction();
  }, [viewUser, dispatch]);
  useEffect(() => {
    async function fetchUserCards() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/user-cards/${viewUser?.email}`
        );

        setLinkedAccounts(response.data.reverse());
      } catch (error) {
        toast.error("Error fetching Cards:", error);
      }
    }

    fetchUserCards();
  }, [viewUser, dispatch]);

  function handleUserDetInputFields(field, value) {
    setSaveBtn(true);
    setUserDetInputFields({
      ...userDetInputFields,
      [field]: value,
    });
    setUpdatedFields({
      ...updatedFields,
      [field]: value,
    });
  }
  function handleUserDetCryptoFields(field, value) {
    setSaveBtn(true);
    setCryptoEditDetals({
      ...cryptoEditDetals,
      [field]: value,
    });
    setUpdatedFields({
      ...cryptoEditDetals,
      [field]: value,
    });
  }
  function toggleDropdown() {
    setIsDropdownOpen((tp) => !tp);
  }
  const handleEditClick = (field) => {
    setEditableFields({ ...editableFields, [field]: true });
  };

  async function handleSaveChanges() {
    try {
      const response = await axios.post(
        `${apiUrl}/admin/user/edit/${viewUser.email}`,
        updatedFields
      );
      toast.success("User details updated successfully");
      navigate("/admin");
      setEditableFields({
        name: false,
        pin: false,
        username: false,
        email: false,
        userPassword: false,
        phone: false,
        country: false,
        accnumber: false,
        accountbalance: false,
        cryptoBalance: false,
        pin: false,
        linkedAccounts: false,
        identification_src: false,
        identification_state: false,
        identification_type: false,
        ssn: false,
        BTC: false,
        USDT: false,
        BNB: false,
        ETH: false,
        status: false,
        address: false,
      });
      setSaveBtn(false);
    } catch (error) {
      toast.error("Failed to update user details:");
    }
  }
  const handleInputChange = (field, value) => {
    setInputFields({
      ...inputFields,
      [field]: value,
    });
  };
  const handleInputChange2 = (field, value) => {
    setInputFields2({
      ...inputFields2,
      [field]: value,
    });
  };
  const handleLinkCardInputChange = (field, value) => {
    setLinkCardInputFields({
      ...linkCardInputFields,
      [field]: value,
    });
  };
  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/admin/user/transaction/${viewUser?.email}`,
        {
          ...inputFields,
        }
      );
      setTransactions([response.data, ...transactions]);
      toast.success("Transaction added successfully");
      setAddTransactionPage(false); // Close the form
      setInputFields({
        trans_type: "",
        description: "",
        amount: "",
      });
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };
  const handleAddCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/users/user-cards/${viewUser?.email}`,
        {
          ...linkCardInputFields,
          user_email: viewUser?.email,
        }
      );

      // Update transactions state with the new transaction
      setLinkedAccounts([response.data, ...linkedAccounts]);

      toast.success("Account added successfully");
      setLinkedAccountsPage(false); // Close the form
      setLinkCardInputFields({
        cardholder_name: "",
        card_number: "",
        expire_month: "",
        expire_year: "",
        cvv: "",
        billing_street_address: "",
        billing_city: "",
        billing_state: "",
        billing_postal_code: "",
        billing_country: "",
        card_type: "",
      });
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };
  function handleDelTransaction(trans) {
    const newTransactions = transactions.filter((t) => t.id !== trans.id);
    setTransactions(newTransactions);
  }
  function handleTransTypeSet(type) {
    setselectedType(type);
    setInputFields({
      ...inputFields,
      trans_type: type.toLowerCase(),
    });
    setIsDropdownOpen(false);
  }

  function handleClickedTransaction(transaction) {
    setCurrentTransaction(transaction);
    setInputFields2({
      transaction_type: transaction?.transaction_type,
      description: transaction?.description,
      amount: transaction?.amount,
      bank: transaction?.bank,
      merchant: transaction?.merchant,
      merchant_number: transaction?.merchant_number,
      timestamp: transaction?.timestamp,
      user_email: transaction?.user_email,
    });
    setEditTransactionPage(true);
  }

  const handleTransactionUpdate = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        `${apiUrl}/admin/transaction/edit/${currentTransaction.routing_number}`, 
        {
          ...inputFields2,
          transaction_type: selectedType?.toLowerCase(),
        }
      );
      toast.success("Transaction updated successfully");
      setEditTransactionPage(false);
      navigate("/admin")
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update transaction.";
      toast.error(message);
    }
  };

  if (!viewUser) return <Navigate to="/admin" />;
  return (
    <div className="h-full w-full flex items-center justify-center bg-lightgray py-2 md:pt-14 md:px-10">
      <div className="h-[80%] md:h-[92%] w-full md:w-1/2 bg-white rounded-xl shadow-xl overflow-y-auto p-2">
        <div className="border-b-2 mb-2">
          <p className="font-semibold text-center">Personal Details</p>
          <div className="py-4">
            <table className="w-full md:w-4/5">
              <tbody className="w-full">
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>First Name:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.firstname}
                      readOnly={!editableFields.firstname}
                      onChange={(e) =>
                        handleUserDetInputFields("firstname", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.firstname
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("firstname")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Last Name:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.lastname}
                      readOnly={!editableFields.lastname}
                      onChange={(e) =>
                        handleUserDetInputFields("lastname", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.lastname
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("lastname")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Username:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.username}
                      readOnly={!editableFields.username}
                      onChange={(e) =>
                        handleUserDetInputFields("username", e.target.value)
                      }
                      //   onClick={() => handleEditClick("username")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.username
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("username")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Email:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.email}
                      readOnly={!editableFields.email}
                      onChange={(e) =>
                        handleUserDetInputFields("email", e.target.value)
                      }
                      //   onClick={() => handleEditClick("email")}
                    />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Account Number:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.accnumber}
                      readOnly
                      //   onClick={() => handleEditClick("uid")}
                    />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Phone:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.phone}
                      readOnly={!editableFields.phone}
                      onChange={(e) =>
                        handleUserDetInputFields("phone", e.target.value)
                      }
                      //   onClick={() => handleEditClick("phone")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.phone
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("phone")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Country:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.country}
                      readOnly={!editableFields.country}
                      onChange={(e) =>
                        handleUserDetInputFields("country", e.target.value)
                      }
                      //   onClick={() => handleEditClick("country")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.country
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("country")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Identification URL:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.identification_src}
                      readOnly={!editableFields.identification_src}
                      onChange={(e) =>
                        handleUserDetInputFields(
                          "identification_src",
                          e.target.value
                        )
                      }
                      //   onClick={() => handleEditClick("identificationSrc")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.identification_src
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("identification_src")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Identification State:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.identification_state}
                      readOnly={!editableFields.identification_state}
                      onChange={(e) =>
                        handleUserDetInputFields(
                          "identification_state",
                          e.target.value
                        )
                      }
                      //   onClick={() => handleEditClick("identification_state")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.identification_state
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("identification_state")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Identification Type:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.identification_type}
                      readOnly={!editableFields.identification_type}
                      onChange={(e) =>
                        handleUserDetInputFields(
                          "identification_type",
                          e.target.value
                        )
                      }
                      //   onClick={() => handleEditClick("identification_type")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.identification_type
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("identification_type")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>SSN:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.ssn}
                      readOnly={!editableFields.ssn}
                      onChange={(e) =>
                        handleUserDetInputFields("ssn", e.target.value)
                      }
                      //   onClick={() => handleEditClick("SSN")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.ssn ? "visible text-primary" : "invisible"
                    }`}
                    onClick={() => handleEditClick("ssn")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Profile Picture:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.image_url}
                      readOnly
                      // onChange={(e) =>
                      //   handleUserDetInputFields("profilePic", e.target.value)
                      // }
                      //   onClick={() => handleEditClick("profilePic")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.profilePic
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("profilePic")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Profile Level:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.level}
                      readOnly={!editableFields.level}
                      onChange={(e) =>
                        handleUserDetInputFields("level", e.target.value)
                      }
                      //   onClick={() => handleEditClick("level")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.level
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("level")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Address:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.address}
                      readOnly={!editableFields.address}
                      onChange={(e) =>
                        handleUserDetInputFields("address", e.target.value)
                      }
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.address
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("address")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className=" mb-2">
          <p className="font-semibold text-center">Bank Details</p>
          <div className="py-4">
            <table className="w-full md:w-4/5">
              <tbody className="w-full">
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Balance:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.balance}
                      readOnly={!editableFields.balance}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Only allow digits and a single decimal point
                        value = value.replace(/[^0-9.]/g, "");

                        // Prevent more than one decimal point
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts[1]; // Keep the first decimal point only
                        }

                        // Update the state as a string during input
                        handleUserDetInputFields("balance", value);
                      }}
                      //   onClick={() => handleEditClick("balance")}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.balance
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("balance")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Status:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.status}
                      readOnly={!editableFields.status}
                      placeholder="suspended, restricted, active"
                      onChange={(e) => {
                        handleUserDetInputFields("status", e.target.value);
                      }}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.status
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("status")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>Pin:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={userDetInputFields?.pin}
                      readOnly={!editableFields.pin}
                      onChange={(e) => {
                        handleUserDetInputFields("pin", e.target.value);
                      }}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.pin
                        ? "visible text-primary"
                        : "invisible"
                    }`}
                    onClick={() => handleEditClick("pin")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Crypto Details */}
        <div className=" mb-2">
          <p className="font-semibold text-center">Crypto Details</p>
          <div className="py-4">
            <table className="w-full md:w-4/5">
              <tbody className="w-full">
                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>BTC:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={cryptoEditDetals?.btc_balance}
                      readOnly={!editableFields.BTC}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Only allow digits and a single decimal point
                        value = value.replace(/[^0-9.]/g, "");

                        // Prevent more than one decimal point
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts[1]; // Keep the first decimal point only
                        }

                        // Update the state as a string during input
                        handleUserDetCryptoFields("btc_balance", value);
                      }}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.BTC ? "visible text-primary" : "invisible"
                    }`}
                    onClick={() => handleEditClick("BTC")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>

                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>USDT:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={cryptoEditDetals?.usdt_balance}
                      readOnly={!editableFields.USDT}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Only allow digits and a single decimal point
                        value = value.replace(/[^0-9.]/g, "");

                        // Prevent more than one decimal point
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts[1]; // Keep the first decimal point only
                        }

                        // Update the state as a string during input
                        handleUserDetCryptoFields("usdt_balance", value);
                      }}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.USDT ? "visible text-primary" : "invisible"
                    }`}
                    onClick={() => handleEditClick("USDT")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>

                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>BNB:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={cryptoEditDetals?.bnb_balance}
                      readOnly={!editableFields.BNB}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Only allow digits and a single decimal point
                        value = value.replace(/[^0-9.]/g, "");

                        // Prevent more than one decimal point
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts[1]; // Keep the first decimal point only
                        }

                        // Update the state as a string during input
                        handleUserDetCryptoFields("bnb_balance", value);
                      }}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.BNB ? "visible text-primary" : "invisible"
                    }`}
                    onClick={() => handleEditClick("BNB")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>

                <tr className="pEd p-1 cursor-pointer w-full font-semibold text-base">
                  <td>ETH:</td>
                  <td className="font-light">
                    <input
                      className="outline-none"
                      value={cryptoEditDetals?.eth_balance}
                      readOnly={!editableFields.ETH}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Only allow digits and a single decimal point
                        value = value.replace(/[^0-9.]/g, "");

                        // Prevent more than one decimal point
                        const parts = value.split(".");
                        if (parts.length > 2) {
                          value = parts[0] + "." + parts[1]; // Keep the first decimal point only
                        }

                        // Update the state as a string during input
                        handleUserDetCryptoFields("eth_balance", value);
                      }}
                    />
                  </td>
                  <td
                    className={`editUser hover:text-primary cursor-pointer ${
                      editableFields.ETH ? "visible text-primary" : "invisible"
                    }`}
                    onClick={() => handleEditClick("ETH")}
                  >
                    <FiEdit size={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Add Transaction page */}
        <div className=" mb-2">
          <p className="font-semibold text-center cursor-pointer relative">
            Transaction Details{" "}
            <span
              onClick={() => setAddTransactionPage(true)}
              className="p-[2px]  flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-white text-xl"
            >
              +
            </span>
          </p>

          <div className="py-4 max-h-[200px] overflow-y-auto">
            <table className="w-full">
              <tbody className="w-full">
                {transactions?.reverse()?.map((transaction) => (
                  <TransactionAdminView
                    handleClickedTransaction={handleClickedTransaction}
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
            {/* {transactions.length > 4 && (
              <p className="text-center w-full cursor-pointer font-semibold text-primary">
                View all {">"}
              </p>
            )} */}
          </div>
        </div>

        <div className=" mb-2">
          <p className="font-semibold text-center cursor-pointer relative">
            Linked Cards{" "}
            <span
              onClick={() => setLinkedAccountsPage(true)}
              className="p-[2px]  flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary text-white text-xl"
            >
              +
            </span>
          </p>

          <div className="py-4">
            <table className="w-full">
              <tbody className="w-full">
                {linkedAccounts.length > 0 ? (
                  linkedAccounts?.slice(0, 4)?.map((tr) => (
                    <tr className="tEd p-1 cursor-pointer w-full font-semibold text-base border-b-2 py-3">
                      <td className="font-light">
                        <span>{tr?.card_type}</span>
                      </td>
                      <td className="font-light">
                        <p className="font-semibold text-sm">
                          {tr?.card_number}
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">No Linked Account Yet</tr>
                )}
              </tbody>
            </table>
            {linkedAccounts.length > 4 && (
              <p className="text-center w-full cursor-pointer font-semibold text-primary">
                View all {">"}
              </p>
            )}
          </div>
        </div>
        {addTransactionPage && (
          <AdminAddTranaction
            setAddTransactionPage={setAddTransactionPage}
            toggleDropdown={toggleDropdown}
            selectedType={selectedType}
            isDropdownOpen={isDropdownOpen}
            transactionType={transactionType}
            handleTransTypeSet={handleTransTypeSet}
            inputFields={inputFields}
            handleInputChange={handleInputChange}
            handleTransactionSubmit={handleTransactionSubmit}
          />
        )}
        {linkedAccountsPage && (
          <AdminLinkCard
            setLinkedAccountsPage={setLinkedAccountsPage}
            handleAddCardSubmit={handleAddCardSubmit}
            linkCardInputFields={linkCardInputFields}
            handleLinkCardInputChange={handleLinkCardInputChange}
          />
        )}
        {editTransactionPage && (
          <AdminEditTransaction
            toggleDropdown={toggleDropdown}
            selectedType={selectedType}
            isDropdownOpen={isDropdownOpen}
            transactionType={transactionType}
            handleTransTypeSet={handleTransTypeSet}
            inputFields2={inputFields2}
            handleInputChange2={handleInputChange2}
            currentTransaction={currentTransaction}
            setEditTransactionPage={setEditTransactionPage}
            handleTransactionUpdate={handleTransactionUpdate}
          />
        )}

        {saveBtn && (
          <div className="flex items-center justify-center gap-5 mt-3">
            <button
              onClick={handleSaveChanges}
              className="bg-primary hover:bg-lightprimary text-white font-semibold py-2 px-5 rounded-md"
            >
              Save Changes
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="bg-lightgray hover:bg-gray-200 text-dark font-semibold py-2 px-5 rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;

const TransactionAdminView = function ({
  transaction,
  handleClickedTransaction,
}) {
  return (
    <tr
      onClick={() => handleClickedTransaction(transaction)}
      className="tEd p-1 cursor-pointer w-full font-semibold text-base border-b-2"
    >
      <Transaction transaction={transaction} />
      {/* <td className="font-light w-[30%]">
        <ul>
          <li>
            {transaction.transaction_type === "debit" && <p>Transfer </p>}
            {transaction.transaction_type === "credit" && <p>Credited</p>}
            {transaction.transaction_type === "cryptoSell" && (
              <p>Sold {transaction?.receiverBankName}</p>
            )}
            {transaction.transaction_type === "cryptoBuy" && (
              <p>Bought {transaction?.receiverBankName}</p>
            )}
            {transaction.transaction_type === "withdrawCrypto" && (
              <p>Withdrawal to {transaction?.receiverBankName}</p>
            )}
            {transaction.transaction_type === "depositCrypto" && (
              <p>Deposited from {transaction?.recievedFromSenderName}</p>
            )}
          </li>
        </ul>
      </td>
      <td className="font-light w-[30%]">
        <p className="font-semibold text-sm">
          USD{transaction?.amount.toFixed(2)}
        </p>
      </td>
      <td className="capitalize w-[30%]">
        {transaction.description.toLowerCase() === "failed" ? (
          <p className="text-red-600">{transaction?.description}</p>
        ) : (
          <p className="text-green-600">{transaction?.description}</p>
        )}
      </td> */}
    </tr>
  );
};

const AdminAddTranaction = function ({
  setAddTransactionPage,
  handleTransactionSubmit,
  toggleDropdown,
  selectedType,
  isDropdownOpen,
  transactionType,
  handleTransTypeSet,
  inputFields,
  handleInputChange,
}) {
  return (
    <AdminOverlay setPage={setAddTransactionPage}>
      <div className="bg-white p-3 rounded-xl h-[70%] w-full md:w-1/2">
        <p className="font-semibold">Add Transaction</p>
        <form onSubmit={handleTransactionSubmit}>
          <div className="flex items-center mb-4">
            Transaction type:
            <div className="relative text-base ml-4 border outline-none rounded-lg px-2">
              <div
                onClick={toggleDropdown}
                className="w-full cursor-pointer font-semibold text-left px-2 py-1 rounded-md"
              >
                {selectedType}
              </div>
              {isDropdownOpen && (
                <ul className="absolute w-full left-0 z-50 bg-white border rounded-lg shadow-lg mt-2">
                  {transactionType.map((type) => (
                    <li
                      key={type}
                      onClick={() => handleTransTypeSet(type)}
                      className="cursor-pointer hover:bg-primary hover:text-white p-2"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Input fields for transaction */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Description eg. Success, Failed"
              value={inputFields.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Amount"
              value={inputFields.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Bank Name"
              value={inputFields.bank}
              onChange={(e) => handleInputChange("bank", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Merchant"
              value={inputFields.merchant}
              onChange={(e) => handleInputChange("merchant", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Merchant account number"
              value={inputFields.merchant_number}
              onChange={(e) =>
                handleInputChange("merchant_number", e.target.value)
              }
              className="border p-2 mb-2"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-lg"
            >
              Add Transaction
            </button>
            <button
              type="button"
              onClick={() => setAddTransactionPage(false)}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminOverlay>
  );
};

const AdminLinkCard = function ({
  setLinkedAccountsPage,
  handleAddCardSubmit,
  linkCardInputFields,
  handleLinkCardInputChange,
}) {
  return (
    <AdminOverlay setPage={setLinkedAccountsPage}>
      <div className="bg-white overflow-y-auto p-3 rounded-xl h-[70%] w-full md:w-1/2">
        <p className="font-semibold">Add Card</p>
        <form onSubmit={handleAddCardSubmit}>
          {/* Input fields for transaction */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={linkCardInputFields.cardholder_name}
              onChange={(e) =>
                handleLinkCardInputChange("cardholder_name", e.target.value)
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              value={linkCardInputFields.card_number}
              onChange={(e) =>
                handleLinkCardInputChange("card_number", e.target.value)
              }
              className="border p-2 mb-2"
              required
              pattern="\d{13,19}" // Card numbers typically range between 13 and 19 digits
              title="Card number should be 13-19 digits"
            />
            <input
              type="text"
              placeholder="CVV"
              value={linkCardInputFields.cvv}
              onChange={(e) => handleLinkCardInputChange("cvv", e.target.value)}
              className="border p-2 mb-2"
              required
              pattern="\d{3,4}" // CVV is typically 3 or 4 digits
              title="CVV should be 3 or 4 digits"
            />
            <input
              type="text"
              placeholder="Type of card"
              value={linkCardInputFields.card_type}
              onChange={(e) =>
                handleLinkCardInputChange("card_type", e.target.value)
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Expiry Month (1-12)"
              value={linkCardInputFields.expire_month}
              onChange={(e) =>
                handleLinkCardInputChange("expire_month", e.target.value)
              }
              className="border p-2 mb-2"
              required
              min="1"
              max="12"
            />
            <input
              type="number"
              placeholder="Expiry Year (e.g. 2024)"
              value={linkCardInputFields.expire_year}
              onChange={(e) =>
                handleLinkCardInputChange("expire_year", e.target.value)
              }
              className="border p-2 mb-2"
              required
              min="2023"
            />
            <input
              type="text"
              placeholder="Billing Street Address"
              value={linkCardInputFields.billing_street_address}
              onChange={(e) =>
                handleLinkCardInputChange(
                  "billing_street_address",
                  e.target.value
                )
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing City"
              value={linkCardInputFields.billing_city}
              onChange={(e) =>
                handleLinkCardInputChange("billing_city", e.target.value)
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing State"
              value={linkCardInputFields.billing_state}
              onChange={(e) =>
                handleLinkCardInputChange("billing_state", e.target.value)
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing Postal Code"
              value={linkCardInputFields.billing_postal_code}
              onChange={(e) =>
                handleLinkCardInputChange("billing_postal_code", e.target.value)
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing Country"
              value={linkCardInputFields.billing_country}
              onChange={(e) =>
                handleLinkCardInputChange("billing_country", e.target.value)
              }
              className="border p-2 mb-2"
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-lg"
            >
              Add Card
            </button>
            <button
              type="button"
              onClick={() => setLinkedAccountsPage(false)}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminOverlay>
  );
};

const AdminEditTransaction = function ({
  currentTransaction,
  setEditTransactionPage,
  handleTransactionUpdate,
  toggleDropdown,
  selectedType,
  isDropdownOpen,
  transactionType,
  handleTransTypeSet,
  inputFields2,
  handleInputChange2,
}) {
  return (
    <AdminOverlay setPage={setEditTransactionPage}>
      <div className="bg-white p-3 rounded-xl h-[70%] w-full md:w-1/2">
        <p className="font-semibold">Edit Transaction</p>
        <form onSubmit={handleTransactionUpdate}>
          <div className="flex items-center mb-4">
            Transaction type:
            <div className="relative text-base ml-4 border outline-none rounded-lg px-2">
              <div
                onClick={toggleDropdown}
                className="w-full cursor-pointer font-semibold text-left px-2 py-1 rounded-md"
              >
                {selectedType}
              </div>
              {isDropdownOpen && (
                <ul className="absolute w-full left-0 z-50 bg-white border rounded-lg shadow-lg mt-2">
                  {transactionType.map((type) => (
                    <li
                      key={type}
                      onClick={() => handleTransTypeSet(type)}
                      className="cursor-pointer hover:bg-primary hover:text-white p-2"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Description eg. Success, Failed"
              value={inputFields2.description}
              onChange={(e) =>
                handleInputChange2("description", e.target.value)
              }
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Amount"
              value={inputFields2.amount}
              onChange={(e) => handleInputChange2("amount", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Bank Name"
              value={inputFields2.bank}
              onChange={(e) => handleInputChange2("bank", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Merchant"
              value={inputFields2.merchant}
              onChange={(e) => handleInputChange2("merchant", e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Merchant account number"
              value={inputFields2.merchant_number}
              onChange={(e) =>
                handleInputChange2("merchant_number", e.target.value)
              }
              className="border p-2 mb-2"
            />
            <input
              className="border p-2 mb-2"
              onChange={(e) => handleInputChange2("timestamp", e.target.value)}
              type="datetime-local"
              id="datetime"
              name="datetime"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-lg"
            >
              Update Transaction
            </button>
            <button
              type="button"
              onClick={() => setEditTransactionPage(false)}
              className="bg-gray-500 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminOverlay>
  );
};
