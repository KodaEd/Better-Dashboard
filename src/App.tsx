import { Route, Switch } from "wouter";
import "./App.css";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-black text-white w-full h-full">
      <Header />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
