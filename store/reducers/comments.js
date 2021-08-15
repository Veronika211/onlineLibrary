import { CREATE_COMMENT, DELETE_COMMENT, LOAD_COMMENTS, UPDATE_COMMENT } from "../actions/comments";

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
            comm => comm.id === action.commId
          );
          const updatedComments = [...state.comments];
          updatedComments[commentIndex] = action.comment;
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
  