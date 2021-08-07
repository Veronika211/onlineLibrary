import React,{useEffect} from 'react';
import BookItem from '../components/BookItem'
import {useDispatch} from 'react-redux'
import { loadBooks } from '../store/actions';
var title = ""; 

const BookList = props => {

const genres = useSelector( state => state.books.genres);
const genreId = props.navigation.getParam('genreId');
const selectedGenre = genres.filter(genre => genre.id == genreId);
       
    var bookData = [];
    for(const key in selectedGenre){
    bookData = selectedGenre[key].books;
    title = selectedGenre[key].title;
        }

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(loadBooks());
        },[dispatch])

    return (
        <BookItem data={bookData} navigation={props.navigation}/>
    )

};

//podesavamo da naslov bude izabrani zanr
BookList.navigationOptions = (navigationData) => {
    return {
        headerTitle: title
    }
}


export default BookList;