import React from 'react'

import { View, Text, StyleSheet, ActivityIndicator, Image, Button,TextInput } from 'react-native'

export default class About extends React.Component {

static navigationOptions = {
    tabBarIcon: () =>{
       return  <Image source={require('./icons/user.png')} style={{width: 20, height: 20}}/>
    }
}
    search (){
        this.props.navigation.navigate('Search')
    }
    localise(){
        this.props.navigation.navigate('Companies')
    }
    render() {
        return (
            <View >
                <View> 
            <Button onPress={() => this.localise()} /*this.submit()}*/ title="Entreprises" />
                </View>
               
            </View>
        )
    }
}
