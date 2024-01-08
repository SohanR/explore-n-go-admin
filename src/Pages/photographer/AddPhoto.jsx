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

function AddPhoto({ inputs, title, type }) {
  const [inpVal, setInpVal] = useState({
    title: "",
    cameraModel: "",
    priceHourly: "",
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

      await axios.post(`${baseUrl}/photo/create`, {
        name: inpVal.title,
        cameraModel: inpVal.cameraModel,
        priceHourly: inpVal.priceHourly,
      });

      setLoading(false);
      nevigate(`/photographers`);
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
                  placeholder="Name"
                  onChange={handleChange}
                  name="title"
                  lable="Name"
                  required
                  errorMsg="Title is required!"
                />

                <Input
                  type="text"
                  placeholder="Camera Model"
                  onChange={handleChange}
                  name="cameraModel"
                  lable="Camera Model"
                  required
                  errorMsg="Max People is required!"
                />

                <Input
                  type="text"
                  placeholder="Price Hourly"
                  onChange={handleChange}
                  name="priceHourly"
                  lable="Price/HR"
                  required
                  errorMsg="Price is required!"
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

export default AddPhoto;
