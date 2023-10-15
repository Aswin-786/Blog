import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

const useEditPost = () => {
  const { id } = useParams<{ id?: string }>();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const editPost = async () => {
    try {
      const res: AxiosResponse = await axios.get(
        `http://localhost:4000/post/${id}`
      );
      if (res.status === 200) {
        setTitle(res.data.title);
        setContent(res.data.content);
        setSummary(res.data.summary);
      }
    } catch (error) {}
  };

  useEffect(() => {
    editPost();
  }, []);

  const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetSummary = (e: ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  const handleSetContent = (value: string) => {
    setContent(value);
  };

  const handleSetFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  async function updatePost(e: React.FormEvent) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (id) {
      data.set("id", id);
    }
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response: AxiosResponse = await axios.put(
      `http://localhost:4000/post`,
      data,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      navigate(`/post/${id}`);
    }
  }
  return {
    updatePost,
    title,
    summary,
    content,
    files,
    handleSetTitle,
    handleSetSummary,
    handleSetContent,
    handleSetFiles,
  };
};

export default useEditPost;
