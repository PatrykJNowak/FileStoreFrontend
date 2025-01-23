import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginView } from "./Login/LoginView";
import { SignInView } from "./SignIn/SignInView";
import { HeaderView } from "./Header/HeaderView";
import { FileView } from "./File/FileView";
import { NotFoundView } from "./NotFoundView";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginView />,
      errorElement: <NotFoundView />,
    },
    {
      path: "/signup",
      element: <SignInView />,
    },
    {
      path: "/file",
      element: <FileView />,
    },
  ]);

  return (
    <>
      <HeaderView />
      <RouterProvider router={router} />
    </>
  );
};
