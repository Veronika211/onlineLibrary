import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import KnjigaZanr from './KnjigaZanr'

const ListaKnjiga = props =>{
    const renderListItem = itemData =>{
        return <KnjigaZanr
         naslov={itemData.item.naslov}
         autor = {itemData.item.autor}
         slika= {itemData.item.slika} 
         onSelect ={() => {
             props.navigation.navigate({routeName:'Informacije', params:{
                 knjigaId: itemData.item.id,
                 inList: props.inList
             }})
         }}/>
    }

    return(
        <View style={styles.screen}> 
           <FlatList data={props.podaci}
            keyExtractor={(item,index) => item.id}
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

export default ListaKnjiga;