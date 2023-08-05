// import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Success from './pages/Success';
import Fail from './pages/Fail';
import Subscription from './pages/Subscription';

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path='/subscription' element={<Subscription />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/checkout-success" element={<Success />} />
            <Route path="/checkout-failed" element={<Fail />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </div>
  );
}

export default App;
