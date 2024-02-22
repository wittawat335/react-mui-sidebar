import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormInputProps {
  name: string;
  control: Control;
  setValue: (name: string, value: any) => void;
  label: string;
}

const options: Option[] = [
  {
    label: "Checkbox Option 1",
    value: "1",
  },
  {
    label: "Checkbox Option 2",
    value: "2",
  },
];

const FormInputMultiCheckbox = ({
  name,
  control,
  setValue,
  label,
}: FormInputProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  useEffect(() => {
    setValue(name, selectedItems);
  }, [name, selectedItems, setValue]);

  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel component="legend">{label}</FormLabel>
      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};

export default FormInputMultiCheckbox;
