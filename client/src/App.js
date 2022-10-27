import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from "./components/Home/Home";
import DogDetail from "./components/DogDetail/DogDetail";

//here connect the routes in the app with redux
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={DogDetail} />
        {/* <Route path="*" component={Error} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
