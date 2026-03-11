import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import LoginForm from "../components/forms/LoginForm";
import { loginThunk } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (data: { email: string; password: string }) => {
    try {
      dispatch(loginThunk(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Login Failed", error);
    }
  };
  return (
      <div className="flex justify-center">
        <LoginForm onSubmit={handleSubmit} />
      </div>
  );
}
