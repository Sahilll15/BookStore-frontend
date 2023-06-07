import React, { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDdmNmQ2MzgyMDQ1OTE0NjYzYmRjZTYiLCJpYXQiOjE2ODYwNzI4MzZ9.hbOgfgCYiuBfTqfQX8Smg8BWZQ33KiIsmnovvxbz7kA";
  let API = "https://bookstore-ksae.onrender.com/api/book/getbooks/";
  if (searchQuery) {
    API += `?search=${encodeURIComponent(searchQuery)}`;
  }

  const getData = () => {
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.books);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, [searchQuery]);

  return (
    <>
      <div className="d-flex">
        <input
          className="form-control me-3 mx-3 my-3"
          type="search"
          placeholder="Search books"
          aria-label="Search"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
         
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="row mx-4 my-4" style={{ marginTop: "20px" }} >
          {data.map((item) => (
            <div className="col-sm-3 mt-4" key={item._id}>
                 <Link to={`/api/book/${item._id}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-image-container">
                  <img
                    style={{ width: "1000%", height: "350px" }}
                    src={item.image || "default-image.jpg"} // Replace "default-image.jpg" with your default image path
                    className="card-img-top"
                    alt="Book Cover"
                    onError={(e) => {
                      e.target.src =
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Bhv9K6DJZZkBX2C3s16vO0X6580sWCrxVQ&usqp=CAU";
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {item.description.length > 20
                      ? item.description.substring(0, 20) + "..."
                      : item.description}
                  </p>
                  <div className="d-flex align-items-center">
                    <p className="card-text mb-0 mx-2 my-2">
                      Price: {item.price}
                    </p>
                    <FaMoneyBill className="ml-2" />
                  </div>

                  <a className="btn btn-primary my-2">Add to cart</a>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default Home;
