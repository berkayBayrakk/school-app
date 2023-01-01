import { useState } from "react";
import { Post } from "../../../generated/graphql";
import PostForm from "./PostForm";
import PostsList from "./PostsList";

export type updatePostType = Pick<Post, "id" | "color" | "text">;

export default function PostsView() {
  const [updatePost, setUpdatePost] = useState<updatePostType>();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <PostsList setUpdatePost={setUpdatePost} />
      <PostForm setUpdatePost={setUpdatePost} updatePost={updatePost} />
    </div>
  );
}
