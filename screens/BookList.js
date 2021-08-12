import React,{useEffect} from 'react';
import BookItem from '../components/BookItem'
import {useSelector} from 'react-redux'

var title = ""; 

const BookList = props => {

const genres = useSelector( state => state.books.genres);
const genreId = props.navigation.getParam('genreId');
const selectedGenre = genres.filter(genre => genre.id == genreId);
var title = props.navigation.getParam('genreTitle');
    var bookData = [];
    for(const key in selectedGenre){
    bookData = selectedGenre[key].books;
        }

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