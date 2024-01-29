import { Box, Container, Stack, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";

export default function FormMuiZod() {
  return (
    <>
      <Typography variant="h4" color={"blue"} sx={{ textAlign: "center" }}>
        Form validation with Zod and React hook form
      </Typography>
      <Stack spacing={2} margin={2} width={400}>
        <RegisterForm />
      </Stack>
    </>
  );
}
