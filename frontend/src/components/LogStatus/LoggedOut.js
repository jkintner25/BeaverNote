import LoggedOutNav from "../Navigation/LoggedOutNav";
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from "../404Page/NotFoundPage";

function LoggedOut() {

    return (
        <LoggedOutNav />
    )
}

export default LoggedOut;
