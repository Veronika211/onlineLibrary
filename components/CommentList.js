import React from 'react'
import {View,FlatList,StyleSheet } from 'react-native'
import CommentItem from './CommentItem'

const CommentList = props => {
    
const commentList = props.data.map((itemData) => {
    return(
    <CommentItem
    date={itemData.date}
    text = {itemData.text}
    user = {itemData.userId} 
    id = {itemData.id}
    key={itemData.id}
    mark = {itemData.mark}
    genreKey={props.genreKey}
    bookKey={props.bookKey}
    navigation={props.navigation}/>  
    )
})
    return(
        <View> 
        {commentList}
           {/* <FlatList data={props.data}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            style={{width:'100%'}}
           /> */}
        </View>
    )
}

const styles=StyleSheet.create({
  
})
export default CommentList;

