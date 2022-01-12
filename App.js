import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import BigButton from './BigButton';


export default function App() {



  function onPress(count) {
    console.log('asomasdf');
    count +=1;
  }
  // let count = 0;
  [count, onPress] = useState(0)

  return (
    <View style={styles.container}>
      <Text>Okay done 👁👄👁</Text>
      <Text>counter: {this.count}</Text>
      <Button title="asdf" onPress={() =>this.onPress()}>
        asdf
      </Button>
      {/* <BigButton></BigButton> */}
      <StatusBar style="auto" />
    </View>
  );

}

export function onPress(count) {
  count +=1;
  console.log(`current count: ${JSON.parse(count)}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
