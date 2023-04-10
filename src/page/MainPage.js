import React, { useState, useRef } from 'react';
import { View, Text,ScrollView, Dimensions, Linking, Platform,  TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PipHandler, { usePipModeListener } from 'react-native-pip-android';
import Header from '../component/header';
import { setRdxTakePicture, setRdxShowNavigation } from '../store/appSlice'
import NavigPage from '../component/navigation';
import PicturePage from '../component/pictures';
import WebView from 'react-native-webview';
const MainPage = () => {

  const { width, height } = Dimensions.get('window');
  const [showPictureButton, setShowPictureButton] = useState(false);
  const [showNavigationButton, setShowNavigationButton] = useState(false);
  const dispatch = useDispatch();
  const inPipMode = usePipModeListener();
  const pipSupported = Platform.OS === 'android' && Platform.Version >= 26;
  const destinationLat = 37.7749;
  const destinationLng = -122.4194;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving`;
      
  const webviewRef = useRef(null);


  // get the values of the two Redux variables
  const takePicture = useSelector(state => state.app.takePicture);
  const showNavigation = useSelector(state => state.app.showNavigation);

  
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
  },
 
    webViewContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    webview: {
      width:300,
      height:514,
    },

  
})

  React.useEffect(() => {
    if(!inPipMode){
      setShowNavigationButton(false);
      dispatch(setRdxShowNavigation(0));
    }
  }, [inPipMode])
  

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

  const enterPipModeHandler=()=>{
    
      if(pipSupported){
        PipHandler.enterPipMode(300,514)
        }

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
     <ScrollView>
     {!inPipMode&& <Header 
      title={showNavigation?'Navigation':takePicture?'Picture':'Main'}
      onBack={()=>{
        dispatch(setRdxShowNavigation(0))
        dispatch(setRdxTakePicture(0))
      }}
      />}
     {showNavigation ? <NavigPage inPipMode={inPipMode && pipSupported} enterPipModeHandler={enterPipModeHandler}/>:   
      defaultView()}
      {Boolean(takePicture) && <View style={{ marginTop:'5%'}}>
        <PicturePage />
        </View>}
     </ScrollView>
  );

  
};



export default MainPage;
