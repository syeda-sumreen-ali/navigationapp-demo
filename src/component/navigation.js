import React, { useEffect, useRef , useState } from 'react';
import { View, Text, Button, Linking, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { setRdxShowNavigation } from '../store/appSlice';

const destinationLat =24.929374;
const destinationLng =  67.128448;
const url = `https://www.google.com/maps/dir/24.9551104,67.0583741/24.929374,67.128448/@24.9443628,67.0657928,13z/data=!3m1!4b1!4m5!4m4!1m1!4e1!1m0!3e0`;

const { height, width } = Dimensions.get('window');

const NavigPage = ({enterPipModeHandler, inPipMode}) => {
  const dispatch = useDispatch();
  const showNavigation = useSelector(state => state.app.showNavigation);
  const [webViewHeight, setWebViewHeight] = useState(Dimensions.get('window').height*0.9);
  const [webViewUri, setWebViewUri] = useState(url);
  const webviewRef = useRef(null);
  const isFocused = useIsFocused();




  const handleWebViewNavigationStateChange = (navState) => {
    setWebViewUri(navState.url);
    // Center scroll
    const jsCode = `
      var body = document.body,
          html = document.documentElement;
      var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
      window.scrollTo(0, height/2);
    `;
    webviewRef.current.injectJavaScript(jsCode);
  };

  return (
    <View>

        {inPipMode==false&& <Button title="Enter Pip Mode" onPress={enterPipModeHandler} />}
      <View style={{ 
       width:inPipMode?300: Dimensions.get('screen').width,
        height:webViewHeight}}>
      <WebView 
      ref={webviewRef}
      source={{ uri:webViewUri }}
       style={{  
         width:inPipMode?300: Dimensions.get('screen').width,
        height:webViewHeight
        }}
      onLoad={()=><Text>Loading...</Text>}
      onError={(error)=>console.log(`Error from webview: ${error.message}`)}
      onNavigationStateChange={handleWebViewNavigationStateChange}
       />

      </View>
    </View>
  );
};

export default NavigPage;
