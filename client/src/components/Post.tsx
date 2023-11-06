import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { IMG_URL } from "../shared/config";

interface PostProps {
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

const Post: React.FC<PostProps> = ({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) => {
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="image">
          <img className="rounded-l-md" src={IMG_URL + cover} alt="" />
        </div>
        <div className="text">
          <h2>{title}</h2>
          <div className="info">
            <p className="author">{author.username}</p>
            <time className="font-light">
              {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </div>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
