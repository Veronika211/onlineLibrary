import { useEffect, useCallback } from "react";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
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
  //proveravamo da li ima knjige u listi citanja
  const readingList = useSelector((state) => state.books.readingList);
  const inList = readingList.find((book) => book.id === bookId);
  var selectedBook = bookData.find((book) => book.id === bookId);

  const averageMark = () => {
    var sum = 0;
    for (let i = 0; i < comments.length; i++) {
      sum += parseInt(comments[i].mark);
    }
    if (sum != 0) {
      return (sum / comments.length).toFixed(2);
    }
    return 0;
  };

  const starsMark = () => {
    let stars = [];
    for (var i = 1; i <= 5; i++) {
      let path = <AntDesign name="star" size={17} color="gold" key={i} />;
      if (i > averageMark()) {
        path = <AntDesign name="staro" size={17} color="gold" key={i} />;
      }
      stars.push(path);
    }
    return stars;
  };

  const bookKey = selectedBook.key;

  useEffect(() => {
    props.navigation.setParams({ bookTitle: selectedBook.title });
  }, [selectedBook]);

  const addToReadList = useCallback(async () => {
    await dispatch(readingListActions.addToReadList(bookId));
    dispatch(readingListActions.deleteBook(bookId));
  }, [dispatch, bookId]);

  const addToReadingList = useCallback(() => {
    dispatch(readingListActions.addBook(bookId));
  }, [dispatch, bookId]);

  const deleteFromReadingList = useCallback(() => {
    dispatch(readingListActions.deleteBook(bookId));
    Alert.alert("Uspešno ste obrisali knjigu iz liste čitanja!");
    props.navigation.navigate("ReadingList");
  }, [dispatch, bookId]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedBook.img }} style={styles.img} />
      <View style={styles.titleCont}>
        <Text style={styles.title}>{selectedBook.title}</Text>
        <Text style={styles.author}>{selectedBook.author}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          {/* <Text style={styles.price}>{selectedBook.price} RSD</Text> */}
          <Text style={styles.avgMark}>Prosecna ocena: {starsMark()}</Text>
        </View>
        <View style={styles.rowChild}>
          {inList && (
            <View>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  deleteFromReadingList();
                }}
              >
                <Ionicons name="trash-outline" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  addToReadList();
                }}
              >
                <MaterialIcons
                  name="playlist-add-check"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
          {!inList && (
            <View>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  addToReadingList();
                }}
              >
                <MaterialIcons name="post-add" size={30} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View>
        <Text style={styles.titleDes}>Opis knjige</Text>
        <Text style={styles.description}>{selectedBook.description}</Text>
      </View>

      {comments && (
        <CommentList
          data={comments}
          navigation={props.navigation}
          genreKey={genreKey}
          bookKey={bookKey}
        />
      )}
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.addBar}
          onPress={() => {
            props.navigation.navigate("Comment", {
              bookId: bookId,
              bookKey: bookKey,
              genreKey: genreKey,
            });
          }}
        >
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={23}
            color="grey"
          />

          <Text style={styles.addTxt}>Ostavite komentar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

BookInfo.navigationOptions = (navigationData) => {
  const bookTitle = navigationData.navigation.getParam("bookTitle");
  return {
    headerTitle: bookTitle,
  };
};

const styles = StyleSheet.create({
  titleCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    margin: 17,
    fontSize: 20,
    fontFamily: "lora-bold",
  },
  author: {
    marginHorizontal: 50,
    fontSize: 17,
  },
  img: {
    width: "100%",
    height: 250,
  },
  price: {
    fontSize: 16,
    marginTop: 9,
  },
  avgMark: {
    fontSize: 14,
    marginVertical: 5,
  },
  description: {
    marginHorizontal: 15,
    marginVertical: 17,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addBar: {
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 0.9,
    borderRadius: 30,
    borderColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    height: 48,
    width: 320,
  },
  addTxt: {
    color: "grey",
    marginTop: 2,
    marginLeft: 13,
  },
  icon: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "black",
    padding: 6,
    backgroundColor: "white",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  rowChild: {
    flexDirection: "row",
  },
  titleDes: {
    marginHorizontal: 15,
    fontSize: 15,
    fontWeight: "500",
  },
});
export default BookInfo;
