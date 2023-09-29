import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";

const EditPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const [cover, setCover] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setSummary(res.data.summary);
    });
  }, []);

  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await axios.put(`http://localhost:4000/post`, data, {
      withCredentials: true,
    });

    if (response.status === 200) {
      navigate(`/post/${id}`);
    }
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
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
