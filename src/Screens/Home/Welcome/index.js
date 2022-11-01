import React from 'react';
import BackgroundCustom from '../../../Components/BackgroundCustom';
import MenuButton from '../../../Components/MenuButton';
import {View,Text, Image,StyleSheet,ImageBackground ,TouchableOpacity,TextInput} from 'react-native'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { black, green100 } from 'react-native-paper/lib/typescript/styles/colors';



export default function Home({navigation}) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    const onLoginPressed = async () => {
        fetch('http://10.0.2.2:8080/api/auth/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'omer.twd@gmail.com',
                password: '123456'
            })
        })
        .then((response) => response.text()).then((response) =>console.log(response))
    }
  return (
    
        
        <BackgroundCustom>
            <ImageBackground  source={require('../../../Assets/bartin.jpg')} style={styles.image}>
                <MenuButton goMenu={navigation.openDrawer}/>
                <TouchableOpacity style={[styles.searchbarView,styles.searchbar]} onPress={ () => navigation.navigate('Hat ve Durak Arama')}>
                    <View style={{flexDirection:'row'}}>
                        <Icon style={styles.grey} size={25} name="search" />
                        <Text style={styles.searchbar}>Hat ve Durak Arama</Text>
                    </View>
                </TouchableOpacity>
                
            </ImageBackground>
            
            <View style ={styles.buttonGroup}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Yetkili Bayi ve Kart Merkezleri')}>
                    <View style={styles.buttonView}>
                        <Icon style={styles.black} size={30} name="business-outline" />
                        <Text style={styles.text}>Yetkili bayi ve Kart Merkezleri</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} title="Press me" onPress={() => navigation.navigate('Otobüsüm Nerede')}>
                    <View style={styles.buttonView}>
                        <Icon style={styles.black} size={30} name="bus-outline" />
                        <Text style={styles.text}>Otobüsüm Nerede</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} title="Press me" onPress={() => navigation.navigate('Hat Hareket Saatleri')}>
                    <View style={styles.buttonView}>
                        <Icon style={styles.black} size={30} name="time-outline" />
                        <Text style={styles.text}>Hat Hareket Saatleri</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} title="Press me" onPress={() => navigation.navigate('Bakiye Sorgulama')}>
                    <View style={styles.buttonView}>
                        <Icon  style={styles.black} size={30} name="cash-outline" />
                        <Text style={styles.text}>Bakiye Sorgulama</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} title="Press me" onPress={() => navigation.navigate('Akıllı Duraklar')}>
                    <View style={styles.buttonView}>
                        <Icon style={styles.black} size={30} name="flag-outline" />
                        <Text style={styles.text}>Akıllı Duraklar</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </BackgroundCustom>
            
    
    
  );
}
const styles = StyleSheet.create({
    image: {
        width:'100%',
        flex: 5
    },
    buttonGroup:{
        width: "100%",
        flex: 2
    },
    container:{
        flex: 1,
        flexDirection:'column',
    },
    searchbarView:{
        position: 'absolute',
        bottom: 20, 
        width:'100%',
        maxWidth:'96%',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        alignSelf: 'center',
        
    },
    searchbar:{
        backgroundColor:'white',
        borderRadius:12,
        width:'95%',
        color: 'grey',paddingStart:10,
        paddingTop:5,
        paddingBottom:5,
        justifyContent:'center',
        flex: 1,

        
    },
    button:{
        backgroundColor:'white',
        borderBottomWidth:1,
        borderColor:'grey',
        justifyContent:'center',
        flex: 1,
        paddingStart:10,
        
    },
    text:{
        color:'black',
        marginStart:10,
        fontSize:16
        
        
    },
    black:{
        color: 'black'
    },
    grey:{
        color: 'grey'
    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-around'
    },buttonView:{
        flexDirection:'row',
        alignItems:'center'
    }
})