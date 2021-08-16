import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import BookGenre from './BookGenre'
import { useDispatch, useSelector } from 'react-redux'
import * as commentsActions from "../store/actions/comments";

const BookItem = props => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.books.genres);

    const renderListItem = itemData =>{
        for(const key in genres){
            if(genres[key].books.find(book => book.id === itemData.item.id)){
            var loadedGenreKey = genres[key].key;
            break;
            }
        }
        const genreKey = props.genreKey ? props.genreKey : loadedGenreKey
        return <BookGenre
         title={itemData.item.title}
         author = {itemData.item.author}
         img= {itemData.item.img} 
         id = {itemData.item.id}
         onSelect ={() => {
             dispatch(commentsActions.loadComments(itemData.item.id));
             props.navigation.navigate({routeName:'Info', params:{
                 bookId: itemData.item.id,
                 inList: props.inList,
                 genreKey: genreKey
             }})
         }}/>
    }

    return(
        <View style={styles.screen}> 
           <FlatList data={props.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderListItem}
            style={{width:'100%'}}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BookItem;