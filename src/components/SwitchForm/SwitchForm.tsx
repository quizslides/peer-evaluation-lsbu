import React, { memo, useState } from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";

interface ISwitchForm {
  initialState: boolean;
  label: string;
  name: string;
  labelPlacement: "top" | "end" | "start" | "bottom" | undefined;
  onStateChange: (state: boolean) => void;
}

const SwitchForm = ({ initialState, label, name, labelPlacement, onStateChange }: ISwitchForm) => {
  const [checked, setChecked] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onStateChange(event.target.checked);
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} name={name} />}
          label={label}
          labelPlacement={labelPlacement}
        />
      </FormGroup>
    </FormControl>
  );
};

export default memo(SwitchForm);
