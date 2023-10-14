import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios, { AxiosResponse } from "axios";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    editPost();
  }, []);

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

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button className="mt-2"> Update Post</button>
    </form>
  );
};

export default EditPage;
