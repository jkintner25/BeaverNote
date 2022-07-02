import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignupModal";
import SplashPage from "../SplashPage/Splashpage";
import DemoUser from "./DemoUser";
import './Navigation.css';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from "../404Page/NotFoundPage";


function LoggedOutNav() {

    return (
        <>
            <div className='logged-out-nav nav'>
                <LoginFormModal />
                <SignupFormModal />
                <DemoUser />
            </div>
            <Switch>
                <Route exact path='/'>
                    <div className='splash-page'>
                        <SplashPage />
                    </div>
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    )
}

export default LoggedOutNav;
