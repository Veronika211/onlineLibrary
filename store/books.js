import {KNJIGE} from '../data/dummy-data'
import { ADD_READING_LIST } from './actions';
import {REMOVE_READING_LIST} from './actions';

const initialState = {
    //postavljamo pocetno stanje na stanje ucitano iz baze
    books: KNJIGE,
    //postavljamo prazan niz jer jos nismo nista ubacili u listu citanja
    readingList: []
}

const booksReducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_READING_LIST:
            //proveravamo da li ima vec u nizu ove knjige
            if(state.readingList.length >0){
            const existingIndex = state.readingList.findIndex(book => book.id === action.bookId);
            if(existingIndex >= 0){
                const updatedList = [...state.readingList];
                updatedList.splice(existingIndex,1);
                return {
                    ...state,
                    readingList: updatedList
                }
            }
            else {
                const book = state.books.find(book => book.id === action.bookId)
                return {... state, readingList: state.readingList.concat(book)}
            }
         } else {
                const book = state.books.find(book => book.id === action.bookId)
                return {... state, readingList: state.readingList.concat(book)}
            }

            case REMOVE_READING_LIST:
                const deleteIndex = state.readingList.findIndex(book => book.id=== action.bookId);
                const updatedList = [...state.readingList];
                updatedList.splice(deleteIndex,1);
            return {
                ... state,
                readingList: updatedList
            }
            default:
            return state;
    }
    return state;
}

export default booksReducer;