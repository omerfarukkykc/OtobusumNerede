import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { ApiClient } from '../Network/ApiClient'
import { styles } from './Options/LogIn/style';
import Moment from 'moment';
export default class Balance extends React.Component {

  constructor({ props, navigation }) {
    super(props)
    this.apiClient = new ApiClient();
    this.state = {
      navigation: navigation,
      history: [],
      balance: "0000"
    }

  }
  componentDidMount() {
    this.apiClient.getBalance(1).then((res) => {
      this.setState({
        balance: res
      })
    })
    this.apiClient.getBalanceLog(1).then((res) => {
      this.setState({
        history: res
      })
    })
  }


  renderItem(item) {
    item = item.item
    logType =
      item.logType.logTypeName == "Load" ? "Yükleme" :
        item.logType.logTypeName == "Pay" ? "Ödeme" :
          item.logType.logTypeName == "Refund" ? "İade" : "İşlem";

    if (logType == "İşlem") {
      textStyle = {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
      }
    } else {
      textStyle = this.styles.colorWhite;
    }


    return (<View style={this.historyItemStyle(item.logType)}>
      <Text style={textStyle}>
        {logType}
      </Text>
      <Text style={textStyle}>
        {(item.procDate != "Tarih") ? Moment(item.procDate).format("YYYY/M/D H:M") : item.procDate}
      </Text>
      <Text style={textStyle}>
        {item.logAmount} ₺
      </Text>
    </View>)
  };
  historyItemStyle(itemType) {
    style = {
      padding: 10,
      borderRadius: 10,
      margin: 2,
      flexDirection: "row",
      justifyContent: 'space-around'
    }
    switch (itemType.logTypeName) {
      case "Pay":
        style.backgroundColor = 'rgba(244, 68, 46 , 0.9)'
        break;
      case "Load":
        style.backgroundColor = 'rgba(82, 183, 136 , 0.9)'
        break;
      case "Refund":
        style.backgroundColor = 'rgba(82, 183, 136 , 0.9)'
        break;
      default:
        style.backgroundColor = "grey"
        break;
    }
    return style
  }
  render() {
    return (
      <View style={this.styles.content}>
        <View style={this.styles.card}>
          <View style={this.styles.cardMagnetic}>
          </View>
          <View style={{ alignItems: 'center',}}>
            <Text style={{
              ...this.styles.colorWhite,
              fontSize:20,
              fontWeight:"bold",
              padding:20
              }}>
              Öğrenci Kartım
            </Text>
            <Text style={{
              ...this.styles.colorWhite,
              fontSize:15,
              fontWeight:"bold"
              }}>
              Bakiye: {this.state.balance} ₺
            </Text>
          </View>
        </View>

        <View style={this.styles.history}>
          {this.renderItem({
            item: {
              procDate: "Tarih",
              logAmount: "Tutar",
              logType: {
                logTypeName: "Default"
              }
            }
          })}
          <FlatList nestedScrollEnabled
            data={this.state.history}
            renderItem={(item) => this.renderItem(item)}

          />

        </View>

      </View>
    );
  }

  styles = StyleSheet.create({
    card: {
      flex: 2,
      width: "100%",
      backgroundColor: "#4EA5D9",
      borderRadius: 10
    },
    history: {
      flex: 3,
      margin: 10,
      width: "100%",

    },
    content: {
      flex: 1,
      alignItems: 'center',
      padding: "5%"
    },
    colorWhite: {
      color: "white",
    },
    cardMagnetic: {
      marginTop: 20,
      width: "100%",
      height: "30%",
      backgroundColor: "#1f271b"
    }

  })
}


