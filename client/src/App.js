import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ErrorsProvider } from "./context/ErrorsContext";
import { UserProvider } from "./context/UserContext";
import { BlogProvider } from "./context/BlogContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Errors from "./errors/Errors";
import BlogList from "./pages/BlogList";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ErrorsProvider>
      <UserProvider setLoading={setLoading}>
        <BlogProvider>
          <Navbar/>
          <Errors/>
          {
            loading ? <h1>Loading...</h1> :
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/signup"><Signup /></Route>
              <Route exact path="/login"><Login /></Route>
              <Route exact path="/blogs"><BlogList /></Route>
            </Switch>
          }
        </BlogProvider>
      </UserProvider>
    </ErrorsProvider>
  );
}

export default App;
