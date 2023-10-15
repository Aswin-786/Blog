import React from "react";
import Editor from "../components/Editor";
import useEditPost from "../hooks/useEditPost";

const EditPage: React.FC = () => {
  const {
    updatePost,
    title,
    summary,
    content,
    files,
    handleSetTitle,
    handleSetSummary,
    handleSetContent,
    handleSetFiles,
  } = useEditPost();
  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleSetTitle}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={handleSetSummary}
      />
      <input type="file" onChange={handleSetFiles} />
      <Editor onChange={handleSetContent} value={content} />
      <button className="mt-2"> Update Post</button>
    </form>
  );
};

export default EditPage;
