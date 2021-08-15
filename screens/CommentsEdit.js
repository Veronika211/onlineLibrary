import React, { useState,useEffect, useCallback, useReducer  } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import Input from "../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../store/actions/comments";

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

const Comments = (props) => {
  const bookKey = props.navigation.getParam("bookKey");
  const genreKey = props.navigation.getParam("genreKey");
  const bookId = props.navigation.getParam("bookId");
  const commentId = props.navigation.getParam("commentId");
  // const editedProduct = useSelector(state =>
  //     state.products.userProducts.find(prod => prod.id === prodId)
  //   );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      text: "",
      mark: "",
    },
    inputValidities: {
      text: false,
      mark: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      //   if (editedProduct) {
      //     await dispatch(
      //       productsActions.updateProduct(
      //         prodId,
      //         formState.inputValues.title,
      //         formState.inputValues.description,
      //         formState.inputValues.imageUrl
      //       )
      //     );
      //   } else {
      await dispatch(
        commentActions.createComment(bookId, bookKey, genreKey, formState.inputValues.text, formState.inputValues.mark)
      );
      //}
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, formState]);

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

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View >
          <Input
            id="text"
            label="Unesite komentar"
            errorText="Unesite validan komentar!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue=""
            initiallyValid="false"
            required
          />
          <Input
            id="mark"
            label="Unesite ocenu:"
            errorText="Ocena mora biti u opsegu 1-5!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            initialValue=""
            onInputChange={inputChangeHandler}
            required
            min={1}
          />
          {commentId ? (
            <Button
              title="Izmeni"
              onPress={() => {
                dispatch(commentActions.updateComment());
              }}
            />
          ) : (
            <Button
              title="Dodaj"
              onPress={() => {
                submitHandler()
              }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
Comments.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("commentId")
      ? "Izmena komentara"
      : "Dodavanje komentara",
  };
};

export default Comments;
