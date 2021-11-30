import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cources from "./components/Courses";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Class from "./components/Class";
import ScrollToTop from "./components/ScrollToTop";
import Review from "./components/Review";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";
import OptionPrice from "./components/OptionPrice";
import NiftyRange from "./components/NiftyRange.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Camarilla from "./components/Camarilla.jsx";

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Router>
        <ScrollToTop />
        <Navbar setProgress={setProgress} toast={toast} />
        <Switch>
          <Route exact path="/">
            <HomePage setProgress={setProgress} />
          </Route>
          <Route exact path="/about">
            <About setProgress={setProgress} />
          </Route>
          <Route exact path="/courses">
            <Cources setProgress={setProgress} toast={toast} />
          </Route>
          <Route exact path="/login">
            <Login setProgress={setProgress} toast={toast}/>
          </Route>
          <Route exact path="/signup">
            <Signup setProgress={setProgress} toast={toast} />
          </Route>
          <Route exact path="/courses/class/:id">
            <Class setProgress={setProgress} />
          </Route>
          <Route exact path="/reviews">
            <Review setProgress={setProgress} toast={toast} />
          </Route>
          <Route exact path="/calculators/optionprice">
            <OptionPrice />
          </Route>
          <Route exact path="/calculators/niftyrange">
            <NiftyRange />
          </Route>
          <Route exact path="/calculators/camarilla">
            <Camarilla />
          </Route>
        </Switch>
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
        <Footer />
      </Router>
    </>
  );
}

export default App;
