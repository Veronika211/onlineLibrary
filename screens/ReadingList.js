import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import BookItem from '../components/BookItem'
import {useSelector} from 'react-redux'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const ReadingList = props => {
    const readingListBooks = useSelector(state => state.books.readingList);  
    return readingListBooks.length > 0 ? 
    <BookItem data={readingListBooks} navigation={props.navigation}/> : 
    <View style={styles.noBooks}>
    <Text>Nema knjiga u listi citanja!</Text>
    </View>
};



ReadingList.navigationOptions = navigationData => {
    return {
        headerTitle: 'Lista čitanja',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu"
                iconName='ios-menu'
                onPress={() => {
                   navigationData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    noBooks:{
        flex:1,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default ReadingList;