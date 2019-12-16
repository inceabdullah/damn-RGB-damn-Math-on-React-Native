import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BgEdView from './bg_edView';



export default function App() {
  return (
    <View
    style={styles.container}
    >
      <View>
        <Text
        style={styles.Text}
        >
          damn RGB
        </Text>

      </View>
    <View
        style = {{
          height: '20%'
        }}        
      ><BgEdView/></View>
      <View>
        <Text
                style={styles.Text}

        >
          damn Math
        </Text>

      </View>
      <View
        style = {{
          height: '40%'
        }}        
      >
        <BgEdView/>
        


      </View>
      <View>
      <Text
              style={styles.Text}

      >
          on React Native
        </Text>
      </View>



        



      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontFamily: "monospace",
    fontSize: 45,
    color: "white",
    backgroundColor: "black",
    alignItems: "center"
  }
});
