import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFavState, getFavById } from "../../features/favs/favsSlice";
import "./fav_details.css";

const FavDetails = () => {
  const [fav, setFavs] = useState({
    fav_name: "",
    fav_description: "",
    fav_link: "",
    userid: localStorage.getItem("userid"),
    token: localStorage.getItem("token"),
  });

  const dispatch = useDispatch();
  const data = useSelector(selectFavState);
  const navigate = useNavigate();

  useEffect(() => {
    const favid = localStorage.getItem("favid");
    const token = localStorage.getItem("token");
    dispatch(getFavById({ token, favid }));
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    if (data) {
      setFavs(data.favs);
    }
  }, [data]);

  const goBack = () => {
    navigate("/favs");
  };

  return (
    <div className="main_div">
      <div className="title_div">
        <span>{fav.fav_name}</span>
      </div>

      <div className="div_form">
        <div className="div_img">
          <img src={fav.fav_link} alt={fav.fav_link} />
        </div>
        <div className="div_description">
          <p>{fav.fav_description}</p>
        </div>
      </div>
      <div className="add-button-container">
        <button className="add-button" onClick={goBack}>
          <span className="material-symbols-outlined">
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default FavDetails;
