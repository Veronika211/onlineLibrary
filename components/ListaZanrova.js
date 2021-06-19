import React, { version } from 'react';
import {TouchableOpacity,View,Text,StyleSheet,TouchableNativeFeedback,Platform} from 'react-native'

const ListaZanrova = props =>{
    let TouchableComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback;
    }
    return(
        //TouchableOpacity nam omogucava da kada pritisnemo naziv zanra on nas odvede na stranicu Knjige
        <View style={styles.listItem} >
        <TouchableComponent onPress = {props.onSelect}>
        <View style={styles.container}>
            <Text style={styles.naziv} numberOfLines={2}>
                {props.naziv}
            </Text>
        </View>
        </TouchableComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        overflow: 
        Platform.OS === 'android' && Platform.Version >=21 ? 'hidden' : 'visible',
        shadowOpacity: 0.12,
        height: 100,
        alignItems:'center',
        paddingTop: 40,
        backgroundColor: '#ffff',
        //elevation se odnosi na android
        elevation: 3
    },
    listItem:{
        flex: 1,
        margin: 15
    },
    naziv: {
        fontSize: 18,
        fontFamily: 'lora'
    }
});

export default ListaZanrova;