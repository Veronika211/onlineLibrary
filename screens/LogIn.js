import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
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
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <ScrollView>
        <Input
          id="email"
          label="E-Mail"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <Input
          id="password"
          label="Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorText="Please enter a valid password."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Button
              title={isSignup ? "Sign Up" : "Login"}
              onPress={authHandler}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default LogIn;

// import React,{useReducer, useEffect, useState, useCallback} from 'react'
// import {View,StyleSheet,ActivityIndicator, Alert,KeyboardAvoidingView,Button} from 'react-native'
// import Input from '../components/UI/Input'
// import { useDispatch } from 'react-redux'
// import * as authActions from '../store/actions/auth'

// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value
//     };
//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };
//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) {
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updatedValues
//     };
//   }
//   return state;
// };

// const LogIn = props => {
//   const dispatch = useDispatch();
//   const [error,setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formState, dispatchFormState] = useReducer(formReducer, {
//     inputValues: {
//       email: '',
//       password: ''
//     },
//     inputValidities: {
//       email: false,
//       password: false
//     },
//     formIsValid: false
//   });

//   useEffect(() => {
//     if(error){
//       Alert.alert("Greska",error,[{text: 'OK'}])
//     }
//   },[error])

//   const authHandler = async () => {
//     let action = authActions.login(
//         formState.inputValues.email,
//         formState.inputValues.password
//       );
//     setError(null);
//     setIsLoading(true);
//     try {
//       await dispatch(action);
//       props.navigation.navigate('Library');
//     } catch (err) {
//       setError(err.message)
//       setIsLoading(false);
//     }
//   }

//   const inputChangeHandler = useCallback(
//     (inputIdentifier, inputValue, inputValidity) => {
//       dispatchFormState({
//         type: FORM_INPUT_UPDATE,
//         value: inputValue,
//         isValid: inputValidity,
//         input: inputIdentifier
//       });
//     },
//     [dispatchFormState]
//   );

//     return (
//       <KeyboardAvoidingView
//       behavior="padding"
//       keyboardVerticalOffset={50}
//       style={styles.conainer}
//     >
//       {isLoading ? <ActivityIndicator  style={{flex: 1, justifyContent:'center', alignContent:'center'}} size='large'/> : <View>
//         <Input
//         id="email"
//         label="E-Mail"
//         keyboardType="email-address"
//         required
//         email
//         autoCapitalize="none"
//         errorText="Molimo Vas unesite ispravnu e-mail adresu."
//         onInputChange={inputChangeHandler}
//         initialValue=""
//       />
//       <Input
//         id="password"
//         label="Šifra"
//         keyboardType="default"
//         secureTextEntry
//         required
//         minLength={5}
//         autoCapitalize="none"
//         errorText="Šifra mora imati najmanje 5 karaktera."
//         onInputChange={inputChangeHandler}
//         initialValue=""
//       />

//       <Button
//         title={'Prijavi se'}
//         color = '#70012B'
//         onPress={authHandler}
//       />
//  </View>}
//     </KeyboardAvoidingView>
//     )

// }

// const styles = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     backgroundColor: '#ecf0f1'
//     //   },
//     //   input: {
//     //     width: 200,
//     //     height: 44,
//     //     padding: 10,
//     //     borderWidth: 1,
//     //     borderColor: '#70012B',
//     //     marginBottom: 10,
//     //     borderRadius: 20
//     //   },
//     //   button:{
//     //       backgroundColor:'#70012B',
//     //       color: 'white',
//     //       padding: 15,
//     //       width: 100,
//     //       height:50
//     //   }
// })

// export default LogIn;
