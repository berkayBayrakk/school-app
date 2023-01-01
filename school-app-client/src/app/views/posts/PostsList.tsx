import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useGetStudentPostsQuery } from "../../../generated/graphql";
import { dateGenerator } from "../../../helpers/dateHelper";
import { updatePostType } from "./PostsView";
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "text", headerName: "Text", width: 130 },
  {
    field: "color",
    headerName: "Color",
    width: 250,
  },
  {
    field: "updatedAt",
    headerName: "UpdatedAt",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    width: 250,
  },
  {
    field: "update",
    headerName: "Update",
    width: 250,
  },
];

interface postListProps {
  setUpdatePost: Dispatch<SetStateAction<updatePostType|undefined>>;
}

export default function PostsList({ setUpdatePost }: postListProps) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useGetStudentPostsQuery({
    variables: { data: { id: Number(id) } },
  });

  const cellClickHandler = (
    field: string,
    id: number,
    color: string,
    text: string
  ) => {
    if (field === "update") {
      setUpdatePost({ id: id, color: color, text: text });
    }
  };

  return (
    <div
      style={{
        width: "85%",
        height: 450,
        padding: "0 25px",
        backgroundColor: "white",
      }}
    >
      <DataGrid
        loading={loading}
        rows={
          data?.student.posts.map((obj) => {
            console.log(obj?.createdAt)
            let update = new Date(obj?.updatedAt as string);
            let create = new Date(obj?.createdAt as string);
            return {
              ...obj,
              updatedAt: dateGenerator(update),
              createdAt: dateGenerator(create),
              update: "Update",
            };
          }) ?? []
        }
        columns={columns}
        onCellClick={(props) => {
          cellClickHandler(
            props.field,
            Number(props.id),
            props.row.color,
            props.row.text
          );
        }}
      ></DataGrid>
    </div>
  );
}
