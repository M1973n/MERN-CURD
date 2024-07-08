import  { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch("https://mern-curd-eg5h.onrender.com/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched users:", data); // Check the fetched data

      // Update users state only if data is an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.log("Data is not an array:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Handle error by setting users to an empty array
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://mern-curd-eg5h.onrender.com/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      
      getAllUserData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    getAllUserData();
   
  }, []); // Fetch data only once on component mount

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin User Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => (
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td>
                    <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteUser(curUser._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
