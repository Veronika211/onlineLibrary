import { LOAD_BOOKS, LOAD_GENRES, FILTER_BOOKS, RELOAD_FILTER } from "../actions/books";
import { Alert } from "react-native";
import { LOAD_LIST, ADD_BOOK, REMOVE_BOOK } from "../actions/readingList";

const initialState = {
  //postavljamo pocetno stanje na stanje ucitano iz baze
  bookData: [],
  //postavljamo prazan niz jer jos nismo nista ubacili u listu citanja
  readingList: [],
  genres: [],
  filteredBooks: []
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, readingList: state.readingList.concat(action.book) };
    case REMOVE_BOOK:
      const deleteIndex = state.readingList.findIndex(
        (book) => book.id === action.bookId
      );
      const updatedList = [...state.readingList];
      updatedList.splice(deleteIndex, 1);
      return {
        ...state,
        readingList: updatedList,
      };
    case LOAD_LIST:
      return {
        ...state,
        readingList: action.readingList,
      };
    case LOAD_BOOKS:
      return {
        ...state,
        filteredBooks: action.bookData,
        bookData: action.bookData,
      };
    case LOAD_GENRES:
      return {
        ...state,
        genres: action.genreData,
      };
      case FILTER_BOOKS:
        return {
          ...state,
          filteredBooks: action.books
        }
        case RELOAD_FILTER:
          return{
            ...state,
            filteredBooks: state.bookData
          }
    default:
      return state;
  }
 
};

export default booksReducer;
