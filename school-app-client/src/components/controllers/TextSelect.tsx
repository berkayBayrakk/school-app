import {
  MenuItem,
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

export type TextProps<F extends FieldValues> = TextFieldProps &
  Pick<UseControllerProps<F>, "name" | "control">;
type ArrayProps = {
  typeArray: any[];
  labelArray: any;
};
export default function TextSelectController<F extends FieldValues>(
  { name, control, ...rest }: TextProps<F>,
  { labelArray, typeArray }: ArrayProps
) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors }, fieldState: { error } }) => (
        <TextField
          select
          value={control?._formValues.color}
          label={`${name}`}
          variant="standard"
          maxRows={3}
          ref={field.ref}
          onChange={field.onChange}
          onBlur={field.onBlur}
          helperText={error?.message}
          defaultValue={typeArray[0]}
          {...rest}
        >
          {typeArray.map((c, index) => (
            <MenuItem key={index} value={c} ref={field.ref}>
              {labelArray[c]}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
