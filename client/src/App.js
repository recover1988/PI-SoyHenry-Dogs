import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";


//here connect the routes in the app with redux
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Route exact path="/" component={LandingPage} />
        <Route path="/" component={Nav} /> */}

        <h1>Henry Dogs</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
