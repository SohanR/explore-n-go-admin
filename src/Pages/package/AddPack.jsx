/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { baseUrl } from "../../utils/base";
import "./../AddRoom/addroom.scss";

function AddPackage({ inputs, title, type }) {
  const [inpVal, setInpVal] = useState({
    photoId: "",
    taxiId: "",
    price: "",
    hotelId: "",

  });


  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [taxis, setTaxis] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedTaxi, setSelectedTaxi] = useState("");
  const [selectedPhotographer, setSelectedPhotographer] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const nevigate = useNavigate();

  useEffect(() => {
    // Fetch hotels, taxis, and photographers data from API
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/hotels`);
        setHotels(response.data.message);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    const fetchRoomData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/rooms/${selectedHotel}`);
          setRooms(response.data.message);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      };

    const fetchTaxiData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/taxis`);
        setTaxis(response.data);
      } catch (error) {
        console.error("Error fetching taxis:", error);
      }
    };

    const fetchPhotographerData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/photos`);
        setPhotographers(response.data);
      } catch (error) {
        console.error("Error fetching photographers:", error);
      }
    };

    fetchHotelData();
    fetchTaxiData();
    fetchPhotographerData();
    fetchRoomData()
  }, [selectedHotel]);


  const handleHotelChange = (e) => {
    setSelectedHotel(e.target.value);
  };

  const handleTaxiChange = (e) => {
    setSelectedTaxi(e.target.value);
  };

  const handlePhotographerChange = (e) => {
    setSelectedPhotographer(e.target.value);
  };
  const handleChange = (e) => {
    setInpVal({ ...inpVal, [e.target.name]: e.target.value });
  };

  console.log("input",inpVal);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inpVal);
    try {
      setLoading(true);

      await axios.post(`${baseUrl}/pack/create`, {
        hotel: inpVal.hotelId,
        taxi: inpVal.taxiId,
        photographer: inpVal.photoId,
        price:inpVal.price
      });

      setLoading(false);
      nevigate(`/packages`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  console.log('selected', {
    selectedHotel,selectedPhotographer,selectedTaxi
  });
  return (
    <div className="add_new_room">
      <Sidebar />

      <div className="new_page">
        <Navbar />

        <div className="new_page_main">
          <div className="new_page_content">
            <form onSubmit={handleSubmit} className="form">
              <div className="form_main">
                <div className="select_inp_title">
                  <label>Select Hotel</label>
                  <select
                    id="hotelId"
                    value={inpVal.hotelId}
                    onChange={(e) => handleChange(e, "hotelId")}
                  >
                     <option value="">Please select one</option> {/* Default option */}
                    {hotels &&
                      hotels.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>


                <div className="select_inp_title">
                  <label>Select Photographer</label>
                  <select
                    id="photId"
                    value={inpVal.photoId}
                    onChange={handleChange}
                  >
                     <option value="">Please select one</option> {/* Default option */}
                    {photographers &&
                      photographers.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="select_inp_title">
                  <label>Select Taxi</label>
                  <select
                    id="taxiId"
                    value={inpVal.taxiId}
                    onChange={handleChange}
                  > <option value="">Please select one</option> {/* Default option */}
                    {taxis &&
                      taxis.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.carName}
                        </option>
                      ))}
                  </select>
                </div>

                <Input
                  type="number"
                  placeholder="price"
                  onChange={handleChange}
                  name="price"
                  lable="Price"
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

export default AddPackage;
