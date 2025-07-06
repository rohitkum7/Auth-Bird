import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid lg:grid-cols-2 w-full h-full overflow-hidden">
      {/* Left Column: Form */}
      <div className="flex flex-col gap-6 p-6 md:p-10 h-full">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Column: Background Image */}
      <div className="relative hidden lg:block h-full">
        <img
          src="./login.jpg"
          alt="Login Illustration"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
