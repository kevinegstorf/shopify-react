import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <NavMenu />
        <Cart />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/:slug" component={ProductPage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
