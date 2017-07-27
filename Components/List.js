import React from 'react'
import { Text, ActivityIndicator, ListView, Image} from 'react-native'

import axios from 'axios'
import WeatherRow from './weather/Row'

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
           title: 'Météo /'+ navigation.state.params.city,
           tabBarIcon: () =>{
               return  <Image source={require('./icons/home.png')} style={{width: 20, height: 20}}/>
           }
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            city: this.props.navigation.state.params.city,
            report: null
        }
        setTimeout(()=>{
            this.fetchWeather()
        },1000)
        
    }

    fetchWeather (){
        
        axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+this.state.city+'&mode=json&units=metric&cnt=10&APPID=affd6b19b3702af01eb55748b46c80a3')
        .then((response) => {
        this.setState({report: response.data })
        console.log('COUCOU'+ response.data);
       
    } );
    

    }


    render() {
        
        if (this.state.report === null) {
            return(
                <ActivityIndicator color={style.color} size="large"/>
            )
        } else {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            return (
               <ListView 
                dataSource = {ds.cloneWithRows(this.state.report.list)}
                renderRow = {(row, j, k)  => <WeatherRow day= {row} index={parseInt(k, 10)}/> }// => <Text>{JSON.stringify(rowData)}</Text>}
                />
                
                //<Text>ttt</Text>
            )

        }

    }
}