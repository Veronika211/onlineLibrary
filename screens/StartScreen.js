import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartUp = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("LogIn");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, email, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("LogIn");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      props.navigation.navigate("Library");
      dispatch(authActions.authenticate(userId, token, email, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StartUp;
