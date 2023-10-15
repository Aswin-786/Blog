import React from "react";
import Editor from "../components/Editor";
import useCreatePost from "../hooks/useCreatePost";

const CreatePost: React.FC = () => {
  const {
    title,
    summary,
    content,
    files,
    handleSetTitle,
    handleSetFiles,
    handleSetSummary,
    handleSetContent,
    createNewPost,
  } = useCreatePost();

  return (
    <form onSubmit={createNewPost} className="flex flex-col gap-5 mt-32">
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
      <button className="mt-2"> Create Post</button>
    </form>
  );
};

export default CreatePost;
