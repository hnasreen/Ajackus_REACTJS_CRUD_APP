import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation: Check if all fields are filled
    if (
      !values.firstname ||
      !values.lastname ||
      !values.email ||
      !values.department
    ) {
      alert("All fields are required. Please fill them out.");
      return;
    }

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        values
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        alert("New User added Successfully!");
        navigate("/");
      }
    } catch (error) {
      alert("Error Adding a New User: " + error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="mb-4" style={{ textAlign: "center" }}>
          Add a User
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              name="fname"
              className="form-control"
              placeholder="Enter the First Name"
              onChange={(e) =>
                setValues({ ...values, firstname: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              name="lname"
              className="form-control"
              placeholder="Enter the Last Name"
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
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="dept">Department:</label>
            <input
              type="text"
              name="dept"
              className="form-control"
              placeholder="Enter the Department"
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
            <button className="btn btn-success">Submit</button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
