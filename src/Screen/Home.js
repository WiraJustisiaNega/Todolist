import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home() {
    const [name, setName] = useState()

    const save = async() => {
         try {
             await AsyncStorage.setItem("MyName", name)
         } catch (err) {
             alert (err)
         }
    }

    const load = async () => {
        try {
            let name = await AsyncStorage.getItem("MyName")

            if (name !== null) { 
                setName(name)
            }
        } catch (err) {

        }
    }

    const remove = async() => {
        try{
            await AsyncStorage.removeItem("MyName")
        } catch (err) {
            alert(err)
        } finally {
            setName("")
        }
    }

        useEffect(() => {
            load()
        }, [])
        return (
            <View style={styles.container}>
                <Text style={{height : 30}}>{name}</Text>
                <Text style={styles.name}>What's your name</Text>

                <TextInput style={styles.input} onChangeText={text => setName(text) }/>

                <TouchableOpacity style={styles.button} onPress={() => save()}>
                    <Text style={{ color : "white", }}>Save my name!</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => remove()}>
                    <Text style={{ color : "white", }}>Remove my name!</Text>
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#ffff',
        alignItems : "center",
        justifyContent : "center"
    },
    name : {
        fontSize : 24,
        fontWeight : "300"
    },
    input : {
        borderWidth : 1,
        borderColor : '#575009',
        alignSelf : "stretch",
        margin : 32,
        height : 64,
        borderRadius : 6,
        paddingHorizontal : 16,
        fontSize : 24,
        fontWeight : "300"
    },
    button : {
        backgroundColor : '#575DD9',
        alignItems : "center",
        justifyContent : "center",
        alignSelf : "stretch",
        paddingVertical : 12,
        paddingHorizontal : 32,
        marginTop : 32,
        marginHorizontal : 32,
        borderRadius : 6
    }
})
