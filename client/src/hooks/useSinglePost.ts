import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";

const useSinglePost = () => {
  interface PostInfo {
    _id: string;
    title: string;
    author: {
      _id: string;
      username: string;
    };
    createdAt: string;
    cover: string;
    content: string;
  }
  const { id } = useParams<{ id?: string }>();
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:4000/post/${id}`
      );
      if (res.status === 200) {
        setPostInfo(res.data);
      }
    } catch (error) {
      setError("error occurs");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!postInfo)
    return {
      error: null,
      postInfo: null,
    };

  const deleteItem = async () => {
    const res: AxiosResponse = await axios.delete(
      `http://localhost:4000/post/${id}`,
      {}
    );
    if (res.status === 200) {
      navigate("/");
    }
  };

  return {
    error,
    deleteItem,
    postInfo,
  };
};

export default useSinglePost;
