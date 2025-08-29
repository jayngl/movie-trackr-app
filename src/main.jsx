import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Mainlayout from "./Layouts/Mainlayout.jsx";
import Actors from "./Pages/Actors.jsx";
import Movies from "./Pages/Movies.jsx";
import Publishers from "./Pages/Publishers.jsx";
import Home from "./Pages/Home.jsx";
import SingleActor from "./Pages/SingleActor.jsx";
import SinglePublisher from "./Pages/SinglePublisher.jsx";
import SingleMovie from "./Pages/SingleMovie.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import WatchedList from "./Pages/WatchedList.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },

      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:id",
        element: <SingleMovie />,
      },

      {
        path: "publishers",
        element: <Publishers />,
      },
      {
        path: "publishers/:id",
        element: <SinglePublisher />,
      },
      {
        path: "actors",
        element: <Actors />,
      },
      {
        path: "actors/:id",
        element: <SingleActor />,
      },
      {
        path: "watched",
        element: <WatchedList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
