import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/store";

export function ResetPasswordForm({ className, ...props }) {
  const { isLoading, resetPassword } = useAuthStore();
  const navigate = useNavigate();
  const { token } = useParams();
  const form = useForm({
    defaultValues: {
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await resetPassword(value, token);
        navigate("/login");
      } catch (error) {
        console.error("Reset Password Error", error);
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
        <h1 className="text-2xl font-bold">Reset your Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your new password to update
        </p>
      </div>
      <div className="grid gap-6">
        <form.Field name="newPassword">
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
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </div>
    </form>
  );
}
