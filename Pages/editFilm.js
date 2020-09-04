import React from "react";
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  TextInput,
} from "react-native";
import { UpdateFilm, getFilms } from "./API";
import { ScrollView } from "react-native-gesture-handler";

const image = {
  uri:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1940&q=80",
};
const Separator = () => <View style={styles.separator} />;

class editFilm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route.params.film.name,
      rating: this.props.route.params.film.rating,
      filmsData: [],
    };
    this.UpdateFilm = this.UpdateFilm.bind(this);
    this.DisplayFilms = this.DisplayFilms.bind(this);
  }

  UpdateFilm() {
    if (this.state.name == "") {
      alert("PLease enter the film title");
    } else if (this.state.rating == "") {
      alert("Please enter the rating");
    } else if (
      parseInt(this.state.rating) > 5 ||
      parseInt(this.state.rating) <= 0
    ) {
      alert("Please rate between 1 to 5");
    } else {
      var token = this.props.route.params.jwtToken;
      var name = this.state.name
        ? this.state.name
        : this.props.route.params.film.name;
      var rating = this.state.rating
        ? this.state.rating
        : this.props.route.params.film.rating;
      UpdateFilm(token, name, rating);

      this.setState({
        name: "",
        rating: "",
        isVisible: false,
      });
      this.props.navigation.navigate("Films", {
        jwtToken: token,
        filmUpdate: true,
      });
    }
  }

  async DisplayFilms() {
    var token = this.props.route.params.jwtToken;
    this.props.navigation.navigate("Films", { jwtToken: token });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Separator />
          <Separator />
          <Separator />
          <Separator />
          <Separator />
          <View>
            <TextInput
              editable={false}
              selectTextOnFocus={false}
              style={styles.styletext}
              underlineColorAndroid="transparent"
              value={this.state.name}
              onChangeText={(filmTitle) => this.setState({ name: filmTitle })}
            />
            <Separator />
            <TextInput
              style={styles.styletext}
              underlineColorAndroid="transparent"
              keyboardType="number-pad"
              value={this.state.rating.toString()}
              maxLength={5}
              onChangeText={(filmRating) =>
                this.setState({ rating: filmRating })
              }
            />

            <Separator />

            <View style={styles.fixToText}>
              <Button
                title="Update"
                color="#5cb85c"
                style={styles.addfilmbutton}
                onPress={() => this.UpdateFilm()}
              />
            </View>
            <Separator />
            <View style={styles.fixToText}>
              <Button
                title="Close"
                color="red"
                style={styles.displayfilmbutton}
                onPress={() => this.DisplayFilms()}
              />
            </View>
          </View>
          <View>
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
          </View>
        </ImageBackground>
      </ScrollView>
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
  styletext: {
    height: 60,
    width: 350,
    backgroundColor: "white",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 5,
    paddingLeft: 35,
    marginLeft: 30,
    color: "dodgerblue",
    fontSize: 20,
    textTransform: "capitalize",
  },
  addfilmbutton: {
    backgroundColor: "#5cb85c",
    color: "white",
  },
  displayfilmbutton: {
    backgroundColor: "#5cb85c",
    color: "white",
  },
  row: {
    marginBottom: 10,
  },
  RowTitle: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 15,
  },
  gridStyle: {
    borderWidth: 4,
    borderColor: "gray",
    backgroundColor: "white",
    width: 370,
    padding: 10,
    marginLeft: 22,
    fontWeight: "bold",
    textAlign: "center",
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

export default editFilm;
