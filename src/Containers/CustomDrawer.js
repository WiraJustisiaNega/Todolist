import React from 'react';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import navigationStrings from './navigationStrings';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePath from './ImagePath';

function CustomDrawer(props) {
  const {navigation} = props;

  const moveToScreen = (screen) => {
    navigation.navigate(screen)
  }
  return (
    <DrawerContentScrollView
      style={{
        backgroundColor : 'rgba(0,0,0,0.8)',
      }}
      {...props}>
      <View style={styles.view1}>
        <Text onPress={() => navigation.closeDrawer()} style={styles.close}>
          Close
        </Text>

        <View
          style={{
            paddingVertical : 24,
          }}>
          <Image
            source={require('../assets/profile.jpg')}
            style={styles.profile}
          />
          <Text style={styles.username}>Username</Text>
        </View>
      </View>

      <View style={{ padding  : 16 }}>
        <TouchableOpacity 
        style={styles.btnStyle}
        onPress={() => moveToScreen(navigationStrings.HOME)}>
        <Image source={ ImagePath.icHome } style={{ width : 20, height : 20, tintColor : 'white', marginRight : 8 }} />
          <Text style={styles.home}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.btnStyle}
        onPress={() => moveToScreen(navigationStrings.PROFILE)}>
        <Image source={ ImagePath.icProfile } style={{ width : 20, height : 20, tintColor : 'white', marginRight : 8 }} />
          <Text style={styles.home}>Profile</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  username : { 
    color : 'white',
    fontWeight : '200',
    marginTop : 8,
    alignSelf : 'center'
  },
  profile : {
    width : 80,
    height : 80,
    borderRadius : 40,
  },
  close : {
    color : 'white',
    margin : 8,
    alignSelf : 'flex-end',
  },
  view1 : {
    backgroundColor : 'rgba(0,0,0,0.5)',
    alignItems : 'center',
    paddingVertical : 24,
  },
  home : {
    color : 'white'
  },
  btnStyle : {
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : 16
  }
});
