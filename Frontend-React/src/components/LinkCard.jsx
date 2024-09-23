import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

const LinkCard = ({ setLinkedAccountsPage, setLinkedAccounts, linkedAccounts }) => {
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.userAuth);
  const [linkCardInputFields, setLinkCardInputFields] = useState({
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

  const resetInputFields = () => {
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
  };

  const handleAddCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/users/user-cards/${currentUser?.email}`,
        {
          ...linkCardInputFields,
          user_email: currentUser?.email,
        }
      );
      // setLinkedAccounts([response.data, ...linkedAccounts]);
      toast.success("Card added successfully");
      setLinkedAccountsPage(false);
      resetInputFields();
    } catch (error) {
      // const message = error.response?.data?.message || "Failed to add card. Please try again.";
      // toast.error(message);
      setLinkedAccountsPage(false);
      navigate("/bank")
      resetInputFields();
    }
  };

  const handleLinkCardInputChange = (field, value) => {
    setLinkCardInputFields(prevFields => ({
      ...prevFields,
      [field]: value,
    }));
  };

  return (
    <div onClick={()=>setLinkedAccountsPage(false)} className="bg-customOverlay p-4 absolute left-0 top-0 w-full h-full z-50 flex items-center justify-center">
      <div onClick={(e)=>e.stopPropagation()} className="bg-white overflow-y-auto p-3 rounded-xl h-[70%] w-full md:w-1/2">
        <p className="font-semibold">Add Card</p>
        <form onSubmit={handleAddCardSubmit}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={linkCardInputFields.cardholder_name}
              onChange={(e) => handleLinkCardInputChange("cardholder_name", e.target.value)}
              className="border p-2 mb-2"
              required
            />
            <input
              type="tel"
              placeholder="Card Number"
              value={linkCardInputFields.card_number}
              onChange={(e) => handleLinkCardInputChange("card_number", e.target.value)}
              className="border p-2 mb-2"
              required
              pattern="\d{13,19}"
              title="Card number should be 13-19 digits"
            />
            <input
              type="text"
              placeholder="CVV"
              value={linkCardInputFields.cvv}
              onChange={(e) => handleLinkCardInputChange("cvv", e.target.value)}
              className="border p-2 mb-2"
              required
              pattern="\d{3,4}"
              title="CVV should be 3 or 4 digits"
            />
            <input
              type="text"
              placeholder="Type of Card"
              value={linkCardInputFields.card_type}
              onChange={(e) => handleLinkCardInputChange("card_type", e.target.value)}
              className="border p-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Expiry Month (1-12)"
              value={linkCardInputFields.expire_month}
              onChange={(e) => handleLinkCardInputChange("expire_month", e.target.value)}
              className="border p-2 mb-2"
              required
              min="1"
              max="12"
            />
            <input
              type="number"
              placeholder="Expiry Year (e.g. 2024)"
              value={linkCardInputFields.expire_year}
              onChange={(e) => handleLinkCardInputChange("expire_year", e.target.value)}
              className="border p-2 mb-2"
              required
              min={new Date().getFullYear()} // dynamic year validation
            />
            <input
              type="text"
              placeholder="Billing Street Address"
              value={linkCardInputFields.billing_street_address}
              onChange={(e) => handleLinkCardInputChange("billing_street_address", e.target.value)}
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing City"
              value={linkCardInputFields.billing_city}
              onChange={(e) => handleLinkCardInputChange("billing_city", e.target.value)}
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing State"
              value={linkCardInputFields.billing_state}
              onChange={(e) => handleLinkCardInputChange("billing_state", e.target.value)}
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing Postal Code"
              value={linkCardInputFields.billing_postal_code}
              onChange={(e) => handleLinkCardInputChange("billing_postal_code", e.target.value)}
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Billing Country"
              value={linkCardInputFields.billing_country}
              onChange={(e) => handleLinkCardInputChange("billing_country", e.target.value)}
              className="border p-2 mb-2"
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-primary text-white p-2 rounded-lg">
              Add Card
            </button>
            <button type="button" onClick={() => setLinkedAccountsPage(false)} className="bg-gray-500 text-white p-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkCard;
