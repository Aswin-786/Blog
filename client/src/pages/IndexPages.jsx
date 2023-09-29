import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";

const IndexPages = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/post").then((res) => setPost(res.data));
  }, []);

  return (
    <>
      {post.length > 0 && post.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPages;
