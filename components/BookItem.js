import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import BookGenre from './BookGenre'

const BookItem = props => {
    
    const renderListItem = itemData =>{
        return <BookGenre
         title={itemData.item.title}
         author = {itemData.item.author}
         img= {itemData.item.img} 
         onSelect ={() => {
             props.navigation.navigate({routeName:'Info', params:{
                 bookId: itemData.item.id,
                 inList: props.inList
             }})
         }}/>
    }

    return(
        <View style={styles.screen}> 
           <FlatList data={props.data}
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

export default BookItem;