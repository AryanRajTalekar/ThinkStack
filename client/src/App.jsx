import { RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Login from "./pages/Login.jsx";
import HeroSection from "./pages/Student/HeroSection.jsx";
import Navbar from "./utils/Navbar.jsx";
import { BrowserRouter,createBrowserRouter } from "react-router-dom";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
            </>
          ),
        },
        {
          path:"login",
          element:<Login/>
        }
      ],
    },
  ]);
  return (
    <>
      <main>
        <RouterProvider router={appRouter}/>
      </main>
    </>
  );
}

export default App;
