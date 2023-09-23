import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState("");

  const { userInfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPostInfo(data));
  }, []);

  if (!postInfo) return "";

  const deleteItem = async () => {
    const res = await fetch(`http://localhost:4000/post/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by {postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link to={`/edit/${postInfo._id}`} alt="" className="edit-button">
            Edit this Post
          </Link>
          <button onClick={deleteItem}>Delete Post</button>
        </div>
      )}
      <div className="image">
        <img src={"http://localhost:4000/" + postInfo.cover} alt="" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
