export const ADD_READING_LIST = 'ADD_READING_LIST';
export const REMOVE_READING_LIST = 'REMOVE_READING_LIST';
export const LOAD_BOOKS = 'LOAD_BOOKS';
export const LOAD_GENRES = 'LOAD_GENRES';

export const toggleReadingList = (id) => {
    return {
        type: ADD_READING_LIST,
        bookId: id
    }
} 

export const removeFromReadingList = (id) => {
    return {
        type: REMOVE_READING_LIST,
        bookId: id
    }
}


export const loadBooks = () => {
    return async dispatch => {
        const response = await fetch(
          'https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi.json'
        );
    
        const resData = await response.json();
        const loadedGenres = [];
    
        for (const key in resData) {
          loadedGenres.push({
              title: resData[key].title,
              id: resData[key].id,
              books: resData[key].books
          })
        }
        const books = [];
        for(const key in loadedGenres){
        books.push(loadedGenres[key].books);
        } 
       console.log(books.length)
    dispatch({
        type: LOAD_BOOKS,
        bookData: books
        })
    }
}
export const loadGenres = () => {
    return async dispatch => {
        const response = await fetch(
          'https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi.json'
        );
    
        const resData = await response.json();
        const loadedGenres = [];
    
        for (const key in resData) {
          loadedGenres.push({
              title: resData[key].title,
              id: resData[key].id,
              books: resData[key].books
          })
        }
       
    dispatch({
        type: LOAD_GENRES,
        genreData: loadedGenres
        })
    }
}