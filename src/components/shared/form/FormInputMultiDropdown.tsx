import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  name: string;
  label: string;
  control: any;
  isAction: string;
  options: any[] | undefined;
  optionKey: string;
  optionValue: string;
  optionLabel: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  roleName: readonly string[] | undefined,
  theme: Theme
) {
  return {
    fontWeight:
      roleName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FormInputMultiDropdown = ({
  name,
  control,
  label,
  isAction,
  options,
  optionKey,
  optionValue,
  optionLabel,
}: Props) => {
  const theme = useTheme();
  // const [selectedItems, setSelectedItems] = useState<string[] | undefined>(
  //   isAction != "New" ? [] : []
  // );
  const [selectedItems, setSelectedItems] = useState<string[] | undefined>([]);

  const handleSelect = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(typeof value === "string" ? value.split(",") : value);
    alert(selectedItems);
  };
  const generateSingleOptions = () => {
    return options?.map((option: any) => {
      return (
        <MenuItem
          key={option[optionKey]}
          value={option[optionValue]}
          style={getStyles(option[optionValue], selectedItems, theme)}
        >
          {option[optionLabel]}
          {selectedItems?.includes(option[optionValue]) ? (
            <CheckIcon color="info" />
          ) : null}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { value }, fieldState: { error } }) => (
          <Select
            multiple
            input={<OutlinedInput label="Chip" />}
            onChange={handleSelect}
            value={selectedItems}
            inputProps={{ readOnly: isAction == "View" ? true : false }}
            error={!!error}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default FormInputMultiDropdown;
