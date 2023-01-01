import { FieldValues } from "react-hook-form";
import { Color } from "./generated/graphql";

export interface alertProps {
  message: string;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
}
export interface IFormInputs extends FieldValues {
  text: string;
  color: Color;
}
