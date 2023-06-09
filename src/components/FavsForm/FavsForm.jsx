import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFavs,
  CreateFav,
  selectFavHttpStatus,
} from "../../features/favs/favsSlice";
import "./favsform.css";

function Favsform() {
  const [fav, setFavs] = useState({
    fav_name: "",
    fav_description: "",
    fav_link: "",
    userid: "",
    token: "",
  });
  const { favs } = useSelector(selectFavHttpStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hola");
    const token = localStorage.getItem("token");
    //dispatch(token);
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    if (favs && favs.status === 201) {
      navigate("/favs");
      console.log("hola");
    }
  }, [favs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFavs((prevFav) => ({
      ...prevFav,
      [name]: value,
    }));
  };

  const handleSubmmit = (e) => {
    e.preventDefault();
    fav.userid = localStorage.getItem("userid");
    fav.token = localStorage.getItem("token");
    dispatch(CreateFav(fav));
  };
  return (
    <form onSubmit={handleSubmmit}>
      <div className="main_div">
        <div className="title_div">
          <span>Create new Fav</span>
        </div>

        <div className="div_form">
          <div className="div_input">
            <input
              type="text"
              name="fav_name"
              placeholder="Fav name"
              value={fav.fav_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="div_input">
            <input
              type="text-area"
              name="fav_description"
              placeholder="Description about fav"
              value={fav.fav_description}
              onChange={handleInputChange}
            />
          </div>
          <div className="div_input">
            <input
              type="text"
              name="fav_link"
              placeholder="Paste here an image link"
              value={fav.fav_link}
              onChange={handleInputChange}
            />
          </div>
          <div className="div_button">
            <button className="register_button">Create Fav</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Favsform;
