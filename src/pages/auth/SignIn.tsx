import * as z from "zod";
import { SigninValidation } from "@/lib/validation";
import { useLogin } from "@/services/mutations/authMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <div>
      {" "}
      <h1 className="">Hello world!</h1>
    </div>
  );
}
