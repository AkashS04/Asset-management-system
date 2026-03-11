import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

type LoginProps = {
  onSubmit: (data: LoginFormInputs) => void;
};
export default function LoginForm({ onSubmit }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  return (
    <div className="bg-sky-50 p-8 rounded-md border-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80 "
      >
        <div className="flex flex-col mb-2 h-[70px]">
          <input
            type="email"
            className="bg-white py-4 px-2"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-2 h-[70px]">
          <input
            type="password"
            className="bg-white py-4 px-2"
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
        <button type="submit" className="bg-white text-gray-600 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
