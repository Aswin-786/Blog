import React, { ChangeEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const useCreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);

  const navigate = useNavigate();

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

  async function createNewPost(e: React.FormEvent) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (files && files[0]) {
      data.append("file", files[0]);
    }

    try {
      await axios.post("http://localhost:4000/post", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating a new post:", error);
    }
  }
  return {
    handleSetTitle,
    handleSetFiles,
    handleSetSummary,
    handleSetContent,
    createNewPost,
    title,
    summary,
    content,
    files,
  };
};

export default useCreatePost;
