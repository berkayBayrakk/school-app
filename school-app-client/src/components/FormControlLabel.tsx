import { Switch,FormControlLabel } from "@mui/material";
import { useState } from "react";
export default function FormControlLabelComponent() {
  const [loading, setLoading] = useState(true);
  function handleClick() {
    setLoading(true);
  }
  return (
    <FormControlLabel
      sx={{
        display: "block",
      }}
      control={
        <Switch
          checked={loading}
          onChange={() => setLoading(!loading)}
          name="loading"
          color="default"
        />
      }
      label={(loading)?'White':'Dark'}
    />
  );
}
