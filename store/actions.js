export const ADD_READING_LIST = 'ADD_READING_LIST';
export const REMOVE_READING_LIST = 'REMOVE_READING_LIST';

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