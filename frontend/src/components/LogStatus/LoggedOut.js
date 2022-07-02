import LoggedOutNav from "../Navigation/LoggedOutNav";
import { Route } from 'react-router-dom';
import SignupFormPage from "../SignupFormPage";

function LoggedOut() {

    return (
        <>
            <LoggedOutNav />
            <Route path="/signup">
                <SignupFormPage />
            </Route>
        </>
    )
}

export default LoggedOut;
