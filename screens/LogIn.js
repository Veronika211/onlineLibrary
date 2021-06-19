import React from 'react'
import {ScrollView,StyleSheet,View,KeyboardAvoidingView,TextInput,Button} from 'react-native'
import Input from '../components/Input'

const LogIn = props =>{
    return (
        <View style={styles.container}>
        <TextInput
       // value={this.state.username}
        //onChangeText={(username) => this.setState({ username })}
        placeholder={'E-mail'}
        style={styles.input}
      />
      <TextInput
       // value={this.state.password}
       // onChangeText={(password) => this.setState({ password })}
        placeholder={'Šifra'}
        secureTextEntry={true}
        style={styles.input}
      />
      
      <Button
        title={'Prijavi se'}
        color = '#70012B'
        onPress={()=>{
            props.navigation.navigate({routeName:'Root'})}}
      />

    </View>

        /*
        <KeyboardAvoidingView>
        <View style={styles.container}>
            <ScrollView>
                <Input id="email"/>
                <Input id="email"/>
            </ScrollView>
        </View>
        </KeyboardAvoidingView>
        */
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
      },
      input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#70012B',
        marginBottom: 10,
        borderRadius: 20
      },
      button:{
          backgroundColor:'#70012B',
          color: 'white',
          padding: 15,
          width: 100,
          height:50
      }
})

export default LogIn;


