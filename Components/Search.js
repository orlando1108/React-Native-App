import React from 'react'

import {TextInput, Image, Button,View, Keyboard } from 'react-native'
import {StackNavigator} from 'react-navigation'
import List from './List'

class Search extends React.Component {


static navigationOptions = {
    title: 'Rechercher une ville',
    tabBarIcon: () =>{
       return  <Image source={require('./icons/home.png')} style={{width: 20, height: 20}}/>
    }
}
constructor(props){
    super(props)
    this.state = {
        city: 'Nantes' //this.props.navigation.state.params.city
    }
}

setCity(city){
    this.setState({city})
}

submit(){
    Keyboard.dismiss()
    this.props.navigation.navigate('Result', {city: this.state.city})
}

    render() {
        return (
            <View>
            <TextInput
                underlineColorAndroid = 'transparent'
                onChangeText={(text) => this.setCity(text)}
                onSubmitEditing = {()=> this.submit()}
                
                value={this.state.city}
            />
            <Button onPress={() => this.submit()} title="Rechercher une ville"/>
        </View>
        )
    }
}
/*
const navigationOptions = {
    headerStyle : style.header,
    headerTitleStyle: style.headerTitle
}*/
/*export default StackNavigator({
   Search:{
        screen: Search,
        navigationOptions
    },
    Result:{
        screen: List,
        navigationOptions
    },
    
    
    
})*/