import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios, { AxiosResponse } from "axios";
import ErrorPage from "./ErrorPage";

interface PostDetails {
  _id: string;
  title: string;
  summary: string;
  cover: string;
  content: string;
  createdAt: string;
  author: {
    username: string;
  };
}

const IndexPages: React.FC = () => {
  const [post, setPost] = useState<PostDetails[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          "http://localhost:4000/post"
        );
        setPost(res.data);
      } catch (err) {
        setError(true);
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
