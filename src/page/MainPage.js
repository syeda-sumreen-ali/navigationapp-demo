import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../component/header';
import { setRdxTakePicture, setRdxShowNavigation } from '../store/appSlice'
import NavigPage from '../component/navigation';
import PicturePage from './PicturePage';

const MainPage = () => {
  const [showPictureButton, setShowPictureButton] = useState(false);
  const [showNavigationButton, setShowNavigationButton] = useState(false);
  const dispatch = useDispatch();

  // get the values of the two Redux variables
  const takePicture = useSelector(state => state.app.takePicture);
  const showNavigation = useSelector(state => state.app.showNavigation);

  // handle button press to toggle the takePicture variable
  const handleTakePicturePress = () => {
    dispatch(setRdxTakePicture(takePicture === 1 ? 0 : 1));
    
  };

  // handle button press to toggle the showNavigation variable
  const handleShowNavigationPress = () => {
    dispatch(setRdxShowNavigation(showNavigation === 1 ? 0 : 1));
  };

  // show the buttons for taking picture and showing navigation
  if (!showPictureButton && takePicture === 1) {
    setShowPictureButton(true);
  }
  if (!showNavigationButton && showNavigation === 1) {
    setShowNavigationButton(true);
  }

  const defaultView=()=>{
   return <View style={style.container}>
    <TouchableOpacity style={style.button} onPress={handleTakePicturePress} >
        <Text>{`Take Picture: ${takePicture}`} </Text>
    </TouchableOpacity>

    <TouchableOpacity style={style.button} onPress={handleShowNavigationPress} >
    <Text>{`Show Navigation: ${showNavigation}`}</Text>
    </TouchableOpacity> 
  </View>
  }

  return (
     <View>
      <Header 
      title={showNavigation?'Navigation':takePicture?'Picture':'Main'}
      onBack={()=>{
        dispatch(setRdxShowNavigation(0))
        dispatch(setRdxTakePicture(0))
      }}
      />
     {  showNavigation? <NavigPage/>: 
      takePicture?<PicturePage />:
      defaultView()}
     </View>
  );
};


export default MainPage;


const style=StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center'
  },
  button:{
    marginTop:10,
    backgroundColor:'powderblue',
    height:55,
    width:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  }
})