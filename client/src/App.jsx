import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cources from "./components/Courses";
import Calculator from "./components/Calculator";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Class from "./components/Class";
import ScrollToTop from "./components/ScrollToTop";
import Review from "./components/Review";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

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
        <Navbar setProgress={setProgress} />
        <Switch>
          <Route exact path="/">
            <HomePage setProgress={setProgress} />
          </Route>
          <Route exact path="/about">
            <About setProgress={setProgress} />
          </Route>
          <Route exact path="/courses">
            <Cources setProgress={setProgress} />
          </Route>
          <Route exact path="/calculators">
            <Calculator setProgress={setProgress} />
          </Route>
          <Route exact path="/login">
            <Login setProgress={setProgress} />
          </Route>
          <Route exact path="/signup">
            <Signup setProgress={setProgress} />
          </Route>
          <Route exact path="/class/:id">
            <Class setProgress={setProgress} />
          </Route>
          <Route exact path="/reviews">
            <Review setProgress={setProgress} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
