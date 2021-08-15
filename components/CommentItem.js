import React from 'react'
import {View,Text } from 'react-native'

const CommentItem = props => {
    return(
        <View>
            <Text>{props.date}</Text>
            <Text>{props.user}</Text>
            <Text>{props.text}</Text>
            <Text>{props.mark}</Text>
        </View>
    )
}

export default CommentItem;