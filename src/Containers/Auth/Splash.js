import React from 'react';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';

class Splash extends React.Component {
  render() {
    return (
      <Onboarding
        onDone={() => this.props.navigation.replace('Home')}
        onSkip={() => this.props.navigation.replace('Home')}
        pages={[
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../assets/19411-ramen-noodles.json')}
                autoPlay={true}
              />
            ),
            title: 'Enak',
            subtitle: 'Ramen terenak se Jakarta',
          },
          
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../assets/67225-delivery-food-interaction.json')}
                autoPlay={true}
              />
            ),
            title: 'Siap',
            subtitle: 'Siap Mengantarkan Makanan Untuk Anda',
          },
        ]}
      />
    );
  }
}
export default Splash;