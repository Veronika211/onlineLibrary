import { CREATE_COMMENT, DELETE_COMMENT, LOAD_COMMENTS, UPDATE_COMMENT } from "../actions/comments";
import Comment from "../../models/comment"
const initialState = {
    comments: []
  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT:
        return {
          ...state,
          comments: state.comments.concat(action.comment)
        }
      case DELETE_COMMENT:
        const newComments = state.comments.filter(
            comment => comment.id !== action.commId
          )
          return {
            ...state,
              comments: newComments
          }
      case UPDATE_COMMENT:
        const commentIndex = state.comments.findIndex(
            comm => comm.id === action.commentId
          );
          const updatedComment = new Comment(
            action.commentId,
            state.comments[commentIndex].userId,
            state.comments[commentIndex].bookId,
            action.comment.text,
            action.comment.mark,
            state.comments[commentIndex].date
          );
          const updatedComments = [...state.comments];
          updatedComments[commentIndex] = updatedComment;
        return {
          ...state,
          comments: updatedComments
        };
        case LOAD_COMMENTS:
          return{
            ...state,
            comments: action.comments
          }
      default:
        return state;
    }
  };
  
  export default commentReducer;
  