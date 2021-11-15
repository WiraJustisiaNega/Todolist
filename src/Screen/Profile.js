import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Profile extends Component {
  constructor() {
    super()
    this.state = {
      name : "",
      hobby : "",
      textName : "",
      textHobby : ""
    }
    AsyncStorage.getItem("name", (error,result) => {
      if(result) {
        this.setState({
          name : result
        })
      }
    })
    AsyncStorage.getItem("hobby", (error, result) => {
      if (result) {
        this.setState({
          hobby : result
        })
      }
    })
  }

  saveData() {
    let name = this.state.textName
    let hobby = this.state.textHobby
    this.setState({
      name : name,
      hobby : hobby
    })
    alert("Data Tersimpan")

    AsyncStorage.setItem("name", name)
    AsyncStorage.setItem("hobby", hobby)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Halo! Kenalan Yuk! </Text>
        <Text style={styles.instruction}>
          Nama : {this.state.name}{"\n"}
          Hobi : {this.state.hobby}
        </Text>
        <TextInput style={styles.textInput} 
        onChangeText={(textHobby) => this.setState({textHobby})}
        placeholder="Nama" />
        <TextInput style={styles.textInput} 
        onChangeText={(textHobby) => this.setState({textHobby})}
        placeholder="Hobi" />
        <Button 
        title="Simpan"
        onPress={() => {this.saveData.bind(this)}}/>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 16,
    paddingTop: 32,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction : {
    textAlign : "center",
    color : "#333333",
    margin : 10
  },  
  textInput : {
    height : 35,
    width : 300,
    borderRadius : 20,
    backgroundColor : "white",
    marginTop : 8,
    marginBottom : 8,
    borderWidth : 1,
    borderColor : "grey",
    padding : 8
  }
});

AppRegistry.registerComponent("tutorialAsyncStorage", () => tutorialAsyncStorage)