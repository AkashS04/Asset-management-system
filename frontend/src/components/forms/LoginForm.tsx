import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

type LoginProps = {
  onSubmit: (data: LoginFormInputs) => void;
  credentialError?: string | null;
  loading?: boolean;
};
export default function LoginForm({
  onSubmit,
  credentialError,
  loading,
}: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  return (
    <div className="bg-sky-100 p-8 rounded-lg border-hidden">
      <h3 className="text-center text-xl mb-4">DEMO-ASM LOGIN</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80 "
      >
        <div className="flex flex-col mb-2 h-[70px]">
          <input
            type="email"
            className="bg-white py-4 px-2 border-gray-300 focus-visible:outline-none"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              setValueAs: (v) => v.trim(),
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-2 h-[70px]">
          <input
            type="password"
            className="bg-white py-4 px-2 border-gray-300 focus-visible:outline-none"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 charecters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {credentialError && (
          <p className="text-red-500 text-sm text-center">{credentialError}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white text-gray-600 p-2 cursor-pointer rounded"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
