/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router";
import Homepage from "../pages/Homepage";
import CVEditor from "../pages/CVEditor";
import NotFound from "../pages/NotFound";
import Loader from "../pages/Loader";
import { Suspense } from "react";
import Layout from "../pages/Layout";
import EmptyLayout from "../pages/EmptyLayout";
import ResumeViewPage from "../pages/ResumeViewPage";
import ResumesPage from "../pages/ResumesPage";
import LoginPage from "../pages/LoginPage";

export function HydrateFallback() {
  return <Loader />;
}
// Define routes with loaders
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Navigate to="/404" replace />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />, // Redirect from `/` to `/dashboard`
      },
      {
        path: "dashboard",
        element: <Homepage />,
      },
      {
        path: "resumes",
        element: <ResumesPage />,
      },
    ],
  },
  {
    path: "cv-editor",
    element: (
      <Suspense fallback={<Loader />}>
        <CVEditor />
      </Suspense>
    ),
  },
  {
    path: "cv",
    element: <EmptyLayout />,
    children: [
      {
        path: ":id",
        element: <ResumeViewPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "404",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default router;
