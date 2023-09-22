import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPages = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <>
      {post.length > 0 && post.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPages;
