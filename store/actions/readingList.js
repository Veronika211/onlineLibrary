import { Alert } from "react-native";
export const ADD_BOOK = "ADD_BOOK";
export const LOAD_LIST = "LOAD_LIST";
export const REMOVE_BOOK = "REMOVE_BOOK";

export const fetchList = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedList = [];

      for (const key in resData) {
        loadedList.push({
          key: key,
          id: resData[key].book.id,
          title: resData[key].book.title,
          author: resData[key].book.author,
          description: resData[key].book.description,
          img: resData[key].book.img,
          price: resData[key].book.price,
        });
      }
      
      dispatch({ type: LOAD_LIST, readingList: loadedList });
    } catch (err) {
      throw err;
    }
  };
};

export const addBook = (bookId) => {
  return async (dispatch, getState) => {
    const list = getState().books.readingList;
    const books = getState().books.bookData;
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    if (list.length > 0) {
      const existingIndex = list.findIndex((book) => book.id === bookId);
      if (existingIndex >= 0) {
        Alert.alert("Greska", "Ova knjiga se vec nalazi u listi citanja", [
          { text: "OK" },
        ]);
        return;
      } else {
        for (let i = 0; i < books.length; i++) {
          var book = books[i].find((book) => book.id === bookId);
          if(book){
            break;
          }
        }
        const response = await fetch(
          `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}.json?auth=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              book,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const resData = await response.json();
        Alert.alert("Uspesno ste dodali knjigu u listu citanja")
        dispatch({
          type: ADD_BOOK,
          book: book
        });
      }
    } else {
      for (let i = 0; i < books.length; i++) {
        var match = books[i].find((book) => book.id === bookId);
        if (match) break;
      }
      const book = match;
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      Alert.alert("Uspesno ste dodali knjigu u listu citanja")
      dispatch({
        type: ADD_BOOK,
        book: book
      });
    }
  };
};

export const deleteBook =( bookId )=> {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const list = getState().books.readingList;
      var bookKey = list.find((book) => book.id === bookId).key;
        console.log(bookKey);
      
  
    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}/${bookKey}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    Alert.alert("Uspesno ste obrisali knjigu iz liste citanja!")
    dispatch({ type: REMOVE_BOOK, bookId: bookId});
  };
};
