import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFavs, deleteFav } from "../../features/favs/favsSlice";
import {
  selectFavState,
  selectFavDeleteStatus,
} from "../../features/favs/favsSlice";
import { useNavigate } from "react-router-dom";
import "./favstable.css";

const FavsTable = () => {
  const data = useSelector(selectFavState);
  const deleted = useSelector(selectFavDeleteStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getAllFavs(token));
    if (!token) navigate("/");
  }, []);

  useEffect(() => {
    if (deleted && deleted.favs && deleted.favs.status === 201) {
      const token = localStorage.getItem("token");
      dispatch(getAllFavs(token));
    } else {
      null;
    }
  }, [deleted?.favs?.status]);

  const addFav = () => {
    navigate("/fav/create");
  };

  const editFav = (favid) => {
    localStorage.setItem("favid", favid);
    console.log(favid);
    navigate(`/fav/edit/${favid}`);
  };

  const showFavBtn = (favid) => {
    localStorage.setItem("favid", favid);
    console.log(favid);
    navigate(`/fav/${favid}`);
  };

  const deleteFavBtn = (favid) => {
    const token = localStorage.getItem("token");
    dispatch(deleteFav({ token, favid }));
  };

  return (
    <div className="main">
      <div className="div-title">
        <h1>Favs List</h1>
      </div>

      <div className="div-table">
        {data.favs && Array.isArray(data.favs) && data.favs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Fav Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.favs.map((fav, index) => (
                <tr key={index}>
                  <td>{fav.favid}</td>
                  <td>{fav.fav_name}</td>
                  <td>{fav.fav_description}</td>
                  <td>
                    <div className="div-btn">
                      <button
                        className="edit-btn"
                        onClick={() => editFav(fav.favid)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteFavBtn(fav.favid)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                      <button
                        className="show-btn"
                        onClick={() => showFavBtn(fav.favid)}
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay favoritos en la base de datos</p>
        )}
      </div>

      <div className="add-button-container">
        <button className="add-button" onClick={addFav}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
};

export default FavsTable;
