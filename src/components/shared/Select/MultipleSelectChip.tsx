import { FC, useState } from "react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

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

export default function MultipleSelectChip() {
  return (
    <>
      <MultiSelect />
    </>
  );
}

const MultiSelect: FC = () => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  return (
    <FormControl sx={{ m: 1, width: 500 }}>
      <InputLabel>Multiple Select</InputLabel>
      <Select
        multiple
        value={selectedNames}
        onChange={(e) => setSelectedNames(e.target.value as string[])}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedNames(
                    selectedNames.filter((item) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{ justifyContent: "space-between" }}
          >
            {name}
            {selectedNames.includes(name) ? <CheckIcon color="info" /> : null}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
