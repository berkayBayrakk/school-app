import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import {
  GetStudentsWithoutPostsDocument,
  useCreateStudentMutation,
} from "../../../generated/graphql";
import * as yup from "yup";
import { FieldErrorsImpl, SubmitErrorHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { alertProps, IFormStudentInputs } from "../../../interfaces";
import { watch } from "fs";
import TextFieldController from "../../../components/controllers/TextField";

interface IFormInputs {
  name: string;
  email: string;
}

export default function StudentForm() {
  const [createStudent, { loading, data, error }] = useCreateStudentMutation({
    refetchQueries: [{ query: GetStudentsWithoutPostsDocument }],

    onCompleted(data) {
      setAlert({
        open: true,
        message: `Student Created Name:${data.createStudent.name}`,
        severity: "success",
      });
    },
  });
  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };
  const [alert, setAlert] = useState<alertProps>({
    open: false,
    message: "",
    severity: "info",
  });

  const schema = yup
    .object()
    .shape({
      name: yup.string().required().min(6).max(20),
      email: yup.string().email().required(),
    })
    .required();

  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: { name: "", email: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    createStudent({
      variables: {
        data: {
          ...data,
        },
      },
    });
  };

  const onInvalid: SubmitErrorHandler<any> = (
    data: Partial<FieldErrorsImpl<any>>
  ) => {
    setAlert({
      message: `Email:${data.email?.message} Name:${data.name?.message}`,
      open: true,
      severity: "error",
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          p: 1,
          m: 1,
          border: "1px solid",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          width:250
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <Stack>
            <TextFieldController<IFormStudentInputs>
              name={register("name").name}
              watch={watch}
              control={control}
            />
            <TextFieldController<IFormStudentInputs>
              name={register("email").name}
              watch={watch}
              control={control}
            />
            <Snackbar
              open={alert.open}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={alert.severity}
                sx={{ width: "100%" }}
              >
                {alert?.message}
              </Alert>
            </Snackbar>
            <Button type="submit" variant="outlined">
              Create
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
}
