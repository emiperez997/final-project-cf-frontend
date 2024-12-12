import { ReactNode } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuth = useAppStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
