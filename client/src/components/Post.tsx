import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
          <img
            className="rounded-l-md"
            src={
              "https://zepjyypndjdibhvsxifk.supabase.co/storage/v1/object/public/share/" +
              cover
            }
            alt=""
          />
        </div>
        <div className="text">
          <h2>{title}</h2>
          <div className="info">
            <a href="" className="author">
              {author.username}
            </a>
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
