import { Dispatch, SetStateAction } from "react";
import PostCreate from "./PostCreate";
import { updatePostType } from "./PostsView";
import PostUpdate from "./PostUpdate";

interface postFormProps {
  updatePost: updatePostType | undefined;
  setUpdatePost: Dispatch<SetStateAction<updatePostType | undefined>>;
}

export default function PostForm({ updatePost,setUpdatePost }: postFormProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <PostCreate />
      <PostUpdate setUpdatePost={setUpdatePost} updatePost={updatePost} />
    </div>
  );
}
