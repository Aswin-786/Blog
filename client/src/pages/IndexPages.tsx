import React from "react";
import Post from "../components/Post";
import ErrorPage from "./ErrorPage";
import usePost from "../hooks/usePost";

const IndexPages: React.FC = () => {
  const { error, post } = usePost();
  return (
    <>
      {error && <ErrorPage />}
      {post.length > 0 && post.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPages;
