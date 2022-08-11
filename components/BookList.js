import React,{useEffect} from "react";
import { View, FlatList, StyleSheet } from "react-native";
import BookItem from "./BookItem";
import { useDispatch, useSelector } from "react-redux";
import * as commentsActions from "../store/actions/comments";

const BookList = (props) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.books.genres);
  
  useEffect(()=>{
    dispatch(commentsActions.loadComments());
  },[])
  const renderListItem = (itemData) => {
    for (const key in genres) {
      if (genres[key].books.find((book) => book.id === itemData.item.id)) {
        var loadedGenreKey = genres[key].key;
        break;
      }
    }
  
    const genreKey = props.genreKey ? props.genreKey : loadedGenreKey;
    return (
      <BookItem
        title={itemData.item.title}
        author={itemData.item.author}
        img={itemData.item.img}
        id={itemData.item.id}
        year={itemData.item.year}
        comments={itemData.item.comments ? itemData.item.comments : []}
          onSelect={() => {
          if (props.resetInput) props.resetInput();
          props.navigation.navigate({
            routeName: "Info",
            params: {
              bookId: itemData.item.id,
              bookTitle: itemData.item.title,
              inList: props.inList,
              genreKey: genreKey,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderListItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookList;
