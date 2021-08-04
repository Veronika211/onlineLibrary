import React,{useState} from 'react';
import BookItem from '../components/BookItem'
import axios  from 'axios';

var title = ""; 

const BookList = props => {
//ucitavamo zanrove iz baze
const genreId = props.navigation.getParam('genreId');
const [genres,setGenres] = useState([]);
    axios.get('https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi.json').then(
        response => {
            const loadedGenres = []
                for(const key in response.data){
                    loadedGenres.push({
                        id: response.data[key].id,
                        title: response.data[key].title,
                        books: response.data[key].books
                    })
                }
                setGenres(loadedGenres);
        })
        
        const selectedGenre = genres.filter(genre => genre.id == genreId);
       
        var bookData = [];
        for(const key in selectedGenre){
            bookData = selectedGenre[key].books;
            title = selectedGenre[key].title;
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