import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CommentItem from "./CommentItem";

const CommentList = (props) => {
  const commentList = props.data.map((itemData) => {
    return (
      <CommentItem
        date={itemData.date}
        text={itemData.text}
        user={itemData.userId}
        id={itemData.id}
        key={itemData.id}
        mark={itemData.mark}
        genreKey={props.genreKey}
        bookKey={props.bookKey}
        navigation={props.navigation}
      />
    );
  });
  return <View>{commentList}</View>;
};

const styles = StyleSheet.create({});
export default CommentList;
