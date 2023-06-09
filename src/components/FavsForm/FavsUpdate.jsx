import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFavs,
  selectFavState,
  getFavById,
  selectFavUpdateStatus,
  updateFav,
} from "../../features/favs/favsSlice";

const FavsUpdate = () => {
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

  useEffect(() => {
    if (data.favs.status && data.favs.status === 201) {
      navigate("/favs");
    }
  }, [data.favs.status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFavs((prevFav) => ({
      ...prevFav,
      [name]: value,
    }));
  };

  const handleSubmmit = (e) => {
    e.preventDefault();
    dispatch(updateFav(fav));
  };

  return (
    <form onSubmit={handleSubmmit}>
      {data && (
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
                value={fav?.fav_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="div_input">
              <input
                type="text-area"
                name="fav_description"
                placeholder="Description about fav"
                value={fav?.fav_description || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="div_input">
              <input
                type="text"
                name="fav_link"
                placeholder="Paste here an image link"
                value={fav?.fav_link || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="div_button">
              <button className="register_button">Update Fav</button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FavsUpdate;
