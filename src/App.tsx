import { Route, Switch } from "wouter";
import "./App.css";
import Header from "./components/Header";
import Settings from "./pages/SettingsPage";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <div className="bg-black text-white w-full h-full p-5">
      <Header />
      <div className="mt-5">
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
    </div>
  );
}

export default App;
