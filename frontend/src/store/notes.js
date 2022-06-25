import { csrfFetch } from "./csrf";

//action types
const ADD_NOTE = 'notes/ADD_NOTE';
const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';

//actions
const add = (note) => ({
    type: ADD_NOTE,
    note
});

const load = (notes) => ({
    type: GET_ALL_NOTES,
    notes
});

const remove = (note) => ({
    type: REMOVE_NOTE,
    note
});

//thunks
export const createNote = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/notes`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    const note = await response.json();
    dispatch(add(note));
};

export const loadNotes = (notebookId) => async dispatch => {
    const response = await csrfFetch(`/api/notes/notebooks/${notebookId}`);
    if (response.ok) {
        const notes = await response.json();
        dispatch(load(notes))
    };
};

export const updateNote = (id, editedNote) => async dispatch => {
    const response = await csrfFetch(`/api/notes/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedNote)
    });
    const note = await response.json();
    dispatch(add(note));
};

export const deleteNote = (id) => async dispatch => {
    const response = await csrfFetch(`/api/notes/delete/${id}`, {
        method: "DELETE",
    })
    const note = await response.json();
    dispatch(remove(note));
}

//reducer
const initialState = {}

const notesReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ADD_NOTE:
            return { ...state, [action.note.id]: action.note };
        case GET_ALL_NOTES:
            action.notes.forEach(note => {
                newState[note.id] = note;
            });
            return newState;
        case REMOVE_NOTE:
            newState = { ...state };
            delete newState[action.note.id];
            return newState;
        default:
            return state;
    };
};

export default notesReducer;
