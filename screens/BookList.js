import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import {ZANROVI, KNJIGE} from '../data/dummy-data'
import ListaKnjiga from '../components/ListaKnjiga'

const BookList = props => {
    //omogucava nam da prikazemo podatke o svakoj knjizi u listi
    const zanrId = props.navigation.getParam('zanrId');
    const selectedZanr = ZANROVI.find(zanr => zanr.id === zanrId);
    const prikazaneKnjige = KNJIGE.filter(knjiga => knjiga.zanroviId.indexOf(zanrId) >= 0 )
    return(
        <ListaKnjiga podaci={prikazaneKnjige} navigation={props.navigation}/>
    )
};

BookList.navigationOptions = (navigationData) => {
    const zanrId = navigationData.navigation.getParam('zanrId');
    const selectedZanr = ZANROVI.find(zanr => zanr.id === zanrId);
    return {
        headerTitle: selectedZanr.naziv,
        
    }
}


export default BookList;