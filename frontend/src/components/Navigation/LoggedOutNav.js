import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignupModal";
import SplashPage from "../SplashPage/Splashpage";
import DemoUser from "./DemoUser";
import './Navigation.css';


function LoggedOutNav() {

    return (
        <div>
            <div className='logged-out-nav nav'>
                <LoginFormModal />
                <SignupFormModal />
                <DemoUser />
            </div>
            <div className='splash-page'>
                <SplashPage />
            </div>
        </div>
    )
}

export default LoggedOutNav;
