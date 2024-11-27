import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState(1); 
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://6747148d38c8741641d54f0f.mockapi.io/users"
      );
      setData(response.data);
      console.log(response.data)
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
    if (currentPage < totalPages) {
      setCurrentPage((prev) => {
        const newPage = prev + 1;
        setInputValue(newPage); 
        return newPage;
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const newPage = prev - 1;
        setInputValue(newPage); 
        return newPage;
      });
    }
  };

  const handlePageInput = (value) => {
    const pageNumber = parseInt(value, 10);
    if (!isNaN(pageNumber)) {
      setInputValue(pageNumber);
    } else {
      setInputValue(""); 
    }
  };
  
  const handlePageJump = () => {
    if (inputValue >= 1 && inputValue <= totalPages) {
      setCurrentPage(inputValue);
    } else {
      alert("Please enter a valid page number.");
      setInputValue(currentPage); 
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Would you like to delete this user?");
    try {
      if (confirm) {
        const response = await axios.delete(
          "https://6747148d38c8741641d54f0f.mockapi.io/users/" + id
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
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
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
    Page 
    <input
      type="text"
      value={inputValue}
      onChange={(e) => handlePageInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handlePageJump();
        }
      }}
      style={{ width: "50px", textAlign: "center", marginLeft: "5px", marginRight: "5px" }}
    />
    of {totalPages}
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
