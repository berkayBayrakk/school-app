import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Color,
  CreatePostInput,
  GetStudentPostsDocument,
  GetStudentsWithoutPostsDocument,
  UpdatePostInput,
  useCreatePostMutation,
  useCreateStudentMutation,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import * as yup from "yup";
import {
  Controller,
  FieldErrorsImpl,
  FieldValues,
  SubmitErrorHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import TextSelect from "../../../components/controllers/TextField";
import TextFieldController from "../../../components/controllers/TextField";
import TextSelectController from "../../../components/controllers/TextSelect";
import { COLORTYPE, COLORTYPELIST } from "../../../constants";
import { alertProps, IFormInputs } from "../../../interfaces";
import { updatePostType } from "./PostsView";

interface postUpdateProps {
  updatePost: updatePostType | undefined;
  setUpdatePost:Dispatch<SetStateAction<updatePostType | undefined>>;
}
export default function PostUpdate({ updatePost,setUpdatePost }: postUpdateProps) {
  const router = useRouter();
  const { id } = router.query;

  const [updatePostMutation, { loading, data, error }] = useUpdatePostMutation({
    refetchQueries: [
      {
        query: GetStudentPostsDocument,
        variables: { data: { id: Number(id) } },
      },
    ],
    onCompleted: (data) => {
        setAlert({ open: true, message: `Post Updated ID:${data.updatePost.id}`, severity: "success" });
        setUpdatePost(undefined);
    },
  });

  const schema = yup
    .object()
    .shape({
      text: yup.string().required("text is required").min(6).max(20),
      color: yup.mixed<Color>().oneOf(Object.values(Color)).required(),
    })
    .required();

  const { register, handleSubmit, control, setValue, watch,resetField, ...rest } =
    useForm<IFormInputs>({
      defaultValues: { text: "", color: Color.Blue },
      resolver: yupResolver(schema),
    });

  const [alert, setAlert] = useState<alertProps>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  const onSubmit = (data: IFormInputs) => {
    const updatePostInput: UpdatePostInput = {
      color: data.color ?? Color.Blue,
      text: data.text,
      id: updatePost?.id,
    };
    updatePostMutation({
      variables: {
        data: updatePostInput,
      },
    });
    
  };
  const onInvalid: SubmitErrorHandler<IFormInputs> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("color", updatePost?.color as Color);
    setValue("text", updatePost?.text ?? "");
  }, [updatePost?.id]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          p: 1,
          m: 1,
          border: "1px solid",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              disabled
              placeholder="ID"
              variant="standard"
              value={`${updatePost?.id ?? ""}`}
            ></TextField>
            <TextFieldController<IFormInputs>
              name={register("text").name}
              control={control}
              watch={watch}
              value={control._formValues.text}
              disabled={updatePost?.id ? false : true}
            />
            {TextSelectController<IFormInputs>(
              {
                control: control,
                name: register("color").name,
                disabled: updatePost?.id ? false : true,
              },
              { labelArray: COLORTYPE, typeArray: COLORTYPELIST }
            )}

            <Button type="submit" variant="outlined">
              Update
            </Button>
          </div>
        </form>
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
      </Box>
    </div>
  );
}
