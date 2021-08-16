import Comment from "../../models/comment";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const LOAD_COMMENTS = "LOAD_COMMENTS"


export const loadComments = (bookId) => {
  return (dispatch,getState) => {
    const books = getState().books.bookData;
    const selectedBook = books.find(book => book.id == bookId);
    
    const comments = selectedBook.comments;
    console.log(comments)
    dispatch({ type: LOAD_COMMENTS, comments: comments});
  }
  };

export const deleteComment = (bookKey, genreKey, commentId) => {
  return async (dispatch,getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi/${genreKey}/books/${bookKey}/comments/${commentId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_COMMENT, commId: commentId });
  };
};

export const createComment = (bookId, bookKey, genreKey, text, mark) => {
  return async (dispatch, getState) => {
    const mail = getState().auth.email;
    const token = getState().auth.token;
    const date = new Date().toString();
    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi/${genreKey}/books/${bookKey}/comments.json?auth=${token}`,
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

    const resData = await response.json();
    const comment = new Comment(resData.name, mail, bookId, text, mark, date);
    dispatch({
      type: CREATE_COMMENT,
      comment: comment,
    });
  };
};


export const updateComment = (bookKey, genreKey, commentId, text, mark) => {

  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi/${genreKey}/books/${bookKey}/comments/${commentId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          mark
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    
    dispatch({
      type: UPDATE_COMMENT,
      commentId: commentId,
      comment: {
        text,
        mark
      }
    });
  };
};

