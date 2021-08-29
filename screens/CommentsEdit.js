import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
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

  const updatedComment = useSelector((state) =>
    state.comments.comments.find((comment) => comment.id === commentId)
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      text: updatedComment ? updatedComment.text : "",
      mark: updatedComment ? updatedComment.mark : "",
    },
    inputValidities: {
      text: updatedComment ? true : false,
      mark: updatedComment ? true : false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Greška!", error, [{ text: "Ok" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Greška!", "Proverite da li ste dobro popunili sva polja.", [
        { text: "Ok" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (updatedComment) {
        await dispatch(
          commentActions.updateComment(
            bookKey,
            genreKey,
            commentId,
            formState.inputValues.text,
            formState.inputValues.mark
          )
        );
        Alert.alert("", "Uspešno ste izmenili komentar!", [{ text: "Ok" }]);
      } else {
        await dispatch(
          commentActions.createComment(
            bookId,
            bookKey,
            genreKey,
            formState.inputValues.text,
            formState.inputValues.mark
          )
        );
        Alert.alert("", "Uspešno ste uneli komentar!", [{ text: "Ok" }]);
      }
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
        <View style={styles.inputContainer}>
          <Input
            id="text"
            label="Unesite komentar"
            errorText="Unesite validan komentar!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={updatedComment ? updatedComment.text : ""}
            initiallyValid={!!updatedComment}
            required
            multiline={true}
            numberOfLines={3}
          />
          <Input
            id="mark"
            label="Unesite ocenu:"
            errorText="Ocena mora biti u opsegu 1-5!"
            min={1}
            max={5}
            keyboardType="decimal-pad"
            returnKeyType="next"
            initialValue={updatedComment ? updatedComment.mark : ""}
            onInputChange={inputChangeHandler}
            required
            min={1}
          />
          {commentId ? (
            <View style={styles.button}>
              <Button
                title="Izmeni"
                color="white"
                onPress={() => {
                  submitHandler();
                }}
              />
            </View>
          ) : (
            <View style={styles.button}>
              <Button
                title="Dodaj"
                onPress={() => {
                  submitHandler();
                }}
                color="white"
              />
            </View>
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

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#70012B",
    padding: 12,
    margin: 20,
    marginTop: 30,
    borderRadius: 40,
    height: 65,
    width: 130,
  },
});
export default Comments;
