import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity ,TextInput,Image} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {

  state = {
   monedaorigen:"USD",
    datos: [],
    cantidad:'',
    character:'',
    datosRick:[],
    datosregresoHero:{

    },
    datosregresojson :
      {
        rates: {
          CAD: null,
          HKD: null,
          ISK: null,
          PHP: null,
          DKK: null,
          HUF: null,
          CZK: null,
          GBP: null,
          RON: null,
          SEK: null,
          IDR: null,
          INR: null,
          BRL: null,
          RUB: null,
          HRK: null,
          JPY: null,
          THB: null,
          CHF: null,
          EUR: null,
          MYR: null,
          BGN: null,
          TRY: null,
          CNY: null,
          NOK: null,
          NZD: null,
          ZAR: null,
          USD: null,
          MXN: null,
          SGD: null,
          AUD: null,
          ILS: null,
          KRW: null,
          PLN: null,
        },
        base: null,
        date: null
      },
    datosregresoRickjson:
      {
        
      "id": null,
      "name": '',
      "status": null,
      "species": null,
      "type": null,
      "gender": null,
      "origin": {
        "name": null,
        "url": null
      },
      "location": {
        "name":null,
        "url": null
      },
      "image": null,
      "episode": [],
      "url": null,
      "created": null
      }
      
  }

  getExchData = async() =>{

    try
    {
      var url = 'https://api.exchangeratesapi.io/latest?base='+ this.state.monedaorigen;
      const response = await fetch(url)
      const datos  = await response.json()
      this.setState({datos})
      this.setState({datosregresojson: datos})
      this.setState({character: this.state.cantidad})
      this.getRickAndMortyData();
    }
    catch(e)
    {
      console.log(e);
    }
  }

  getRickAndMortyData = async()=>{
     try
    {
      var url2 = 'https://rickandmortyapi.com/api/character/'+ this.state.character;
      const response2 = await fetch(url2)
      const datosRick = await response2.json()
      this.setState({datosRick})
      this.setState({datosregresoRickjson: datosRick})
    }
    catch(e)
    {
      console.log(e);
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
      <TextInput
       placeholder="MONEDA ORIGEN"
       
       onChangeText={(text)=> this.setState({monedaorigen: text.toUpperCase() })}
       />
       <TextInput
       placeholder="CANTIDAD"
       keyboardType="numeric"
       onChangeText={(text)=> this.setState({cantidad:parseFloat(text)})}
       />
     <TouchableOpacity onPress={() => this.getExchData() } style={{ padding : 20, backgroundColor: 'green' }}>
<Text> Obtener data </Text>
</TouchableOpacity>


<Text> MEXICAN PESO= {JSON.stringify(this.state.datosregresojson.rates.MXN)} </Text>
<Text> LIBRA= {JSON.stringify(this.state.datosregresojson.rates.GBP)} </Text>
<Text> YEN= {JSON.stringify(this.state.datosregresojson.rates.JPY)} </Text>
<Text> Prueba multi peso= {JSON.stringify(this.state.datosregresojson.rates.MXN)*this.state.cantidad} , </Text>
<Text> {'\n \n  '}Rick and Morty API Characters  </Text>
<Text> Nombre = {JSON.stringify(this.state.datosregresoRickjson.name)}  </Text>
<Text> Especie = {JSON.stringify(this.state.datosregresoRickjson.species)}  </Text>
<Text> Genero = {JSON.stringify(this.state.datosregresoRickjson.gender)}  </Text>
<Text> {'\n  '}</Text>
<Image style={{height:300,widht:280}} source={{uri:this.state.datosregresoRickjson.image}} />


    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
