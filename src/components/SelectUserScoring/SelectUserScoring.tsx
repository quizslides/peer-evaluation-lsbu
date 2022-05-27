import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface ISelectUserScoring {
  value: string;
  onChange: (event: PointerEvent) => void;
}

const SelectUserScoring = ({ ...props }) => {
  return (
    <Select fullWidth={true} {...props}>
      {[1, 2, 3, 4, 5].map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

const selectUserScoring = ({ onChange, value }: ISelectUserScoring) => (
  <SelectUserScoring onChange={onChange} value={value} />
);

export default selectUserScoring;
