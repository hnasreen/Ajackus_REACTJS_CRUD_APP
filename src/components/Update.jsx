import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const user = response.data;
      const nameParts = user.name ? user.name.split(" ") : [""];
      setValues({
        firstname: nameParts[0] || "",
        lastname: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        department: user.company?.bs || "",
      });
    } catch (error) {
      alert("Error Fetching the data: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://jsonplaceholder.typicode.com/users/" + id,
        values
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        alert("User Updated Successfully!");
        navigate("/");
      }
    } catch (error) {
      alert("Error updating the user: " + error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Update User
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              placeholder="Enter the First Name"
              value={values.firstname}
              onChange={(e) =>
                setValues({ ...values, firstname: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              placeholder="Enter the Last Name"
              value={values.lastname}
              onChange={(e) =>
                setValues({ ...values, lastname: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter the Email Address"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Enter the Department"
              value={values.department}
              onChange={(e) =>
                setValues({ ...values, department: e.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button className="btn btn-success">Update</button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
