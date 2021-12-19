import './App.css';
import HomePage from './components/HomePage';
import About from './components/About';
import Reviews from './components/Review';
import Navbar from './components/static/Navbar';
import Login from './components/User/Login'
import Reset from './components/User/Reset'
import Signup from './components/User/Signup'
import Camarilla from './components/Calculators/Camarilla'
import Reversal from './components/Calculators/Reversal'
import OptionPrice from './components/Calculators/OptionPrice'
import NiftyRange from './components/Calculators/NiftyRange'
import Courses from './components/Class/Courses'
import Class from './components/Class/Class'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Forgot from './components/User/Forgot';

function App() {
  return(
    <BrowserRouter>
      <Navbar toast={toast}/>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage toast={toast} />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/courses" element={<Courses toast={toast} />} />
        <Route path="/courses/class/:id" element={<Class toast={toast} />} />
        <Route path="/calculators/camarilla" element={<Camarilla />} />
        <Route path="/calculators/reversal" element={<Reversal />} />
        <Route path="/calculators/niftyrange" element={<NiftyRange />} />
        <Route path="/calculators/optionprice" element={<OptionPrice />} />
        <Route path="/login" element={<Login toast={toast} />} />
        <Route path="/signup" element={<Signup toast={toast} />} />
        <Route path="/forgot-password" element={<Forgot toast={toast} />} />
        <Route path="/reset-password/:id/:token" element={<Reset toast={toast} />} />
      </Routes>
      <ToastContainer
                style={{ zIndex: '10000', margin: '10px' }}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                limit="3"
            />
    </BrowserRouter>
  );
}

export default App;
