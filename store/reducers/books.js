import {
  LOAD_BOOKS,
  LOAD_GENRES,
  FILTER_BOOKS,
  RELOAD_FILTER,
} from "../actions/books";
import {
  LOAD_LIST,
  ADD_BOOK,
  REMOVE_BOOK,
  ADD_TO_READ,
  LOAD_READ,
  ADD_GOAL,
  LOAD_GOAL,
} from "../actions/readingList";

const initialState = {
  bookData: [],
  readingList: [],
  genres: [],
  filteredBooks: [],
  readList: [],
  goal: {},
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
        filteredBooks: action.books,
      };
    case RELOAD_FILTER:
      return {
        ...state,
        filteredBooks: state.bookData,
      };
    case ADD_TO_READ:
      return {
        ...state,
        readList: state.readList.concat(action.book),
      };
    case LOAD_READ:
      return {
        ...state,
        readList: action.readList,
      };
    case ADD_GOAL:
      return {
        ...state,
        goal: action.goal,
      };
    case LOAD_GOAL:
      return {
        ...state,
        goal: action.goal,
      };
    default:
      return state;
  }
};

export default booksReducer;
