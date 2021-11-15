import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View, Image, ActivityIndicator } from 'react-native'

class Splashscreen extends Component {

  componentDidMount() {
        AsyncStorage.getItem('token')
        .then(token => console.log(token))
  }
      render() {
        setTimeout(() => {
          this.props.navigation.replace("Splash")
        }, 4000)
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <View>
              <Image
                source={require('../../assets/Ramen.png')}
                style={{width: 200, height: 200}}
              />
            </View>
            <View>
              <Text style={{fontSize: 30}}> Ramen Food </Text>
            </View>
            <View>
                <ActivityIndicator size='large' color='White' />
            </View>
          </View>
    )
  }
}

export default Splashscreen