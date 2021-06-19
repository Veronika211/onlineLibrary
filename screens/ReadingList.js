import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import ListaKnjiga from '../components/ListaKnjiga'
import {useSelector} from 'react-redux'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const ReadingList = props => {
    const readingListBooks = useSelector(state => state.books.readingList);
    //const prikazKnjige = KNJIGE.filter(knjiga => knjiga.id === '1' || knjiga.id === '5');
    return <ListaKnjiga podaci={readingListBooks} navigation={props.navigation} inList = {true}/>
};



ReadingList.navigationOptions = navigationData => {
    return {
        headerTitle: 'Lista čitanja',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu"
                iconName='ios-menu'
                onPress={() => {
                   navigationData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ReadingList;