import { csrfFetch } from "./csrf";

//action types
const ADD_NOTE = 'notes/ADD_NOTE';
const GET_ALL_NOTES = 'notes/GET_ALL_NOTES';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

//actions
const addOne = (note) => ({
    type: ADD_NOTE,
    note
});
