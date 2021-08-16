import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as commentsActions from "../store/actions/comments";

const CommentItem = (props) => {
  const auth = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  console.log(props.bookKey + props.genreKey + props.id);
  const deleteCommentHandler = useCallback(() => {
    dispatch(
      commentsActions.deleteComment(props.bookKey, props.genreKey, props.id)
    );
  }, [dispatch]);

  return (
    <View>
      <Text>{props.date}</Text>
      <Text>{props.user}</Text>
      <Text>{props.text}</Text>
      <Text>{props.mark}</Text>
      {auth && user === props.user && (
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Comment", {
                bookKey: props.bookKey,
                genreKey: props.genreKey,
                commentId: props.id,
              });
            }}
          >
            <AntDesign name="edit" size={24} color="black" />
            <Text>Izmenite komentar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteCommentHandler();
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
            <Text>Obrisite komentar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CommentItem;
