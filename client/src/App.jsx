import { RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Login from "./pages/Login.jsx";
import HeroSection from "./pages/Student/HeroSection.jsx";
import Navbar from "./utils/Navbar.jsx";
import { BrowserRouter,createBrowserRouter } from "react-router-dom";
import Courses from "./pages/Student/Courses.jsx";
import MyLearning from "./pages/Student/MyLearning.jsx";
import Profile from "./pages/Student/Profile.jsx";
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
              <Courses/>
            </>
          ),
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"my-learning",
          element:<MyLearning/>
        },
        {
          path:"profile",
          element:<Profile/>
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
