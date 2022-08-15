import React, { useCallback } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as commentsActions from "../store/actions/comments";

const CommentItem = (props) => {
  const auth = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const deleteCommentHandler = useCallback(() => {
    dispatch(
      commentsActions.deleteComment(props.bookKey, props.genreKey, props.id)
    );
    Alert.alert("Uspešno ste obrisali komentar.", "", [{ text: "Ok" }]);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.firstChild}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
          <Text style={{ marginLeft: 5 }}>{props.user}</Text>
        </View>
        <Text style={{ marginTop: 8 }}>{props.date}</Text>
      </View>
      <Text style={{ marginTop: 10 }}>Ocena:{" " + props.mark}</Text>
      <Text style={styles.comText}>{props.text}</Text>
      {props.image && (
        <Image
          style={{ height: 200, width: 200 }}
          source={{ uri: props.image }}
        />
      )}
      {user === props.user && (
        <View style={styles.secondRow}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Comment", {
                bookKey: props.bookKey,
                genreKey: props.genreKey,
                commentId: props.id,
              });
            }}
            style={{ marginRight: 10 }}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteCommentHandler();
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    margin: 15,
  },
  firstRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  firstChild: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  comText: {
    fontSize: 15,
    marginTop: 5,
  },
});

export default CommentItem;
