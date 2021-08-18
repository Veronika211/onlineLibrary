import { useEffect, useCallback } from "react";
import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as readingListActions from "../store/actions/readingList";
import CommentList from "../components/CommentList";

const BookInfo = (props) => {
  const bookData = useSelector((state) => state.books.bookData);
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  const bookId = props.navigation.getParam("bookId");
  const genreKey = props.navigation.getParam("genreKey");
  

  var selectedBook = bookData.find((book) => book.id === bookId);
  const bookKey = selectedBook.key;

  useEffect(() => {
    props.navigation.setParams({ bookTitle: selectedBook.title });
  }, [selectedBook]);

  const inList = props.navigation.getParam("inList");

  const addToReadingList = useCallback(() => {
    dispatch(readingListActions.addBook(bookId));
  }, [dispatch, bookId]);

  const deleteFromReadingList = useCallback(() => {
    dispatch(readingListActions.deleteBook(bookId));
    props.navigation.navigate("ReadingList");
  }, [dispatch, bookId]);

  const flatListArray = [];
  return (
    <FlatList data ={flatListArray}
    ListFooterComponent= {<View>{comments ? 
        <CommentList data={comments} navigation={props.navigation}
         genreKey={genreKey}
         bookKey={bookKey}
         /> : <Text>Nema komentara.</Text>}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Comment", {
              bookId: bookId,
              bookKey: bookKey,
              genreKey: genreKey,
            });
          }}
        >
          <Ionicons name="chatbox-ellipses-outline" size={35} />
          <Text>Dodajte komentar</Text>
        </TouchableOpacity>
        </View>
    }
    ListHeaderComponent={ <View>

        <Image source={{ uri: selectedBook.img }} style={styles.img} />
        <View style={styles.screen}>
          <Text style={styles.naslov}>{selectedBook.title}</Text>
          <Text style={styles.autor}>{selectedBook.author}</Text>
          <Text style={styles.cena}>{selectedBook.price} din.</Text>
          {inList && (
            <TouchableOpacity
              onPress={() => {
                deleteFromReadingList();
              }}
            >
              <Ionicons
                name="trash-outline"
                size={30}
                color="black"
                style={styles.ikonica}
              />
              <Text>Obrišite iz liste čitanja</Text>
            </TouchableOpacity>
          )}
          {!inList && (
            <TouchableOpacity
              onPress={() => {
                addToReadingList();
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={30}
                color="black"
                style={styles.ikonica}
              />
              <Text>Dodajte u listu čitanja</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <Text style={styles.description}>Opis:{selectedBook.description}</Text>
        </View>
        </View>}
    />
  );
};

BookInfo.navigationOptions = (navigationData) => {
  const bookTitle = navigationData.navigation.getParam("bookTitle");
  return {
    headerTitle: bookTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  naslov: {
    margin: 20,
    fontSize: 20,
    fontFamily: "lora-bold",
  },
  ikonica: {
    marginHorizontal: 50,
    marginVertical: 5,
  },
  img: {
    width: "100%",
    height: 250,
  },
  description: {
    margin: 15,
  },
});
export default BookInfo;
