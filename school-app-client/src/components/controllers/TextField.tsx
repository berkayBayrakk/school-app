import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import {
  Controller,
  FieldValues,
  Path,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";

export type TextProps<F extends FieldValues> = TextFieldProps &
  Pick<UseControllerProps<F>, "name" | "control"> &
  Pick<UseFormReturn<F>, "watch">;

export default function TextFieldController<F extends FieldValues>({
  name,
  control,
  watch,
  ...rest
}: TextProps<F>) {
  const path=`${name}` as Path<F>;
  const register = control?.register(path);
  const watchField = watch(path);


  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors }, fieldState: { error } }) => (
        <TextField
          {...rest}
          label="Text"
          variant="standard"
          maxRows={3}
          ref={field.ref}
          onChange={field.onChange}
          onBlur={field.onBlur}
          helperText={error?.message}
        />
      )}
    />
  );
}
