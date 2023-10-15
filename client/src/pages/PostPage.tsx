import { formatISO9075 } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios, { AxiosResponse } from "axios";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userIdState } from "../store/selectors/userDetails";

interface PostInfo {
  _id: string;
  title: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  cover: string;
  content: string;
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const userId = useRecoilValue(userIdState);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res: AxiosResponse = await axios.get(
          `http://localhost:4000/post/${id}`
        );
        if (res.status === 200) {
          setPostInfo(res.data);
        }
      } catch (error) {}
    };
    getPost();
  }, []);

  if (!postInfo) return null;

  const deleteItem = async () => {
    const res: AxiosResponse = await axios.delete(
      `http://localhost:4000/post/${id}`,
      {}
    );
    if (res.status === 200) {
      navigate("/");
    }
  };

  return (
    <div className="post-page">
      <h1 className="text-3xl text-center font-medium">{postInfo.title}</h1>
      <div className=" flex justify-between mx-3 my-3">
        <Link to={`/user/${postInfo.author._id}`} className="author">
          by{" "}
          <span className="bg-stone-200 rounded-md p-1">
            {postInfo.author.username}
          </span>
        </Link>
        <time className=" text-stone-600 font-light italic">
          {formatISO9075(new Date(postInfo.createdAt))}
        </time>
      </div>
      {userId === postInfo.author._id && (
        <div className=" flex items-center justify-between my-10">
          <Link to={`/edit/${postInfo._id}`} className="w-1/3">
            <Button variant="outlined" color="error" startIcon={<EditIcon />}>
              Edit
            </Button>
          </Link>
          <Button
            variant="outlined"
            onClick={deleteItem}
            color="error"
            className="w-1/3"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      )}
      <div className="flex items-center justify-center">
        <img
          className="md:h-[500px] h-[300px]"
          src={"http://localhost:4000/" + postInfo.cover}
          alt=""
        />
      </div>

      <div
        className="text-justify my-9"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;