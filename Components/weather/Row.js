import React from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import moment from 'moment'
import 'moment/locale/fr'
import FadeInView from '../animations/fadeInView'

moment.locale('fr')

export default class WeatherRow extends React.Component {

    static propTypes = {
        day: React.PropTypes.object,
        index: React.PropTypes.number
    }
    day() {
        let day = moment(this.props.day.dt * 1000).format('ddd')
        return (
            <Text style={[style.white, style.bold]}>{day.toUpperCase()}</Text>
        )
    }
    icon(size = 50) {
        const type = this.props.day.weather[0].main.toLowerCase()
        let image
        switch (type) {
            case 'clouds':
                image = require('./icons/cloudy.png')
                break;
            case 'rain':
                image = require('./icons/rain.png')
                break;
            default:
                image = require('./icons/sun.png')

        }
        return <Image source={image} style={{ width: size, height: size }} />
    }
    date() {
        let day = moment(this.props.day.dt * 1000).format('DD/MM')
        return (
            <Text style={style.white}>{day}</Text>
        )
    }
    render() {
        if(this.props.index  === 0){
            return (
                <FadeInView>
            <View style={[style.flex, style.view, style.firstView]}>
                <View>
                    <Text style = {{color: '#FFF'}}>{this.day()}{this.date()}</Text>
                    {this.icon(90)}
                    
                </View>
                <Text style={[style.temp, {fontSize:35}]}> {Math.round(this.props.day.temp.day)}°C</Text>
            </View>
            </FadeInView>
            
        )

    }else{
        return (
            <FadeInView delay={this.props.index * 50 }>
            <View style={[style.flex, style.view]}>
                <View style = {style.flex}>
                    {this.icon()}
                    <Text style = {{marginLeft:10}}>{this.day()}{this.date()}</Text>
                </View>
                <Text style={style.temp}> {Math.round(this.props.day.temp.day)}°C</Text>
            </View>
            </FadeInView>
        )

        }
        
    }
}

const style = StyleSheet.create({
    white: {
        color: '#FFF',
    },
    bold: {
        fontWeight: 'bold'
    },
    flex:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    firstView:{
        backgroundColor: '#e54b65'
    },
    view: {
        backgroundColor: '#394163',
        borderWidth:  0,
        borderBottomWidth: 1,
        borderBottomColor: '#202340',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between'
       
    },
    temp: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22

    }
})
