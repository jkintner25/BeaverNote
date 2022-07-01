import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Sidebar from "./components/SideBar/Sidebar";
import NoteForm from "./components/Note/NoteForm";
import NoteView from "./components/Note/NoteView";
import NotebookForm from "./components/NotebookForm/NotebookForm";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/home">
            <Sidebar />
            <NotebookForm />
            <NoteForm />
            <NoteView />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
