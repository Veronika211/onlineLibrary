import React from 'react'
import {View,FlatList,Text } from 'react-native'
import CommentItem from './CommentItem'

const CommentList = props => {

    const renderListItem = itemData =>{
        console.log(itemData.item.text)
        return <CommentItem
         date={itemData.item.date}
         text = {itemData.item.text}
         user = {itemData.item.userId} 
         id = {itemData.item.id}
         mark = {itemData.item.mark}
         />
    }

    return(
        <View> 
           <FlatList data={props.data}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            style={{width:'100%'}}
           />
        </View>
    )
}

export default CommentList;