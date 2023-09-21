import React from "react";

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt=""
        />
      </div>
      <div className="text">
        <h2>Full house battery backup coming later this year</h2>
        <p className="info">
          <a href="" className="author">
            Aswin
          </a>
          <time>2023-01-0 16:458</time>
        </p>
        <p className="summary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi minus
          earum saepe, molestiae doloremque illum error nisi modi adipisci ipsam
          unde veritatis suscipit eveniet omnis accusantium autem facilis ex
          repellendus?
        </p>
      </div>
    </div>
  );
};

export default Post;
