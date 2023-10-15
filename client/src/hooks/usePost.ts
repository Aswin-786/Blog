import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const usePost = () => {
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
  const [post, setPost] = useState<PostDetails[]>([]);
  const [error, setError] = useState<boolean>(false);

  const getPost = async () => {
    try {
      const res: AxiosResponse = await axios.get("http://localhost:4000/post");
      setPost(res.data);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return {
    post,
    error,
  };
};

export default usePost;
