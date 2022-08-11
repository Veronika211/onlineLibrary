import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import BookList from "../components/BookList";
import { useSelector, useDispatch } from "react-redux";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import * as readingListActions from '../store/actions/readingList'
const ReadingList = (props) => {
  const readingListBooks = useSelector((state) => state.books.readingList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readingListActions.loadList());
  }, [dispatch]);

  return readingListBooks.length > 0 ? (
    <BookList data={readingListBooks} navigation={props.navigation} />
  ) : (
    <View style={styles.noBooks}>
      <Text style={{fontWeight:"bold",fontSize:18}}>Nema knjiga u listi čitanja!</Text>
      <Image source={require("../assets/images/noBooks.png")}
          style={styles.img}/>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Search");
        }}
      >
     
        <Text style={{margin:25,color:"#06005A"}}>Pretražite knjige!</Text>
      </TouchableOpacity>
    </View>
  );
};

ReadingList.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Lista čitanja",
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
  };
};

const styles = StyleSheet.create({
  noBooks: {
    flex: 1,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    alignSelf: "center",
    margin:20,
    height: 150,
    width: 140,
  },
});
export default ReadingList;
