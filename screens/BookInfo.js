import {useEffect, useCallback } from 'react';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {removeFromReadingList, toggleReadingList} from '../store/actions/actions';

const BookInfo = props => {
    const bookData = useSelector(state => state.books.bookData);
    const bookId = props.navigation.getParam('bookId');
    const dispatch = useDispatch();

    for(let i=0;i<bookData.length;i++){
        var match = bookData[i].find(book => book.id === bookId)
        if(match) {
            break;
        }
    }
    const selectedBook = match;

    useEffect(() => { 
    props.navigation.setParams({ bookTitle: selectedBook.title})
    },[selectedBook])
   
   const inList = props.navigation.getParam('inList')

    const addToReadingList = useCallback(() =>{
        dispatch(toggleReadingList(bookId))
    },[dispatch,bookId])
   
    const deleteFromReadingList = useCallback(()=>{
        dispatch(removeFromReadingList(bookId))
    },[dispatch,bookId])

    return (
          <ScrollView> 
            <Image source={{ uri: selectedBook.img }} style={styles.img} />
            <View style={styles.screen}>
                 <Text style={styles.naslov}>{selectedBook.title}</Text>
                 <Text style={styles.autor}>{selectedBook.author}</Text>
                 <Text style={styles.cena}>{selectedBook.price} din.</Text>
                 {inList&&  
             <TouchableOpacity  onPress={() => {deleteFromReadingList()}}>
            <Ionicons name="trash-outline" size={30} color="black" style={styles.ikonica} />
            <Text>Obrišite iz liste čitanja</Text>
            </TouchableOpacity>}
            {!inList &&
                <TouchableOpacity onPress={() => {addToReadingList()}}>
                    <Ionicons name="add-circle-outline" size={30} color="black" style={styles.ikonica} />
                    <Text>Dodajte u listu čitanja</Text>
                </TouchableOpacity>}
            </View>
            <View>
                <Text style={styles.description}>Opis:{selectedBook.description}</Text>
            </View> 
            </ScrollView>       
    )
};

BookInfo.navigationOptions = (navigationData) => {
    const bookTitle = navigationData.navigation.getParam('bookTitle');
    return {
        headerTitle: bookTitle
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    naslov: {
        margin: 20,
        fontSize: 20,
        fontFamily: 'lora-bold'
    },
    ikonica: {
        marginHorizontal: 50,
        marginVertical: 5
    },
    img: {
        width: '100%',
        height: 350
    },
    description: {
        margin: 15
    }
});
export default BookInfo;