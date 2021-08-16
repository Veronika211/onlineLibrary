import React, { useState } from "react";
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
  };
 
  return (
      <View style={styles.container}>
        <TextInput
        placeholder="Pretrazite..."
        onChangeText={(value) => searchHandler(value)}
        style={styles.search}
      />
      <BookItem data={filteredBookData} navigation={props.navigation} />
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
