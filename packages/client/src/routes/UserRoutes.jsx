import { useRoutes, Navigate } from "react-router";
import Homepage from "../pages/Homepage";
import NotFound from "../pages/NotFound";
import Loader from "../pages/Loader";
import { Suspense } from "react";
import Layout from "../pages/Layout";
import EmptyLayout from "../pages/EmptyLayout";
import ResumeViewPage from "../pages/ResumeViewPage";
import ResumesPage from "../pages/ResumesPage";
import Editor from "../pages/Editor";

const UserRoutes = () => {
  const routes = [
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
      path: "cv-editor/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <Editor />
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
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "register",
      element: <Navigate to="/dashboard" replace />,
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
  ];

  return useRoutes(routes);
};

export default UserRoutes;
