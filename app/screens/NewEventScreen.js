import React from "react"
import {StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Alert} from "react-native"

import firebase from "@modules/Firebase"

import DatePick from "../components/DatePick"
import TimePick from "../components/TimePick"


export default class NewEventScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      date: "",
      time: "",
      address: "",
      notificationSwitchValue: false,
    }
  }

    toggleSwitch = value => {
      this.setState({ notificationSwitchValue: value })
    }

    navigateHome =  () => {
      this.props.navigation.navigate("Event")
    }

    createEvent = () => {
      const newEventId = firebase.firestore().collection("events").doc().id;
      //this.props.navigation.navigate("Event");

      firebase.firestore().doc("events/" + newEventId).set({
        name: this.state.title,
        date: this.state.date,
        time: this.state.time,
        address: this.state.address,
        notifications: this.state.notificationSwitchValue,
       // picture: "https://www.shutterfly.com/ideas/wp-content/uploads/2016/08/50-happy-birthday-quotes-thumb.jpg",
        participants: ["You, Michael, Nora, Nicolai"],
        isPublic: true
      })

      Alert.alert(
          'Event Created!',
          '',
          [
            {text: 'OK', onPress: this.navigateHome},
          ],
      );


    //   firebase.firestore().doc("events/" + newEventId).add({
    //     text: "Event created",
    //     uid: "exampleID",
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   })
  }

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.state.title}</Text>
          </View>
          <View style={styles.informationAreaContainer}>

            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Event name:</Text>
              <TextInput
                placeholder="name your event"
                onChangeText={title => this.setState({ title })}
                value={this.state.title}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Pick date:</Text>
              <DatePick mode="date"
                        onDateChange={date => this.setState({ date })}
                        value={this.state.date}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Time:</Text>
              <TimePick onDateChange={time => this.setState({ time })}
                        value={this.state.time}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Address:</Text>
              <TextInput
                onChangeText={address => this.setState({ address })}
                value={this.state.address}
                placeholder={"The adress of your event"}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Color code: </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Notification:</Text>
              <Switch
                style={styles.optionsItemRight}
                onValueChange={this.toggleSwitch}
                value={this.state.notificationSwitchValue}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.optionsItemLeft}>Invite participants</Text>
            </View>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                  onPress={this.createEvent}
                  style={styles.createEventButton}
              >
                <Text style={styles.buttonText}> Create Event! </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e7f4f6",
    flex: 1,
  },
  header: {
    alignSelf: "stretch",
    backgroundColor: "#108ba9",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flex: 2,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    padding: 26,
    marginTop: 23,
    alignContent: "center",
    justifyContent: "center",
    fontFamily: "Helvetica",
  },
  informationAreaContainer: {
    backgroundColor: "#ecf1f4",
    padding: 5,
    flex: 5,
  },
  infoContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    paddingRight: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  optionsItemLeft: {
    marginLeft: 5,
    fontFamily: "Helvetica",
  },
  optionsItemRight: {
    marginRight: 5,
    fontFamily: "Helvetica",
  },
  buttonArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createEventButton: {
    width: "75%",
    height: 125,
    backgroundColor: "#109aa9",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Helvetica",
  }
})
