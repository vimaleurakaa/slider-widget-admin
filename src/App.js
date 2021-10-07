import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNavigation from "./components/SideNavigation";
import HomePage from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import CreateSlider from "./pages/NewSlider";
import TestPage from "./pages/TestPage";

const App = () => {
  return (
    <>
      <Router>
        <SideNavigation>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/slider" component={CreateSlider} />
            <Route path="/slider/edit/:id" component={CreateSlider} />
            <Route exact path="/test" component={TestPage} />
            <Route default component={PageNotFound} />
          </Switch>
        </SideNavigation>
      </Router>
    </>
  );
};

export default App;
