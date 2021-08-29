import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BookList from "../components/BookList";
import { useSelector, useDispatch } from "react-redux";
import * as booksActions from "../store/actions/books";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const AllBooks = (props) => {
  const filteredBookData = useSelector((state) => state.books.filteredBooks);
  const dispatch = useDispatch();

  const searchHandler = (text) => {
    dispatch(booksActions.filterBooks(text));
    setValue(text);
  };
  const [value, setValue] = useState("");

  const resetInput = () => {
    setValue("");
    dispatch(booksActions.reload());
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <AntDesign
          name="search1"
          size={24}
          color="grey"
          size={17}
          style={styles.icon}
        />
        <TextInput
          value={value}
          placeholder="Pretražite naslove..."
          onChangeText={(value) => searchHandler(value)}
          style={styles.search}
        />
      </View>
      {filteredBookData.length > 0 ? (
        <BookList
          data={filteredBookData}
          navigation={props.navigation}
          resetInput={resetInput}
        />
      ) : (
        <Text style={styles.noBooks}>{"Nema knjiga sa takvim naslovom."}</Text>
      )}
    </View>
  );
};

AllBooks.navigationOptions = (navigationData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerTitle: "Spisak dostupnih knjiga",
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "lora-bold",
  },
  searchBar: {
    flexDirection: "row",
    marginLeft: 50,
    marginTop: 10,
    borderWidth: 0.9,
    borderRadius: 30,
    borderColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 320,
  },
  icon: {},
  search: {
    paddingLeft: 20,
    alignItems: "center",
  },
  noBooks: {
    flex: 1,
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
});
export default AllBooks;
