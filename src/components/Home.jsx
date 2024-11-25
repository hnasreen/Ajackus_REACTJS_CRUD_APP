import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
    } catch (error) {
      alert("Error Fetching the data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Would you like to delete this user?");
    try {
      if (confirm) {
        const response = await axios.delete(
          "https://jsonplaceholder.typicode.com/users/" + id
        );
        console.log(response.status);
        if (response.status === 200) {
          alert("User Deleted Successfully!");
          location.reload();
        }
      }
    } catch (error) {
      alert("Error Fetching the data");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end mb-2">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user) => {
              const nameParts = user.name.split(" ");
              const firstName = nameParts[0];
              const lastName = nameParts.slice(1).join(" ");

              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.company.bs}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link
                        to={`/view/${user.id}`}
                        className="btn btn-info btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/update/${user.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => handleDelete(user.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
