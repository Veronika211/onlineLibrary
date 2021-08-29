import React, { useEffect } from "react";
import BookList from "../components/BookList";
import { useSelector } from "react-redux";

const BookListScreen = (props) => {
  const genres = useSelector((state) => state.books.genres);
  const genreId = props.navigation.getParam("genreId");
  const genreKey = props.navigation.getParam("genreKey");
  const selectedGenre = genres.filter((genre) => genre.id == genreId);

  var bookData = [];
  for (const key in selectedGenre) {
    bookData = selectedGenre[key].books;
  }

  return (
    <BookList
      data={bookData}
      navigation={props.navigation}
      genreKey={genreKey}
    />
  );
};

//podesavamo da naslov bude izabrani zanr
BookListScreen.navigationOptions = (navigationData) => {
  const title = navigationData.navigation.getParam("genreTitle");
  return {
    headerTitle: title,
  };
};

export default BookListScreen;
