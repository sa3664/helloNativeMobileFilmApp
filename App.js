import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Films from "./Pages/films";
import editFilm from "./Pages/editFilm";
import Home from "./Pages/Home";

const Stack = createStackNavigator();
const Separator = () => <View style={styles.separator} />;

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Separator />
        <Separator />
        <Text style={styles.textStyle}>FILM BOX</Text>

        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: "#f57f5b",
                height: 40,
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 22,
              },
            }}
          />
          <Stack.Screen
            name="Films"
            component={Films}
            options={{
              headerStyle: {
                backgroundColor: "#f57f5b",
                height: 40,
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 22,
              },
            }}
          />
          <Stack.Screen
            name="EditFilms"
            component={editFilm}
            options={{
              headerStyle: {
                backgroundColor: "#f57f5b",
                height: 40,
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 22,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 40,
    backgroundColor: "rgb(250, 185, 101)",
    height: 80,
    paddingTop: 10,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 10,
  },
});

export default App;
