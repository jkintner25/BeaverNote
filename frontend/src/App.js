import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session";
import Footer from "./components/Footer/Footer";
import LoggedOut from "./components/LogStatus/LoggedOut";
import LoggedIn from "./components/LogStatus/LoggedIn";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <>
    {sessionUser ? <LoggedIn sessionUser={sessionUser} /> : <LoggedOut />}
      <Footer />
    </>
  );
}

export default App;
