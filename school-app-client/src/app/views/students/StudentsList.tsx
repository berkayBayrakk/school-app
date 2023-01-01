import { Alert, Snackbar } from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  GetStudentsWithoutPostsDocument,
  useDeleteStudentByIdMutation,
  useGetStudentsWithoutPostsQuery,
} from "../../../generated/graphql";
import { alertProps } from "../../assets/interfaces/alert.interface";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "posts",
    headerName: "Posts",
    width: 250,
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 250,
  },
];

export default function StudentsList() {
  const navigation = useRouter();
  const { data, error, loading } = useGetStudentsWithoutPostsQuery();

  const [alert, setAlert] = useState<alertProps>({
    open: false,
    message: "",
    severity: "info",
  });
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const [deleteStudentByIdMutation, {}] = useDeleteStudentByIdMutation({
    refetchQueries: [{ query: GetStudentsWithoutPostsDocument }],
    onCompleted(data) {
      setAlert({
        message: `Student deleted Name:${data.deleteStudent.name}`,
        severity: "info",
        open: true,
      });
    },
  });

  const cellClickHandler = (field: string, id: number) => {
    if (field === "delete") {
      deleteStudentByIdMutation({ variables: { id } });
    } else if (field === "posts") {
      navigation.push(`/post/${id}`);
    }
  };

  return (
    <div
      style={{
        height: 400,
        width: "60%",
        padding: "0 25px",
        backgroundColor: "white",
      }}
    >
      <DataGrid
        rows={
          data?.students.map((student) => {
            return { ...student, posts: "Show Posts", delete: "Delete" };
          }) ?? []
        }
        columns={columns}
        loading={loading}
        onCellClick={(props) => {
          cellClickHandler(props.field, Number(props.id));
        }}
      />
      <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
