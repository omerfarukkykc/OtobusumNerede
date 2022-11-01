import React from 'react'
import { View,Text,Button,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Station extends React.Component{
  constructor({route,navigation}){
    super()
    const {stationID,stationName} = route.params
    this.state={
      stationID : stationID,
      stationName : stationName
    }
  }
  
  render(){
    return (
      <View style={styles.header}>
        <View style={styles.headerGroup}>
          <Icon style={{color:'white'}} size={40} name="flag-outline"/>
          <View>
            <Text style={styles.smartStation}>Akıllı Durak</Text>
            <Text style={styles.stationName}>{this.state.stationName}</Text>
          </View>
        </View>
        <Text style={styles.routesText}>Yaklaşan Otobüsler</Text>
      </View>
      
    );
  }

}
const styles = StyleSheet.create({
  header:{
    width:'100%',
    backgroundColor:'#307efc',
    paddingTop:10,
    paddingStart:5
  },
  headerGroup:{
    flexDirection:'row',
    paddingBottom:15
  },
  smartStation:{
    color:"white",
    paddingHorizontal:5,
    fontSize:20
    
  },
  stationName:{
    color:"white",
    paddingLeft:5
  },
  routesText:{
    color:'white',
    alignSelf:'center',
    fontSize:17,
    paddingBottom:5
  }

})