import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import { useDispatch } from "react-redux";
import Input from "../components/UI/Input";
import * as authActions from "../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const LogIn = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Greška!", error, [{ text: "OK" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Library");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      style={styles.screen}
    >
      
      <View style={styles.imgView}>
      <Image
        source={require("../assets/images/bookmark.png")}
        style={styles.img}
      />
      </View>
      {isLoading ? <ActivityIndicator size='small' color="black"/> :
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          id="email"
          label="E-Mail"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Molimo Vas unesite ispravnu e-mail adresu."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <Input
          id="password"
          label="Šifra"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorText="Šifra mora sadržati bar 5 karaktera."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <View style={styles.buttonContainer}>
         
            <Button
              title={isSignup ? "Registrujte se" : "Prijavite se"}
              onPress={authHandler}
              color="white"
            />
        
        </View>
        <View>
          <Button
            title={`${isSignup ? "Prijavite se" : "Registrujte se"}`}
            color="black"
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          />
        </View>
      </ScrollView>
}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  mainContainer: {
    flex: 1,
    margin: 50,
    marginTop:5
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#70012B",
    padding: 12,
    margin: 20,
    marginTop: 30,
    borderRadius: 40,
    width: 170,
  },
  imgView:{
    justifyContent: "center",
    alignItems: "center",
    marginTop:100,
    marginBottom:30,
    padding:10
  },
  img: {
    alignSelf:'center',
    height: 150,
    width: 130
  },
  textButton: {
    color: "#70012B",
  },
});

export default LogIn;
