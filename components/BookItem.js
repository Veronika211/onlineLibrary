import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign, Feather } from "@expo/vector-icons";

const BookItem = (props) => {
  const commentsProps = props.comments;
  const commentsRedux = useSelector(state=> state.comments.comments)
 const comments = commentsRedux.filter(comment => comment.bookId === props.id)

  const averageMark = () => {
    var sum = 0;
    for (const key in comments) {
      sum += parseInt(comments[key].mark);
    }
    if (sum != 0) {
      return (sum / Object.keys(comments).length).toFixed(2);
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
 
  return (
    <View style={styles.container}>
      <Text>{props.year && props.year}</Text>
      <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.book}>
          <View style={styles.column}>
            <View style={styles.imageCont}>
              <Image source={{ uri: props.img }} style={styles.img} />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.author}>{props.author}</Text>
              <Text style={styles.stars}>
                {starsMark()} {averageMark()}
              </Text>
            </View>
          </View>
          <Feather name="info" size={25} color="darkgrey" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  book: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 13,
    marginHorizontal: 17,
  },
  imageCont: {
    width: 120,
    height: 150,
  },
  column: {
    flexDirection: "row",
  },
  info: {
    margin: 10,
    flexShrink: 1,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
  stars: {
    flexDirection: "row",
  },
  icon: {
    flexDirection: "row",
    marginTop: 55,
  },
  author: {
    fontSize: 15,
    marginBottom: 8,
  },
  title: {
    fontFamily: "arimo-bold",
    fontSize: 17,
    marginBottom: 4,
  },
});

export default BookItem;
