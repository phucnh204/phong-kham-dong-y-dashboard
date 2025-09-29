import { LoginForm } from "./../../components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-green-50 to-white p-4 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
