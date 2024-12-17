import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/Main";

import { ContactPage } from "../features/contact/pages/ContactPage";
import { HomePage } from "../features/home/pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { PostsPage } from "../features/posts/pages/PostsPage";
import { NotFoundPage } from "../features/not-found/NotFound";
import { PostDetailPage } from "../features/posts/pages/PostDetailPage";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";
import { RestrictedRoute } from "./common/RestrictedRoute";
import { ProtectedRoute } from "./common/ProtectedRoute";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { PostCreatePage } from "../features/posts/pages/PostFormPage";
import { DashboardPage } from "../features/admin/pages/DashboardPage";

export function MainRoutes() {
  const initializeUser = useAppStore((state) => state.initializeUser);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/posts" element={<PostsPage />} />
        <Route
          path="/post/create"
          element={
            <ProtectedRoute>
              <PostCreatePage />
            </ProtectedRoute>
          }
        />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute>
              <PostCreatePage />
            </ProtectedRoute>
          }
        />

        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
