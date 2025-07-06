import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import LoadingSpinner from "../app/loader/LoadingSpinner";

export function SignupForm({ className, ...props }) {
  const { authUser, isSigningup, signup } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await signup(value);
        navigate("/login");
      } catch (error) {
        console.error("Signup error:", error);
      }
    },
  });
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Signup to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form.Field name="username">
          {(field) => (
            <div className="grid gap-3">
              <Label htmlFor="email">User Name</Label>
              <Input
                id="text"
                type="text"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <Button type="submit" className="w-full">
          {isSigningup ? "Signing..." : "Signup"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
