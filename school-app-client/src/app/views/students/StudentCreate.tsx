import { Button, Stack, TextField, Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import {
  GetStudentsWithoutPostsDocument,
  useCreateStudentMutation,
} from "../../../generated/graphql";
import { alertProps } from "../../../interfaces";

export default function StudentCreate() {
  const [createStudent, { loading, data, error }] = useCreateStudentMutation({
    refetchQueries: [{ query: GetStudentsWithoutPostsDocument }],
    onError(error) {
      setAlert({ open: true, message: `${error.message}`, severity: "error" });
    },
    onCompleted(data) {
      
      setAlert({ open: true, message: `Student Created Name:${data.createStudent.name}`, severity: "success" });
    },
  });

  const [alert, setAlert] = useState<alertProps>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Stack>
      <TextField
        label="Name"
        variant="standard"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        label="E-Mail"
        variant="standard"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
      type="submit"
        variant="outlined"
        onClick={() => {
          createStudent({
            variables: {
              data: {
                email,
                name,
              },
            },
          });
        }}
      >
        Create
      </Button>
      <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
