import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import LoginForm from "../components/forms/LoginForm";
import {
  clearError,
  loginThunk,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
} from "../features/auth/authSlice";
import { useEffect } from "react";
import IntroModal from "../components/intro/IntroModal";
import toast from "react-hot-toast";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const error = useAppSelector(selectAuthError);
  const loading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      sessionStorage.setItem("uploadCount", "0");
      navigate("/dashboard", { replace: true });
    } catch(err) {
      toast.error("Login Failed" , { icon: "❌"})
      console.log(err)
    }
  };
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <IntroModal></IntroModal>
      <div className="">
      <LoginForm onSubmit={handleSubmit} credentialError={error} loading={loading} />
      </div>
    </div>
  );
}
