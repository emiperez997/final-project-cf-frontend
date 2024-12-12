import { ReactNode } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Navigate } from "react-router-dom";

export function RestrictedRoute({ children }: { children: ReactNode }) {
  const isAuth = useAppStore((state) => state.isAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
