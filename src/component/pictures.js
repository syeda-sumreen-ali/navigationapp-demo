import React, { useState, useEffect } from 'react';
import { View, Image,Text, TouchableOpacity, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import moment from 'moment';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { setRdxTakePicture } from '../store/appSlice';

const PicturePage = () => {
  const dispatch = useDispatch();
  const [permissionGranted, setPermissionGranted] = useState(false);

  const [image, setImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
     mediaType:'photo',
     width:Dimensions.get('screen').width/2,
     height:Dimensions.get('screen').height/2

    };
    launchCamera(options, (response) => {
      if (response.assets && response.assets[0]) {
        setImage(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    requestExternalStoragePermission()
  }, [])
  
 

async function requestExternalStoragePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your device storage to save images.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
      setPermissionGranted(true)
      // call function to save image here
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

  const handleSavePhoto = async() => {
    if (image) {
      const fileName = moment().format('YYMMDDhhmmss') + '.jpg';

     
      if (permissionGranted) {
       
        const externalPicturesDir = `${RNFS.DownloadDirectoryPath}`;
        const isPicturesDirExists = await RNFS.exists(externalPicturesDir);
        
        if (!isPicturesDirExists) {
          await RNFS.mkdir(externalPicturesDir);
        }
    
        const filePath = `${externalPicturesDir}/${fileName}`;
        await RNFS.moveFile(image, filePath);
        Alert.alert("image saved at path",filePath)
        dispatch(setRdxTakePicture(0))
    
      } else {
        console.log('Write permission not granted');
      }
    } else {
      Alert.alert('Error', 'Please take a picture first');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a Picture</Text>
     
      <TouchableOpacity style={styles.button} onPress={handleChoosePhoto} >
        <Text>Take Photo </Text>
    </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSavePhoto} >
        <Text>Save Photo </Text>
    </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
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
});

export default PicturePage;
