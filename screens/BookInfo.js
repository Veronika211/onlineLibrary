import { useEffect, useCallback } from 'react';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {removeFromReadingList, toggleReadingList} from '../store/actions';

const BookInfo = props => {
    //set params koristimo da komuniciramo izmedju komponenti i navigationOptionsa

    const availableBooks = useSelector(state => state.books.books);
    const knjigaId = props.navigation.getParam('knjigaId');
    const selectedBook = availableBooks.find(knjiga => knjiga.id === knjigaId);
    const uListi = props.navigation.getParam('inList')
    //preko ovog paramsa saljemo podatke u header navigation
    useEffect(() => {
        props.navigation.setParams({ bookTitle: selectedBook.naslov})
    
    }, [selectedBook])

    const dispatch = useDispatch();

    const addToReadingList = useCallback(() =>{
        dispatch(toggleReadingList(knjigaId))
    },[dispatch,knjigaId])
   
    const deleteFromReadingList = useCallback(()=>{
        dispatch(removeFromReadingList(knjigaId))
    },[dispatch,knjigaId])

    return (
        <ScrollView>
            <Image source={{ uri: selectedBook.slika }} style={styles.img} />
            <View style={styles.screen}>
                <Text style={styles.naslov}>{selectedBook.naslov}</Text>
                <Text style={styles.autor}>{selectedBook.autor}</Text>
                <Text style={styles.cena}>{selectedBook.cena} din.</Text>
                {uListi&& 
             <TouchableOpacity onPress={() => {deleteFromReadingList()}}>
            <Ionicons name="trash-outline" size={30} color="black" style={styles.ikonica} />
            <Text>Obrišite iz liste čitanja</Text>
            </TouchableOpacity>}
            {!uListi &&
                <TouchableOpacity onPress={() => {addToReadingList()}}>
                    <Ionicons name="add-circle-outline" size={30} color="black" style={styles.ikonica} />
                    <Text>Dodajte u listu čitanja</Text>
                </TouchableOpacity>}
            </View>
            <View>
                <Text>Opis:{selectedBook.opis}</Text>
            </View>
        </ScrollView>
    )
};

BookInfo.navigationOptions = (navigationData) => {
    //const knjigaId = navigationData.navigation.getParam('knjigaId');
    //const selectedKnjiga = KNJIGE.find(knjiga => knjiga.id === knjigaId);
    const bookTitle = navigationData.navigation.getParam('bookTitle');
   // const addToList = navigationData.navigation.getParam('addToList')
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
    }
});
export default BookInfo;