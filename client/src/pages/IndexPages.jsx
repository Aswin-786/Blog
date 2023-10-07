import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import ErrorPage from "./ErrorPage";

const IndexPages = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://localhost:4000/post");
        setPost(res.data);
      } catch (error) {
        setError(error);
      }
    };
    getPost();
  }, []);

  return (
    <>
      {error && <ErrorPage />}
      {post.length > 0 && post.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPages;
