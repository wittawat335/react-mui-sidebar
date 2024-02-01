import * as z from "zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { SigninValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/lib/react-query/queries";
import { useUserContext } from "@/contexts/AuthContext";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (request: z.infer<typeof SigninValidation>) => {
    const response = await login(request);
    if (!response) {
      toast.error("Login failed. Please try again.");

      return;
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      toast.success(response.data.message);
      navigate("/");
    } else {
      toast.error("Login failed. Please try again.");

      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in</h2>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">E-Mail</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            loading={isPending}
            loadingPosition="start"
            startIcon={<FaSignInAlt />}
            variant="contained"
          >
            {isPending ? "Loading....." : "Log in"}
          </LoadingButton>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
