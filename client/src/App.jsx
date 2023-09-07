import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SharedLayout,
  Home,
  Contact,
  Offers,
  MyAccount,
  AddOffers,
  DashboardUser,
  EditOffers,
  ErrorPage,
} from "../pages/index";

import LoginForm from "../components/form/LoginForm";
import RegisterForm from "../components/form/RegisterForm";

import { loader as userLoader } from "../pages/DashboardUser";
import { loader as myAccountLoader } from "../pages/MyAccount";
import { loader as editLoader } from "../pages/EditOffers";
import { loader as offersLoader } from "../pages/Offers";
import { loader as sharedlayoutLoader } from "../pages/SharedLayout";

import { action as registerAction } from "../components/form/RegisterForm";
import { action as loginAction } from "../components/form/LoginForm";
import { action as addoffersAction } from "../pages/AddOffers";
import { action as editAction } from "../pages/EditOffers";
import { action as deleteAction } from "../pages/DeleteOffers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    errorElement: <ErrorPage />,
    loader: sharedlayoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/login",
        element: <LoginForm />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegisterForm />,
        action: registerAction,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/offers",
        element: <Offers />,
        loader: offersLoader,
      },
    ],
  },
  {
    path: "/dashboarduser",
    element: <DashboardUser />,
    loader: userLoader,
    children: [
      {
        index: true,
        element: <MyAccount />,
        loader: myAccountLoader,
      },

      {
        path: "/dashboarduser/addoffer",
        element: <AddOffers />,
        action: addoffersAction,
      },
      {
        path: "/dashboarduser/editoffers/:id",
        element: <EditOffers />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "/dashboarduser/deleteoffers/:id",
        action: deleteAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
