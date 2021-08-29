import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookList from "../components/BookList";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import * as readListActions from "../store/actions/readingList";

const ReadBooksScreen = (props) => {
  const readList = useSelector((state) => state.books.readList);
  const dispatch = useDispatch();
  var goal = useSelector((state) => state.books.goal.goal);
  const date = new Date().toLocaleDateString().substr(6);
  const [value, setValue] = useState("");
 
  const countBooks = () => {
    let sum = 0;
    for (const key in readList) {
      if (readList[key].year === date) sum++;
    }
   
    return sum;
  };
  useEffect(() => {
    if (goal === {}) goal = value;
  }, [value]);

  const textHandler = (text) => {
    setValue(text);
  };
  const goalHandler = () => {
    if (value.trim().length === 0) {
      Alert.alert("", "Polje ne moze biti prazno!", [{ text: "Ok" }]);
      return;
    }
    dispatch(readListActions.addGoal(value));
    Alert.alert("", "Uspešno ste dodali godisnji cilj!", [{ text: "Ok" }]);
  };
  if (goal) {
    var progress = (countBooks() / goal) * 100;
  }
  return (
    <View style={styles.container}>
      {goal === undefined ? (
        <View style={styles.inputBtn}>
          <TextInput
            value={value}
            placeholder="Unesite godišnji cilj"
            keyboardType="decimal-pad"
            onChangeText={(text) => textHandler(text)}
            style={styles.input}
          />
          <Button title={"Postavi"} onPress={goalHandler} color="#70012B" />
        </View>
      ) : (
        <View style={styles.progressRow}>
          <View style={styles.progressBar}>
            <View
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: 20,
                backgroundColor: "#70012B",
              }}
            ></View>
          </View>
          <Text>{countBooks() + "/" + goal}</Text>
        </View>
      )}
      {readList.length > 0 ? (
        <BookList data={readList} navigation={props.navigation} />
      ) : (
        <View style={styles.noBooks}>
          <Text>Nema knjiga u listi procitanih!</Text>
        </View>
      )}
    </View>
  );
};

ReadBooksScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Lista pročitanih knjiga",
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "lora-bold",
    margin: 15,
  },
  noBooks: {
    fontSize: 18,
  },
  input: {
    margin: 10,
  },
  inputBtn: {
    flexDirection: "column",
  },
  progressRow: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    width: "60%",
    borderRadius: 20,
    marginRight: 10,
    height: 18,
    backgroundColor: "lightgrey",
  },
  //   fill:{
  //       width:"30%",
  //       height:"100%",
  //       borderRadius:20,
  //       backgroundColor:"#70012B"
  //   }
});
export default ReadBooksScreen;
