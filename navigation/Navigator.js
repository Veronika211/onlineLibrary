import React from "react";
import {
  Platform,
  View,
  SafeAreaView,
  Button,
  Text,
  Image,
  Alert,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Homepage from "../screens/Homepage";
import BookListScreen from "../screens/BookListScreen";
import BookInfo from "../screens/BookInfo";
import ReadingList from "../screens/ReadingList";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import LogIn from "../screens/LogIn";
import StartScreen from "../screens/StartScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import CommentsEdit from "../screens/CommentsEdit";
import AllBooks from "../screens/AllBooks";
import ReadBooksScreen from "../screens/ReadBooksScreen";

const defaultSet = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#70012B" : "white",
  },
  headerTitleStyle: {
    fontFamily: "arimo-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "arimo",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "#70012B",
  headerRight: () => (
    <Image
      source={require("../assets/images/logo.png")}
      style={{ height: 25, width: 25, marginRight: 17, alignSelf: "center" }}
    />
  ),
};
const Navigator = createStackNavigator(
  {
    //Homepage,Books i Info su route names preko kojih pristupamo tim stranicama
    Homepage: Homepage,
    Books: BookListScreen,
    Info: BookInfo,
    Comment: CommentsEdit,
    //drugi argument nam omogucava da definisemo nacin na koji zelimo da nam header izgleda na svim ekranima
  },
  {
    defaultNavigationOptions: defaultSet,
  }
);
const ReadingL = createStackNavigator(
  {
    ReadingList: {
      screen: ReadingList,
    },
    Info: {
      screen: BookInfo,
    },
  },
  {
    defaultNavigationOptions: defaultSet,
  }
);
const ReadL = createStackNavigator(
  {
    ReadL: {
      screen: ReadBooksScreen,
    },
    Info: {
      screen: BookInfo,
    },
  },
  {
    defaultNavigationOptions: defaultSet,
  }
);
const ScreenConfig = {
  //Root nam je zapravo ovaj gornji navigator koji kontrolise sve na klik i on je na ovaj nacin ugnjezden u footer
  Root: {
    screen: Navigator,
    navigationOptions: {
      tabBarLabel: "Početna",
      tabBarIcon: (tabInfo) => {
        return <Entypo name="home" size={24} color={tabInfo.tintColor} />;
      },
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "arimo" }}>Početna</Text>
        ) : (
          "Početna"
        ),
    },
  },
  ReadingList: {
    screen: ReadingL,
    navigationOptions: {
      tabBarLabel: "Lista čitanja",
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome5 name="book-open" size={24} color={tabInfo.tintColor} />
        );
      },
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "arimo" }}>Lista čitanja</Text>
        ) : (
          "Lista čitanja"
        ),
    },
  },
  ReadList: {
    screen: ReadL,
    navigationOptions: {
      tabBarLabel: "Lista pročitanih",
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialCommunityIcons
            name="bookshelf"
            size={24}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "arimo" }}>Lista pročitanih</Text>
        ) : (
          "Lista pročitanih"
        ),
    },
  },
};
const FooterNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(ScreenConfig, {
        activeTintColor: "white",
        activeBackgroundColor: "#BA275E",
        shifting: false,
        barStyle: {
          backgroundColor: "#70012B",
        },
      })
    : createBottomTabNavigator(ScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "arimo-bold",
          },
          activeTintColor: "#70012B",
        },
      });

const SearchNavigator = createStackNavigator(
  {
    Search: AllBooks,
  },
  {
    defaultNavigationOptions: defaultSet,
  }
);
const MainNavigator = createDrawerNavigator(
  {
    Homepage: {
      screen: FooterNavigator,
      navigationOptions: {
        title: "Početna",
      },
    },
    AllBooks: {
      screen: SearchNavigator,
      navigationOptions: {
        title: "Sve knjige",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: "#70012B",
      labelStyle: {
        fontFamily: "arimo-bold",
      },
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Odjavi se"
              color="black"
              onPress={() => {
                Alert.alert("Da li ste sigurni da želite da se odjavite?", "", [
                  {
                    text: "Da",
                    onPress: () => {
                      dispatch(authActions.logout());
                      props.navigation.navigate("LogIn");
                    },
                  },
                  {
                    text: "Ne",
                    onPress: () => {
                      return;
                    },
                    style: "cancel",
                  },
                ]);
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

//ovo nam sluzi za prelaz izmedju login stranice i pocetne
const SwitchNavigator = createSwitchNavigator({
  StartScreen: StartScreen,
  LogIn: LogIn,
  Library: MainNavigator,
});

export default createAppContainer(SwitchNavigator);
