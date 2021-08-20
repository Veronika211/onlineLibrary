import React from 'react'
import {View,FlatList,StyleSheet } from 'react-native'
import CommentItem from './CommentItem'

const CommentList = props => {

    // const renderListItem = itemData =>{
    //     return <CommentItem
    //      date={itemData.item.date}
    //      text = {itemData.item.text}
    //      user = {itemData.item.userId} 
    //      id = {itemData.item.id}
    //      mark = {itemData.item.mark}
    //      genreKey={props.genreKey}
    //      bookKey={props.bookKey}
    //      navigation={props.navigation}
    //      />
    // }


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
        <View style={styles.container}> 
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
    // container:{
    //     flex:1,
    //     alignItems:'center',
    //     justifyContent:'center'
    // }
})
export default CommentList;

// comments.map( itemData =>(
//     <CommentItem
//     date={itemData.date}
// text = {itemData.text}
// user = {itemData.userId} 
// id = {itemData.id}
// key={itemData.id}
// mark = {itemData.mark}
// genreKey={props.genreKey}
// bookKey={props.bookKey}
// navigation={props.navigation}/>
//   ))