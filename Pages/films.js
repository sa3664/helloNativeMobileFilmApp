import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
  TextInput,
  Modal,
  Image,
} from "react-native";
import { createFilm, getFilms } from "./API";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";

const image = {
  uri:
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1940&q=80",
};
const Separator = () => <View style={styles.separator} />;

class Films extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rating: "",
      filmsData: [],
    };
    this.AddFilm = this.AddFilm.bind(this);
    this.DisplayFilms = this.DisplayFilms.bind(this);
  }

  AddFilm() {
    if (this.state.name == "") {
      alert("Please enter the film title");
    } else if (this.state.rating == "") {
      alert("Please enter the rating");
    } else if (
      parseInt(this.state.rating) > 5 ||
      parseInt(this.state.rating) <= 0
    ) {
      alert("Please rate between 1 to 5");
    } else {
      var token = this.props.route.params.jwtToken;

      createFilm(token, this.state.name, this.state.rating);

      this.setState({
        name: "",
        rating: "",
        isVisible: false,
      });
    }
  }

  async DisplayFilms() {
    var filmsData = await getFilms();
    this.setState({ filmsData });
  }

  createStars(row) {
    console.log("cs");
    console.log(row.rating);
    var stars = [];

    for (let i = 0; i < parseInt(row.rating); i++) {
      stars.push(<Text key={row.name + i}>&#127775;</Text>);
    }

    return stars;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Separator />
          <Separator />
          <Text style={styles.title}>
            The film box represents the desired films added by the user and
            display the names along with their rating
          </Text>
          <Separator />
          <Separator />
          <View>
            <TextInput
              style={styles.styletext}
              underlineColorAndroid="transparent"
              placeholder="Enter the film title"
              value={this.state.name}
              onChangeText={(filmTitle) => this.setState({ name: filmTitle })}
            />
            <Separator />
            <TextInput
              style={styles.styletext}
              underlineColorAndroid="transparent"
              keyboardType="number-pad"
              placeholder="Enter the rating"
              value={this.state.rating}
              maxLength={5}
              onChangeText={(filmRating) =>
                this.setState({ rating: filmRating })
              }
            />

            <Separator />

            <View style={styles.fixToText}>
              <Button
                title="Add Film"
                color="#5cb85c"
                style={styles.addfilmbutton}
                onPress={() => this.AddFilm()}
              />
            </View>
            <Separator />
            <View style={styles.fixToText}>
              <Button
                title="Display Films"
                color="rgb(250, 185, 101)"
                style={styles.displayfilmbutton}
                onPress={() => this.DisplayFilms()}
              />
            </View>
          </View>

          {this.state.filmsData.length > 0 ? (
            <View>
              <Grid style={styles.gridStyle}>
                <Row style={{ backgroundColor: "darkgray" }}>
                  <Col>
                    <Text style={styles.headerrow}>Film Title</Text>
                  </Col>
                  <Col>
                    <Text style={styles.headerrow}>Film Rating</Text>
                  </Col>
                  <Col style={styles.headerrow}></Col>
                </Row>
                <Separator />
                {this.state.filmsData.map((row) => {
                  return (
                    <Row key={row._id} style={styles.row}>
                      <Col>
                        <Text style={styles.RowTitle}>{row.name}</Text>
                      </Col>
                      <Col>
                        <Text style={styles.RowRating}>
                          {this.createStars(row)}
                        </Text>
                      </Col>
                      <Col>
                        <Button
                          title="Edit Rating"
                          color="red"
                          onPress={() =>
                            this.props.navigation.navigate("EditFilms", {
                              film: row,
                              jwtToken: this.props.route.params.jwtToken,
                            })
                          }
                        ></Button>
                      </Col>
                    </Row>
                  );
                })}
              </Grid>
            </View>
          ) : (
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
            </View>
          )}
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
  },

  row: {
    marginBottom: 10,
    textAlign: "center",
  },
  headerrow: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  RowTitle: {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: 15,
    textAlign: "center",
  },
  RowRating: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  gridStyle: {
    borderWidth: 4,
    borderColor: "gray",
    backgroundColor: "lightgray",
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

export default Films;
