import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import LoadingSpinner from "../app/loader/LoadingSpinner";

export function ForgotPasswordForm({ className, ...props }) {
  const { isLoading, forgotPassword } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await forgotPassword(value);
        navigate("/login");
      } catch (error) {
        console.error("Error in Resetting Password", error);
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
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to recover your password
        </p>
      </div>
      <div className="grid gap-6">
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
        <Button type="submit" className="w-full">
          {isLoading ? " Sending Email..." : "Send Email"}
        </Button>
      </div>
    </form>
  );
}
