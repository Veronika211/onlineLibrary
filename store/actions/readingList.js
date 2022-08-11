import { Alert } from "react-native";
export const ADD_BOOK = "ADD_BOOK";
export const LOAD_LIST = "LOAD_LIST";
export const REMOVE_BOOK = "REMOVE_BOOK";
export const LOAD_READ = "LOAD_READ";
export const ADD_TO_READ = "ADD_TO_READ";
export const ADD_GOAL = "ADD_GOAL";
export const LOAD_GOAL = "LOAD_GOAL";

export const loadList = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Došlo je do greške!");
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
       
          comments: resData[key].book.comments
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
        var book = books.find((book) => book.id === bookId);

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
          throw new Error("Došlo je do greške!");
        }
        // const resData = await response.json();
        // console.log(resData)
        Alert.alert("Uspešno ste dodali knjigu u listu čitanja");
        dispatch({
          type: ADD_BOOK,
          book: book,
        });
      }
    } else {
      var book = books.find((book) => book.id === bookId);

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
        throw new Error("Došlo je do greške!");
      }
    
      Alert.alert("Uspešno ste dodali knjigu u listu čitanja");
      dispatch({
        type: ADD_BOOK,
        book: book,
      });
    }
  };
};

export const deleteBook = (bookId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const list = getState().books.readingList;
    var bookKey = list.find((book) => book.id === bookId).key;

    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}/${bookKey}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    )

    if (!response.ok) {
      throw new Error("Došlo je do greške!");
    }
    const data = JSON.stringify(response)
  
    dispatch({ type: REMOVE_BOOK, bookId: bookId });
  };
};

export const loadReadList = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/listaProcitanih/${userId}.json`
      );

      if (!response.ok) {
        Alert.alert("Greška prilikom učitavanja liste!", [{ text: "Ok" }]);
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
         
          year: resData[key].book.year,
        });
      }
     
      // console.log(resData)
      dispatch({ type: LOAD_READ, readList: loadedList });
    } catch (err) {
      Alert.alert("Greška prilikom učitavanja liste!", [{ text: "Ok" }]);
      console.log(err);
    }
  };
};

export const addToReadList = (bookId) => {
  return async (dispatch, getState) => {
    const list = getState().books.readList;
    const books = getState().books.bookData;
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date().toLocaleDateString().substr(6);
    if (list.length > 0) {
      const existingIndex = list.findIndex((book) => book.id === bookId);
      if (existingIndex >= 0) {
        Alert.alert("Greska", "Ova knjiga se vec nalazi u listi.", [
          { text: "OK" },
        ]);
        return;
      } else {
        var book = books.find((book) => book.id === bookId);
        book.year = date;
        const response = await fetch(
          `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/listaProcitanih/${userId}.json?auth=${token}`,
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
          throw new Error("Došlo je do greške!");
        }

      
        const resData = await response.json();
        // console.log(resData)
        dispatch({
          type: ADD_TO_READ,
          book: book,
        });
      }
    } else {
      var book = books.find((book) => book.id === bookId);
      book.year = date;
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/listaProcitanih/${userId}.json?auth=${token}`,
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
        throw new Error("Došlo je do greške!");
      }

      const resData = await response.json();
    
      dispatch({
        type: ADD_TO_READ,
        book: book,
      });
    }
  };
};

export const addGoal = (goal) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date().toLocaleDateString().substr(6);
    const object = { goal, date };
   
    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/goal/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          object,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Došlo je do greške!");
    }
    const resData = await response.json();
    // console.log(resData)
    dispatch({
      type: ADD_GOAL,
      goal: object,
    });
  };
};

export const loadGoal = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/goal/${userId}.json`
    );

    const resData = await response.json();
    for (const key in resData) {
      var object = resData[key].object;
    }
    if (object === undefined) return;
    
   
    dispatch({
      type: LOAD_GOAL,
      goal: object,
    });
  };
};
