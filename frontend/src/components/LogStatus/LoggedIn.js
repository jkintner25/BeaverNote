import LoggedInNav from "../Navigation/LoggedInNav";
import { Switch, Route } from 'react-router-dom';
import Sidebar from "../SideBar/Sidebar";
import NotFoundPage from "../404Page/NotFoundPage";
import QuillComponent from "../Quill/Quill";
import NotePanel from "../Note/NotePanel";


function LoggedIn({ sessionUser }) {

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
                            {/* <NoteView /> */}
                            {/* <QuillComponent /> */}
                            <NotePanel />
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
