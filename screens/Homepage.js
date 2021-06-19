import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { ZANROVI } from '../data/dummy-data';
import ListaZanrova from '../components/ListaZanrova';
import { DrawerActions } from 'react-navigation-drawer';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const Homepage = props => {
    const renderListItem = itemData => {
        return (
            <ListaZanrova naziv={itemData.item.naziv} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'Knjige',
                    //params su dodatni parametri i zanrId nam omogucava da kada kliknemo na odredjeni zanr
                    //prosledi se njegov id i samim tim se ucitaju podaci vezani za njega
                    params: {
                        zanrId: itemData.item.id
                    }
                })
            }} />
        )
    }
    return (
        //data je niz koji zelimo da prikazemo,
        //renderItem omogucava da za svaku stavku prikazemo njene komponente kao naziv, sliku    
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={ZANROVI}
            renderItem={renderListItem}
            numColumns={1} />
    )
};

Homepage.navigationOptions = (navigationData) => {
    return {
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'lora-bold'

    }
});
export default Homepage;