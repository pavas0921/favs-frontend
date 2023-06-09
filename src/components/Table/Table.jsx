import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/users/userSlice";
import { selectUserState } from "../../features/users/userSlice";
import "./table.css";

const Table = () => {
  const { users, loading } = useSelector(selectUserState);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllUsers(token));
  }, []);

  const addUser = () => {
    console.log("add user");
  };

  return (
    <div className="main">
      <div className="div-title">
        <h1>Users List</h1>
      </div>

      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.userid}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="div-btn">
                    <button className="edit-btn">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="update-btn">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-button-container">
        <button className="add-button" onClick={addUser}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
