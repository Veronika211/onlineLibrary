import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import Navigator from './navigation/Navigator'
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers,applyMiddleware } from 'redux'
import booksReducer from './store/books'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  books: booksReducer
})

//cuvamo stanje globalno ovde 
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  //omogucava nam da ucitamo fontove i prosledjujemo odakle da ih ucita
  return Font.loadAsync({
    'arimo': require('./assets/fonts/Arimo-Regular.ttf'),
    'arimo-bold': require('./assets/fonts/Arimo-Bold.ttf'),
    'lora': require('./assets/fonts/Lora-Regular.ttf'),
    'lora-bold': require('./assets/fonts/Lora-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} onError={console.warn} />
    );
  }
  //ovde obavijamo navigator sa providerom jer on renderuje sve ono sto se nama pojavljuje na ekranu
  //i sve stranice kojima je potreban state koji se nalazi u store-u
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
