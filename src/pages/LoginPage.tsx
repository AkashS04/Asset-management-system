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
      navigate("/dashboard", { replace: true });
    } catch {}
  };
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <div className="">
      <LoginForm onSubmit={handleSubmit} credentialError={error} loading={loading} />
      </div>
    </div>
  );
}
