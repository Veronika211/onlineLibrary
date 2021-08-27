import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import BookItem
 from '../components/BookItem'
 import { Item, HeaderButtons } from 'react-navigation-header-buttons';
 import HeaderButton from '../components/UI/HeaderButton';
const ReadBooksScreen = (props) =>{
    const readList = useSelector((state)=>state.books.readList);

    return readList.length > 0 ? 
    <BookItem data={readList} navigation={props.navigation}/> : 
    <View style={styles.noBooks}>
    <Text>Nema knjiga u listi procitanih!</Text>
    </View>
}

ReadBooksScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Lista pročitanih knjiga',
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
}
})
export default ReadBooksScreen;