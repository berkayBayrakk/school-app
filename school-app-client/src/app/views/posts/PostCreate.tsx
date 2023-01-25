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
import { useState } from "react";
import {
  Color,
  CreatePostInput,
  GetStudentPostsDocument,
  GetStudentsWithoutPostsDocument,
  useCreatePostMutation,
  useCreateStudentMutation,
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
import { IFormPostInputs } from "../../../interfaces";


export default function PostCreate() {
  const router = useRouter();
  const { id } = router.query;

  const [createPost, { loading, data, error }] = useCreatePostMutation({
    refetchQueries: [
      {
        query: GetStudentPostsDocument,
        variables: { data: { id: Number(id) } },
      },
    ],
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const schema = yup
    .object()
    .shape({
      text: yup.string().required("text is required").min(6).max(20),
      color: yup.mixed<Color>().oneOf(Object.values(Color)).required(),
    })
    .required();

  const { register, handleSubmit, control, watch, ...rest } =
    useForm<IFormPostInputs>({
      defaultValues: { text: "", color: Color.Blue },
      resolver: yupResolver(schema),
    });

  const onSubmit = (data: IFormPostInputs) => {
    const saveInput: CreatePostInput = {
      color: data.color ?? Color.Blue,
      text: data.text,
      studentId: Number(id),
    };
    createPost({
      variables: {
        data: saveInput,
      },
    });
  };
  const onInvalid: SubmitErrorHandler<IFormPostInputs> = (data) => {
    console.log(data);
  };

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
            <TextFieldController<IFormPostInputs>
              name={register("text").name}
              control={control}
              watch={watch}
            />
            {TextSelectController<IFormPostInputs>(
              { control: control, name: register("color").name },
              { labelArray: COLORTYPE, typeArray: COLORTYPELIST }
            )}

            <Button type="submit" variant="outlined">
              Create
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}
