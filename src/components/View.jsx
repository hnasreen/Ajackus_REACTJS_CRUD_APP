import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://6747148d38c8741641d54f0f.mockapi.io/users/${id}`
      );
      setData(response.data);
    } catch (error) {
      alert("Error Fetching the data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="card w-50 shadow-lg p-4 rounded">
        <div className="text-center">
          {/* Profile Icon */}
          <div
            className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#6c63ff",
              color: "#fff",
              fontSize: "2rem",
            }}
          >
          </div>
          <h3 className="mb-2">{data.firstname || "N/A"}</h3>
          <p className="text-muted">ID: {data.id || "N/A"}</p>
        </div>

        {/* Details Section */}

        <div className="mt-3">
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <strong>First Name:</strong>
            <span>{data.firstname}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <strong>Last Name:</strong>
            <span>{data.lastname}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <strong>Email:</strong>
            <span>{data.email || "N/A"}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <strong>Department:</strong>
            <span>{data.department || "N/A"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="text-center mt-4"
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <Link to={`/update/${id}`} className="btn btn-success me-2">
            Edit
          </Link>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
