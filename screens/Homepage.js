import React,{useEffect} from 'react';
import { StyleSheet,FlatList } from 'react-native';
import GenreItem from '../components/GenreItem';
import { DrawerActions } from 'react-navigation-drawer';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import { loadGenres } from '../store/actions/actions';
import { useSelector, useDispatch } from 'react-redux'

const Homepage = props => {
    const genres = useSelector(state => state.books.genres);
    const dispatch = useDispatch();
    
     useEffect(()=>{
        dispatch(loadGenres())        
     },[dispatch])
   
    const renderListItem = itemData => {
        return (
            <GenreItem title={itemData.item.title} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'Books',
                    //params su dodatni parametri i genreId nam omogucava da kada kliknemo na odredjeni zanr
                    //prosledi se njegov id i samim tim se ucitaju podaci vezani za njega
                    params: {
                        genreId: itemData.item.id,
                        genreTitle: itemData.item.title
                    }
                })
            }} />
        )
    }
    
    return (
        
        <FlatList
            keyExtractor={(item) => item.id.toString()}
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
        </HeaderButtons>,
        headerTitle: 'Početna'
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