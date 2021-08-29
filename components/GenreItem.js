import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const GenreItem = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.listItem}>
      <TouchableComponent onPress={props.onSelect}>
        <View style={styles.container}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
          <Text style={styles.booksNum}>
            Broj naslova:
            {" " + props.bookNum}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    shadowOpacity: 0.12,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#ffff",
    //elevation se odnosi na android
    elevation: 3,
  },
  listItem: {
    flex: 1,
    margin: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: "lora-bold",
    marginBottom: 10,
  },
  booksNum: {},
});

export default GenreItem;
