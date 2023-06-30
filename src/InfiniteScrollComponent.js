import React, { useEffect, useState } from "react";
import { data } from "./db";

function InfiniteScrollComponent() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const fetchPosts = () => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    const newPosts = data.slice(start, end);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };

  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.category}</p>
        </div>
      ))}
    </div>
  );
}

export default InfiniteScrollComponent;
