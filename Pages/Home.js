import React from "react";
import { login } from "./API";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
  TextInput,
} from "react-native";

const image = {
  uri:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1940&q=80",
};

const Separator = () => <View style={styles.separator} />;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
    this.handlelogin = this.handlelogin.bind(this);
  }

  handlelogin = async () => {
    if (this.state.userName != "") {
      const jwtToken = await login(this.state.userName);
      // console.log("hl : " + jwtToken);

      if ((await jwtToken) != "") {
        this.props.navigation.navigate("Films", { jwtToken: jwtToken });
      }
    } else {
      alert("Please enter the username");
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.title}>
            The film box represents the desired films added by the user and
            display the names along with their rating
          </Text>
          <Separator />
          <Separator />
          <Separator />
          <Separator />

          <View>
            <TextInput
              style={styles.loginText}
              underlineColorAndroid="transparent"
              placeholder="Enter the Username"
              onChangeText={(text) => this.setState({ userName: text })}
            />
            <Separator />

            <View style={styles.fixToText}>
              <Button
                title="Login"
                color="dodgerblue"
                onPress={() => this.handlelogin()}
              />
            </View>
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
          </View>
          <Separator />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    color: "rgb(250, 185, 101)",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  loginText: {
    height: 80,
    width: 350,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 5,
    paddingLeft: 35,
    marginLeft: 30,
    color: "dodgerblue",
    fontSize: 20,
  },
  fixToText: {
    marginLeft: 120,
    height: 45,
    width: 150,
    fontSize: 30,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
  },
});

export default Home;
