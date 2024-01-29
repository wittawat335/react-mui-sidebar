import FormMuiZod from "@/components/form-mui-zod";
import FormWithReactHookForm from "@/components/form-with-react-hook-form";
import FormWithReactHookFormAndZod from "@/components/form-with-rhf-and-zod";
import FormWithReactHookFormAndZodAndServer from "@/components/form-with-rhf-and-zod-and-server";
import FormWithoutReactHookForm from "@/components/form-without-react-hook-form";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={2} columns={16}>
      <Grid xs={16}>
          <FormMuiZod />
        </Grid>
        <Grid xs={8}>
          <FormWithReactHookForm />
        </Grid>
        <Grid xs={8}>
          {" "}
          <FormWithReactHookFormAndZodAndServer />
        </Grid>
        <Grid xs={8}>
          <FormWithReactHookFormAndZod />
        </Grid>
        <Grid xs={8}>
          {" "}
          <FormWithoutReactHookForm />
        </Grid>
       
      </Grid>
    </>
  );
}
