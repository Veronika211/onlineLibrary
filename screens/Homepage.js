import React,{useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { ZANROVI } from '../data/dummy-data';
import GenreItem from '../components/GenreItem';
import { DrawerActions } from 'react-navigation-drawer';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import axios  from 'axios';

const Homepage = props => {
    const [genres,setGenres] = useState([]);
    axios.get('https://library-app-fe6ce-default-rtdb.europe-west1.firebasedatabase.app/zanrovi.json').then(
        response => {
            const loadedGenres = []
                for(const key in response.data){
                    loadedGenres.push({
                        id: response.data[key].id,
                        title: response.data[key].title
                    })
                }
                setGenres(loadedGenres);
        })
       

    const renderListItem = itemData => {
        return (
            <GenreItem title={itemData.item.title} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'Books',
                    //params su dodatni parametri i genreId nam omogucava da kada kliknemo na odredjeni zanr
                    //prosledi se njegov id i samim tim se ucitaju podaci vezani za njega
                    params: {
                        genreId: itemData.item.id
                    }
                })
            }} />
        )
    }
    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={genres}
            renderItem={renderListItem}
            numColumns={1} />
    )
};

Homepage.navigationOptions = (navigationData) => {
    return {
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'lora-bold'

    }
});
export default Homepage;