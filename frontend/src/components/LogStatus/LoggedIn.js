import LoggedInNav from "../Navigation/LoggedInNav";
import { Switch, Route } from 'react-router-dom';
import Sidebar from "../SideBar/Sidebar";
import NotebookForm from "../NotebookForm/NotebookForm";
import NoteForm from "../Note/NoteForm";
import NoteView from "../Note/NoteView";
import NotFoundPage from "../404Page/NotFoundPage";


function LoggedIn({ sessionUser }) {

    return (
        <>
            <LoggedInNav sessionUser={sessionUser} />
            <Switch>
                <Route exact path="/">
                    <Sidebar />
                    <NotebookForm />
                    <NoteForm />
                    <NoteView />
                </Route>
                <Route>
                    <NotFoundPage />
                </Route>
            </Switch>
        </>
    )
}

export default LoggedIn;
