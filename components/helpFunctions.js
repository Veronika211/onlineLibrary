import { useSelector } from "react-redux";

export const addCommentReadL = (bookId, bookKey, genreKey, text, mark) => {
    return async () => {
      const mail = useSelector(state => state.auth.email);
      const token = useSelector(state => state.auth.token);
      const date = new Date().toLocaleDateString();
      const book = useSelector(state => state.books.readList).find(book => book.id === bookId)
      const bookID = book.key;
      const userId = useSelector(state => state.auth.userId);
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/listaProcitanih/${userId}/${bookID}/boook/comments.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId,
            mail,
            text,
            mark,
            date,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Došlo je do greške!");
      }
    };
  };
  
  export const addCommentReadingL = (bookId, bookKey, genreKey, text, mark) => {
    return async () => {
        const mail = useSelector(state => state.auth.email);
        const token = useSelector(state => state.auth.token);
        const date = new Date().toLocaleDateString();
        const book = useSelector(state => state.books.readingList).find(book => book.id === bookId)
        const bookID = book.key;
        const userId = useSelector(state => state.auth.userId);
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}/${bookID}/boook/comments.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId,
            mail,
            text,
            mark,
            date,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Došlo je do greške!");
      }
    };
  };
  
  export const updateCommentReadL = (bookKey, genreKey, commentId, text, mark) => {
    return async () => {
      const token = useSelector((state)=> state.auth.token);
      const userId = useSelector((state)=> state.auth.userId);
      const book = useSelector(state => state.books.readList).find(book => book.id === bookId)
      const bookID = book.key;
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/lista/${userId}/${bookID}/boook/comments/${commentId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            mark,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Došlo je do greške!");
      }
  
    };
  };
  
  export const updateCommentReadingL = (bookKey, genreKey, commentId, text, mark) => {
    return async () => {
        const token = useSelector((state)=> state.auth.token);
      const userId = useSelector((state)=> state.auth.userId);
      const book = useSelector(state => state.books.readingList).find(book => book.id === bookId)
      const bookID = book.key;
      const response = await fetch(
        `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/listaProcitanih/${userId}/${bookID}/boook/comments/${commentId}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            mark,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Došlo je do greške!");
      }
    };
  };