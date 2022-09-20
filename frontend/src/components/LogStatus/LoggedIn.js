import LoggedInNav from "../Navigation/LoggedInNav";
import { Switch, Route } from 'react-router-dom';
import Sidebar from "../SideBar/Sidebar";
import NotFoundPage from "../404Page/NotFoundPage";
import { useSelector } from "react-redux";
import PrintNote from "../Note/Print";


function LoggedIn({ sessionUser }) {
    const thisNote = useSelector(state => state.notes)

    return (
        <>
            <LoggedInNav sessionUser={sessionUser} />
            <Switch>
                <Route exact path="/">
                    <div className="row">
                        <div className="col-one">
                            <Sidebar />
                        </div>
                        <div className="col-two">
                            {Object.entries(thisNote).length ? <PrintNote /> : <p>Select a note!</p>}
                        </div>
                    </div>
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    )
}

export default LoggedIn;
