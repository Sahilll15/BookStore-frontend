import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useDelete } from "../hooks/books";


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteBook, isLoading }=useDelete();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState('');
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };


  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDdmNmQ2MzgyMDQ1OTE0NjYzYmRjZTYiLCJpYXQiOjE2ODYwNzI4MzZ9.hbOgfgCYiuBfTqfQX8Smg8BWZQ33KiIsmnovvxbz7kA";
  let API = "https://bookstore-ksae.onrender.com/api/book/getbooks/";
  // let API = "http://localhost:4000/api/book/getbooks/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = API;
        const params = [];
        
        if (searchQuery) {
          params.push(`search=${encodeURIComponent(searchQuery)}`);
        }
        
        if (sortOption) {
          params.push(`sort=${encodeURIComponent(sortOption)}`);
        }
        
        if (params.length > 0) {
          url += `?${params.join("&")}`;
        }
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setData(data.books);
        } else {
          console.log("Error: ", response.status);
        }
        
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }, [searchQuery, sortOption]);


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
         <label>
        Sort by:
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="latest">Latest</option>
        </select>
      </label>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="row mx-5 my-4" style={{ marginTop: "20px" }}>
          {data.map((item) => (
            <BookCard key={item._id} item={item}  />
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default Home;