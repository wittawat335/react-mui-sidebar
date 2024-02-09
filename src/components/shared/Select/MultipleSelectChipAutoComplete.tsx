import React from "react";
import { MenuItem, Autocomplete, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const names: string[] = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];

export default function MultipleSelectChipAutoComplete() {
  return (
    <>
      <MultiAutocomplete />
    </>
  );
}

const MultiAutocomplete: React.FC = () => {
  return (
    <Autocomplete
      sx={{ m: 1, width: 500 }}
      multiple
      id="tags-standard"
      options={names}
      getOptionLabel={(option) => option}
      defaultValue={[names[0], names[1]]}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <MenuItem
          key={option}
          value={option}
          sx={{ justifyContent: "space-between" }}
          {...props}
        >
          {option}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Multiple Autocomplete"
          placeholder="Favorites"
        />
      )}
    />
  );
};
