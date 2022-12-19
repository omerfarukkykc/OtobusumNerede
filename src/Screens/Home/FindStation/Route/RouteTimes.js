
import React, { useRef } from 'react';
import {View, Text, Button,StyleSheet,Image,FlatList, LogBox} from 'react-native';
import BackgroundCustom from '../../../../Components/BackgroundCustom';
import Loading from '../../../../Components/Loading';
import { ApiClient } from '../../../../Network/ApiClient';

export default class RouteTimes extends React.Component{
    
    constructor({props,route,navigation}){
        super(props)
        this.apiClient = new ApiClient();
        const {routeName ,routeID} = route.params.route
        this.state = {
            routeName:routeName,
            routeID:routeID,
            data:[],
            isLoading:true
        }
       
      
    }
    componentDidMount(){
      this.apiClient.getRouteTimes(this.state.routeID).then((item)=>{
          this.setState({
              data:item,
          })
      }).finally(()=>{
        setTimeout(()=>{
          this.setState({
            isLoading:false
          })
        },500)
      })
    }
    renderItem(item){
      index = item.index
      item = item.item
      return(
        <View style={styles.row}>
            <Text style={styles.itemText}>{index+1} </Text>
            <Text style={styles.itemText}>{item.startTime} </Text>
            <Text style={styles.itemText}>{item.finishTime}</Text>
        </View>
        
    )
  };
    render (){
        if(this.state.isLoading){
          return(<Loading/>)
        }
      return (
        <BackgroundCustom>
            <View style={styles.header}>
                <Text style={styles.headerText}>{this.state.routeName}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.itemHeaderText}>Sefer No </Text>
                    <Text style={styles.itemHeaderText}>Kalkış Zamanı </Text>
                    <Text style={styles.itemHeaderText}>Varış Zamanı</Text>
                </View>
                <FlatList nestedScrollEnabled 
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                />
            </View>
        </BackgroundCustom>
      );
        
    }
}
const styles = StyleSheet.create({
  header:{
    width:'100%',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
  },
  headerText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    
    alignSelf:'center',
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-around',
    
    width:'97%',
  },
  itemHeaderText: {
    fontSize: 15,
    color: 'black',
    
    fontWeight: 'bold',
    margin: 3,

  },
  itemText: {
    fontSize: 15,
    color: 'black',
    margin: 2,
  }
});