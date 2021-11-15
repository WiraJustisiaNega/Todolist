import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'

export default class Register extends Component {

    constructor (props) {
        super (props);
        this.state = {
          name : "",
          email : "",
          cekPassword: "",
          password : "",
          password_confirmation : "",
          cekPassword : true,
          ulangiCekPassword: true
        }
      }

    register = () => {
      const {name, email, password, ulangiPassword} = this.state

      var dataToSend = {
        name : name,
        email : email,
        password : password, 
        password_confirmation : ulangiPassword
      }

      var formBody = []
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key)
        var encodedValue = encodeURIComponent(dataToSend[key])
        formBody.push(encodedKey+ "=" + encodedValue)
      }
      formBody =formBody.join("&")
      // POST Request
      fetch("https://api-todoapp-pp.herokuapp.com/api/auth/register", {
        method : "POST",
        body : formBody,
        headers : {
          "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then((response) => response.json())
        // If response is ini json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {token} = responseJson
          if (token) {
            alert("register sukses")
            this.props.navigation.navigate("Login")
          }else {
            alert ("Pastikan Form Sudah Terisi dengan benar")
          }
        })
        // If response is not in json then in error
        .catch((error) =>{
          alert ("Pastikan Form Sudah Terisi dengan benar")
        })
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'skyblue'}}>
            <View>
              <Text style={{color:'white', fontSize:25, alignSelf : "center", marginVertical : 50}}>Silahkan Register</Text>

              <TextInput placeholder="Nama Lengkap"
              style={styles.textinput}
              underlineColorAndroid="transparent"
              onChangeText={(name) => this.setState({name})}/>

              <TextInput placeholder="Email"
              style={styles.textinput}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({email})}
              />
              
              <TextInput placeholder="Password"
              style={styles.textinput}
              secureTextEntry={this.state.cekPassword}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({password})}
              />
              
              <TextInput placeholder="Password Confirmation"
              style={styles.textinput}
              secureTextEntry={this.state.ulangiCekPassword}
              underlineColorAndroid="transparent"
              onChangeText={(ulangiPassword) => this.setState({ulangiPassword})}/>
              
              <TouchableOpacity onPress={() => this.register()}>
                <View style={styles.view1}>
                <Text style={styles.signup}>Sign Up</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                <View style={styles.view1}>
                <Text style={styles.signup}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  textinput : {
    backgroundColor : "white",
    marginVertical : 10,
    width : 300,
    marginHorizontal : 40,
    borderRadius : 30,
    padding : 13
  },
  view1 : {
      backgroundColor : "white",
      width : 300,
      marginVertical : 20,
      marginHorizontal : 40,
      height : 40,
      borderRadius : 20
  },
  signup : {
    alignSelf : "center",
    padding : 10,
  }
})
