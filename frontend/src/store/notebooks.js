import { csrfFetch } from "./csrf";
import notesReducer from "./notes";

//types
const ADD_NOTEBOOK = "notebooks/ADD_NOTEBOOK";
const GET_NOTEBOOKS = "notebooks/GET_NOTEBOOKS";
const UPDATE_NOTEBOOK = "notebooks/UPDATE_NOTEBOOK";
const REMOVE_NOTEBOOK = "notebooks/REMOVE_NOTEBOOK";
const ADD_NOTE = "notebooks/ADD_NOTE";

//actions
const add = (notebook) => ({
    type: ADD_NOTEBOOK,
    notebook
});

const load = (notebooks) => ({
    type: GET_NOTEBOOKS,
    notebooks
});

const edit = (notebook) => ({
    type: UPDATE_NOTEBOOK,
    notebook
});

const remove = (notebook) => ({
    type: REMOVE_NOTEBOOK,
    notebook
});

export const addNote = (note) => ({
    type: ADD_NOTE,
    note
})

//thunk middleware
export const addOneNotebook = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/notebooks`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const notebook = await response.json();
    dispatch(add(notebook));
};

export const getAllNotebooks = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/notebooks/user/${userId}`,);
    if (response.ok) {
        const notebooks = await response.json();
        dispatch(load(notebooks));
    };
};

export const editNotebook = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/edit/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload)
    });
    const notebook = await response.json();
    dispatch(edit(notebook));
};

export const deleteNotebook = (id) => async dispatch => {
    const response = await csrfFetch(`/api/delete/${id}`, {
        method: 'DELETE',
    });
    const notebook = await response.json();
    dispatch(remove(notebook));
};

const initialState = {
}

const notebooksReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ADD_NOTEBOOK:
            return { ...state, [action.notebook.id]: action.notebook };
        case ADD_NOTE:
            newState = { ...state }
            newState[action.note.notebookId] = {...state[action.note.notebookId], notes: [...state[action.note.notebookId].notes, action.note]}
            return newState;
        case GET_NOTEBOOKS:
            action.notebooks.forEach(notebook => {
                newState[notebook.id] = notebook;
            });
            return newState;
        case UPDATE_NOTEBOOK:
            return { ...state, [action.notebook.id]: action.notebook };
        case REMOVE_NOTEBOOK:
            newState = { ...state };
            delete newState[action.notebook.id];
            return newState;
        default:
            return state;
    };
};

export default notebooksReducer;
