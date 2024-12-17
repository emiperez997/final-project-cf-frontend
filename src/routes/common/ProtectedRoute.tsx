import { ReactNode } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  role = "user",
  children,
}: {
  role?: "admin" | "user";
  children: ReactNode;
}) {
  const isAuth = useAppStore((state) => state.isAuth);
  const user = useAppStore((state) => state.user);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
