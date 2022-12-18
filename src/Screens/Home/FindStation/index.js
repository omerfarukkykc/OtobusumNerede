import React from 'react';
import BackgroundCustom from '../../../Components/BackgroundCustom';
import {View,Text, Image,StyleSheet,ImageBackground ,TouchableOpacity,TextInput, SafeAreaView, ScrollView,FlatList} from 'react-native'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { black, green100 } from 'react-native-paper/lib/typescript/styles/colors';
import { forEach } from 'react-native-axios/lib/utils';
import { ApiClient } from '../../../Network/ApiClient';
import Loading from '../../../Components/Loading';

export default class SearchStationAndRoute extends React.Component{

    constructor({props,navigation}){
        super(props);
        this.apiClient = new ApiClient();
        this.state = { isToggleOn: false }
        this.state={
            searchQuery:"",
            navigation:navigation,
            data:[],
            isLoading:true
        }
    }
    onChangeSearch = query => {
        this.setState({
            searchQuery:query
        })
    };
    
    
    componentDidMount(){
        this.apiClient.getRoutes().then(routes=>{
            this.apiClient.getStations().then(res=>{
                res.forEach((item)=>{
                    routes = [...routes, item]
                })
            }).finally(()=>{
                this.setState({
                    data:routes
                    
                })
            });
        }).finally(()=>{
            setTimeout(()=>{
                this.setState({
                    isLoading:false
                })
            },500)
        });
    }
    /*
    shouldComponentUpdate(nextProps, nextState){
        return this.state.searchQuery == ""
        return nextState.searchQuery !=this.state.searchQuery
        return this.state.data==null
    }
    */
    
   
    renderItem(item){
        item = item.item
        if(item.stationName != null){
            
            if (this.state.searchQuery!=""&&!item.stationName.toUpperCase().includes(this.state.searchQuery.toUpperCase().trim().replace(/\s/g, ""))) {
                return
            }
            if (this.state.searchQuery!=""&&!item.stationName.toUpperCase().includes(this.state.searchQuery.toUpperCase().trim().replace(/\s/g, ""))) {
                return
            }
            
            return(
                <TouchableOpacity style={styles.item} title="Press me" onPress={()=>this.state.navigation.navigate('Station',{
                    stationID:item.stationID,
                    stationName:item.stationName,
                })}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon style={styles.black} size={40} name="flag-outline" />
                        <Text style={styles.itemText}>{item.stationName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }else{
            
            if (this.state.searchQuery!=""&&!item.routeName.toUpperCase().includes(this.state.searchQuery.toUpperCase().trim().replace(/\s/g, ""))) {
                return
            }
            if (this.state.searchQuery!=""&&!item.routeName.toUpperCase().includes(this.state.searchQuery.toUpperCase().trim().replace(/\s/g, ""))) {
                return
            }
            
            return(
                <TouchableOpacity style={styles.item} title="Press me" onPress={()=>this.state.navigation.navigate('Route',{
                    routeName:item.routeName,
                    routeID:item.routeID,
                })}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Icon style={styles.black} size={35} name="bus-outline" />
                        <Text style={styles.itemText}>{item.routeName}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        
    };
       
    render (){
        if(this.state.isLoading){
            return (
                <Loading/>
            )
        }
        return(
        <BackgroundCustom  >
            <View style={[styles.searchbarView]} >
                <Searchbar 
                placeholder="Hat ve Durak Arama"
                onChangeText={(item)=>this.onChangeSearch(item)}
                value={this.state.searchQuery}
                style={styles.searchbar}/>
            </View>
            <View style={styles.content}>
                <FlatList nestedScrollEnabled 
                    data={this.state.data}
                    renderItem={(item) => this.renderItem(item)}
                />
            </View>
        </BackgroundCustom>
        )
        
    };
    
}
const styles = StyleSheet.create({
    
    searchbarView:{
        width:'100%',
        maxWidth:'96%',
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius:12,
        width:'95%',
        color: 'grey',
        marginTop:10
        
    },
    searchbar:{
        backgroundColor:'white',
        borderRadius:12,
        color: 'grey',
        height: 45
    },
    grey:{
        color: 'grey'
    },
    item:{
        backgroundColor:'white',
        borderBottomWidth:1,
        borderColor:'grey',
        justifyContent:'center',
        paddingStart:10,
        flex: 1,
        height: 50
    },
    itemText:{
        color: 'black',
        fontSize:19,
        paddingStart:10
    },
    content:{
        paddingTop:10,
    },
    black:{
        color: 'black'
    }
    
})