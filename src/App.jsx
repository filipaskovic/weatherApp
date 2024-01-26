import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoutes from "./Utils/PrivateRoutes";
import PublicRoutes from "./Utils/PublicRoutes";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className=' App bg-light-gradient dark:bg-dark-gradient font-indie dark:text-pink-50  min-h-screen grid place-items-center'>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path='/' exact />
            <Route element={<About />} path='/about' />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route element={<Login />} path='/login' />
            <Route element={<Signup />} path='/signup' />
          </Route>
          <Route element={<NotFound />} path='*' />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
