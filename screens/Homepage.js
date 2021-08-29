import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import GenreItem from "../components/GenreItem";
import { DrawerActions } from "react-navigation-drawer";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import * as bookActions from "../store/actions/books";
import { useSelector, useDispatch } from "react-redux";
import * as readingListActions from "../store/actions/readingList";

const Homepage = (props) => {
  const genres = useSelector((state) => state.books.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookActions.loadGenres());
    dispatch(bookActions.loadBooks());
    dispatch(readingListActions.loadList());
    dispatch(readingListActions.loadReadList());
    dispatch(readingListActions.loadGoal());
  }, [dispatch]);

  const renderListItem = (itemData) => {
    const bookNum = itemData.item.books.length;
    return (
      <GenreItem
        title={itemData.item.title}
        bookNum={bookNum}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Books",
            params: {
              genreId: itemData.item.id,
              genreTitle: itemData.item.title,
              genreKey: itemData.item.key,
              bookNum: bookNum,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={genres}
      renderItem={renderListItem}
      numColumns={1}
    />
  );
};

Homepage.navigationOptions = (navigationData) => {
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
    headerTitle: "Početna",
  };
};

export default Homepage;
