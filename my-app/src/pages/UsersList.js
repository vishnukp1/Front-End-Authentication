import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "react-bootstrap";
import "../styles/offerPedia.css";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://authapidemo.pythonanywhere.com/api/v1/users/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );

        const data = response.data.results;
        setUsers(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access. Redirecting to login...");
          // Redirect to the login page here
        } else {
          console.error("Error fetching users:", error);
          toast.error("Error fetching users. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbars />
      <div className="users-list-div">
        <h2>Users List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr className="table-head">
                <th style={{ color: "white", width: "2%" }}>ID</th>

                <th style={{ color: "white", width: "30%" }}>Name</th>
                <th style={{ color: "white", width: "55%" }}>Username</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.name}</td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <ToastContainer />
      </div>
      
      <Footer />
    </div>
  );
};

export default UsersList;
