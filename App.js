import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  let camera
  const [data, setData] = useState('');

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    console.log(capture());
  }

  function capture() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  async function takePicture() {
    if (camera) {
      const options = { skipProcessing: true };

      setData(await camera.takePictureAsync(options));
      console.log(data.uri);
    }
  }

  const handleBarcodeScanned = ({ data }) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.photo}
        source={data}
      />
      <CameraView style={styles.camera} facing={facing} onBarcodeScanned={handleBarcodeScanned}
        ref={ref => (camera = ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  photo: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});