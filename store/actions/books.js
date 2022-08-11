import Book from "../../models/book";
import Comment from "../../models/comment";
export const LOAD_BOOKS = "LOAD_BOOKS";
export const LOAD_GENRES = "LOAD_GENRES";
export const FILTER_BOOKS = "FILTER_BOOKS";
export const RELOAD_FILTER = "RELOAD_FILTER";
export const RESET = "RESET";

export const loadBooks = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi.json"
    );

    const resData = await response.json();
    const loadedGenres = [];

    for (const key in resData) {
      loadedGenres.push({
        key: key,
        title: resData[key].title,
        id: resData[key].id,
        books: resData[key].books,
      });
    }
    const books = [];

    for (const key in loadedGenres) {
      for (const key2 in loadedGenres[key].books) {
        const comments = [];
        if (loadedGenres[key].books[key2].comments) {
          for (const key3 in loadedGenres[key].books[key2].comments) {
            comments.push(
              new Comment(
                key3,
                loadedGenres[key].books[key2].comments[key3].mail,
                loadedGenres[key].books[key2].comments[key3].bookId,
                loadedGenres[key].books[key2].comments[key3].text,
                loadedGenres[key].books[key2].comments[key3].mark,
                loadedGenres[key].books[key2].comments[key3].date
              )
            );
          }
        }
        books.push(
          new Book(
            key2,
            loadedGenres[key].books[key2].id,
            loadedGenres[key].books[key2].title,
            loadedGenres[key].books[key2].img,
            loadedGenres[key].books[key2].author,
            loadedGenres[key].books[key2].description,
            comments
          )
        );
      }
    }

    dispatch({
      type: LOAD_BOOKS,
      bookData: books,
    });
  };
};
export const loadGenres = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi.json"
    );

    const resData = await response.json();
    const loadedGenres = [];

    for (const key in resData) {
      loadedGenres.push({
        key: key,
        title: resData[key].title,
        id: resData[key].id,
        books: resData[key].books,
      });
    }
  
    dispatch({
      type: LOAD_GENRES,
      genreData: loadedGenres,
    });
  };
};

export const filterBooks = (text) => {
  return (dispatch, getState) => {
    const books = getState().books.bookData;
    const filteredBooks = books.filter((book) => {
      const title = book.title.toUpperCase();
      const searchText = text.toUpperCase();
      return title.indexOf(searchText) > -1;
    });

    dispatch({
      type: FILTER_BOOKS,
      books: filteredBooks,
    });
  };
};

export const reload = () => {
  return {
    type: RELOAD_FILTER,
  };
};

export const reset = () => {
  return {
    type: RESET
  }
}
