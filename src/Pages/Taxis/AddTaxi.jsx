/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { baseUrl } from "../../utils/base";
import "./../AddRoom/addroom.scss";

function AddTaxi({ inputs, title, type }) {
  const [inpVal, setInpVal] = useState({
    title: "",
    price: "",
    maxPeople: "",
  });

  const [loading, setLoading] = useState(false);

  const nevigate = useNavigate();

  const handleChange = (e) => {
    setInpVal({ ...inpVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inpVal);
    try {
      setLoading(true);

      await axios.post(`${baseUrl}/taxi/create`, {
        carName:inpVal.title,
        maxCapacity: inpVal.maxPeople,
        pricePerKm: inpVal.price
      });

      setLoading(false);
      nevigate(`/taxis`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="add_new_room">
      <Sidebar />

      <div className="new_page">
        <Navbar />

        <div className="new_page_main">
          <div className="new_page_content">
            <form onSubmit={handleSubmit} className="form">
              <div className="form_main">
                <Input
                  type="text"
                  placeholder="Title"
                  onChange={handleChange}
                  name="title"
                  lable="Title"
                  required
                  errorMsg="Title is required!"
                />

                <Input
                  type="number"
                  placeholder="price"
                  onChange={handleChange}
                  name="price"
                  lable="Price/KM"
                  required
                  errorMsg="Price is required!"
                />

                <Input
                  type="number"
                  placeholder="Max People"
                  onChange={handleChange}
                  name="maxPeople"
                  lable="Max People"
                  required
                  errorMsg="Max People is required!"
                />
              </div>

              <button
                type="submit"
                className="submit_btn"
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Loading.." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaxi;
