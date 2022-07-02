import { csrfFetch } from "./csrf";

//action types
const ADD_NOTE = 'notes/ADD_NOTE';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';
const CLEAR_NOTE_STATE = 'notes/CLEAR_NOTE_STATE'

//actions
export const addNote = (note) => ({
    type: ADD_NOTE,
    note
});

export const removeThisNote = (note) => ({
    type: REMOVE_NOTE,
    note
});

export const clearNoteState = () => ({
    type: CLEAR_NOTE_STATE,

});

//thunks
export const createNote = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/notes`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });
    if(response.ok){
        const note = await response.json();
        dispatch(addNote(note));
        return note;
    }
};

export const updateNote = (id, editedNote) => async dispatch => {
    const response = await csrfFetch(`/api/notes/edit/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editedNote)
    });
    const note = await response.json();
    dispatch(addNote(note));
};

export const deleteNote = (id) => async dispatch => {
    const response = await csrfFetch(`/api/notes/delete/${id}`, {
        method: "DELETE",
    })
    const note = await response.json();
    dispatch(removeThisNote(note));
}

//reducer
const initialState = {}

const notesReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ADD_NOTE:
            return newState[action.note.id] = action.note;
        case REMOVE_NOTE:
            newState = { [action.note.id]: action.note};
            delete newState[action.note.id];
            return newState;
        case CLEAR_NOTE_STATE:
            return newState;
        default:
            return state;
    };
};

export default notesReducer;
