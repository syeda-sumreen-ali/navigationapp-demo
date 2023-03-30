import React, { useEffect } from 'react';
import { View, Text, Button, Linking, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setRdxShowNavigation } from '../store/appSlice';

const NavigPage = () => {
  const dispatch = useDispatch();
  const showNavigation = useSelector(state => state.app.showNavigation);

  const destinationLat =24.929374;
  const destinationLng =  67.128448;

  useEffect(() => {
    if (showNavigation === 1) {
      const url = `google.navigation:q=${destinationLat},${destinationLng}`;
      Linking.canOpenURL(url)
        .then(supported => {
          if (!supported) {
            console.log('Google Maps not available');
          } else {
            return Linking.openURL(url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  }, [showNavigation]);

  const closeNavigation = () => {
    dispatch(setRdxShowNavigation(0));
  };

  return (
    <View>

      <Text>{String(showNavigation)}</Text>
      <Button title="Close Navigation" onPress={closeNavigation} />
    </View>
  );
};

export default NavigPage;
