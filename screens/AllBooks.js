import React, { useEffect, useState } from "react";
import { SafeAreaView,View, Text,TextInput, StyleSheet } from "react-native";
import BookItem from "../components/BookItem";
import { useSelector, useDispatch } from "react-redux";
import * as booksActions from '../store/actions/books'
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';

const AllBooks = (props) => {
  const filteredBookData = useSelector((state) => state.books.filteredBooks);
  const dispatch = useDispatch();
  const searchHandler = (text) => {
    dispatch(booksActions.filterBooks(text));
    setValue(text);
  };
  const [value,setValue] = useState("");

  return (
      <View style={styles.container}>
        <TextInput
        value={value}
        placeholder="Pretražite naslove..."
        onChangeText={(value) => searchHandler(value)}
        style={styles.search}
      />
      {filteredBookData.length > 0 ?
      <BookItem data={filteredBookData} navigation={props.navigation} />
      : <Text>{"Nema knjiga sa takvim naslovom."}</Text>
}
      </View>
     
  );

};

AllBooks.navigationOptions = (navigationData) => {
  return {
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu"
                iconName='ios-menu'
                onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>,
    headerTitle: 'Spisak dostupnih knjiga'
  };
};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'lora-bold'

  },
  search:{
    marginTop: 90
  }
});
export default AllBooks;
