// // // // import { StatusBar } from 'expo-status-bar';
// // // // import { StyleSheet, Text, View } from 'react-native';

// // // // export default function App() {
// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text>Open up App.js to start working on your app!</Text>
// // // //       <StatusBar style="auto" />
// // // //     </View>
// // // //   );
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: '#fff',
// // // //     alignItems: 'center',
// // // //     justifyContent: 'center',
// // // //   },
// // // // });
// // // // TrackedApp/App.js

// // // import React, { useEffect, useState } from 'react';
// // // import { View, Button, Text, StyleSheet } from 'react-native';
// // // import io from 'socket.io-client';

// // // const socket = io('http://localhost:3000'); // Replace with your server URL

// // // export default function App() {
// // //   const [location, setLocation] = useState({
// // //     latitude: 37.78825,
// // //     longitude: -122.4324,
// // //   });

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       const mockLocation = {
// // //         latitude: 37.78825 + Math.random() * 0.01,
// // //         longitude: -122.4324 + Math.random() * 0.01,
// // //       };
// // //       setLocation(mockLocation);
// // //       socket.emit('locationUpdate', mockLocation);
// // //     }, 5000); // Update every 5 seconds

// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>Sending Location Updates...</Text>
// // //       <Button
// // //         title="Send Current Location"
// // //         onPress={() => socket.emit('locationUpdate', location)}
// // //       />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },
// // // });
// // import React, { useEffect, useState } from 'react';
// // import { View, Button, Text, StyleSheet } from 'react-native';
// // import io from 'socket.io-client';
// // import * as Location from 'expo-location';

// // const socket = io('http://YOUR_SERVER_IP:3000'); // Replace with your server IP

// // export default function App() {
// //   const [location, setLocation] = useState(null);
// //   const [errorMsg, setErrorMsg] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       let { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') {
// //         setErrorMsg('Permission to access location was denied');
// //         return;
// //       }

// //       let location = await Location.getCurrentPositionAsync({});
// //       setLocation(location.coords);
// //       socket.emit('locationUpdate', location.coords);
// //     })();
    
// //     const interval = setInterval(async () => {
// //       let location = await Location.getCurrentPositionAsync({});
// //       setLocation(location.coords);
// //       socket.emit('locationUpdate', location.coords);
// //     }, 5000); // Update every 5 seconds

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <Text>Sending Location Updates...</Text>
// //       <Button
// //         title="Send Current Location"
// //         onPress={async () => {
// //           let location = await Location.getCurrentPositionAsync({});
// //           setLocation(location.coords);
// //           socket.emit('locationUpdate', location.coords);
// //         }}
// //       />
// //       {errorMsg ? <Text>{errorMsg}</Text> : null}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });
// import React, { useEffect, useState } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';
// import * as Location from 'expo-location';
// import io from 'socket.io-client';

// // Connect to the server
// const socket = io('http://YOUR_SERVER_IP:3000'); // Replace with your server IP

// export default function App() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);
//     })();

//     const interval = setInterval(async () => {
//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);
//       socket.emit('locationUpdate', loc.coords);
//     }, 5000); // Update every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Send Current Location"
//         onPress={() => {
//           if (location) {
//             socket.emit('locationUpdate', location);
//           }
//         }}
//       />
//       <Text>Sending location updates...</Text>
//       {location && (
//         <Text style={styles.text}>
//           Lat: {location.latitude}, Lon: {location.longitude}
//         </Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     marginTop: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     padding: 10,
//     borderRadius: 5,
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import io from 'socket.io-client';

// Replace with your server IP address
const socket = io('http://YOUR_SERVER_IP:3000');

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();

    const interval = setInterval(async () => {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      socket.emit('locationUpdate', loc.coords); // Send location to server
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Send Current Location"
        onPress={() => {
          if (location) {
            socket.emit('locationUpdate', location);
          }
        }}
      />
      <Text>Sending location updates...</Text>
      {location && (
        <Text style={styles.text}>
          Lat: {location.latitude}, Lon: {location.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
});
