import React from 'react';
import {TouchableOpacity,View,Text,StyleSheet,ImageBackground} from 'react-native'

const BookGenre = props =>{
    return(
        <View style={styles.knjiga}>
        <TouchableOpacity onPress = {props.onSelect}>
        <View>
            <View style={{...styles.row,...styles.knjigaHeader}}>
                <ImageBackground source={{uri:props.img}} style={styles.slika}/>
                </View>
                <View style={{...styles.row,...styles.knjigaOpis,...styles.naslov}}>
                    <Text>{props.title}</Text>
                    </View>
                    <View style={{...styles.row,...styles.knjigaOpis}}>
                    <Text>{props.author}</Text>
                    </View>
               
        </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    knjiga:{
        height: 200,
        width: '95%',
        margin: 10,
        backgroundColor: '#E2E4E3',
        borderRadius: 10,
        overflow: 'hidden'
    },
    slika:{
        width: '100%',
        height: '100%'
    },
    row:{
        flexDirection: "row"
    },
    knjigaHeader:{
        height: '70%'
    },
    knjigaOpis:{
        height: '15%',
        padding: 5,
        fontFamily: 'arimo',
        alignItems: 'center',
        justifyContent: 'center'
    },
    naslov:{
        fontFamily: 'arimo-bold'
    }
   
});

export default BookGenre;