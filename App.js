
import React from 'react'
import { AppRegistry, View, StatusBar } from 'react-native'

import About from './Components/About'
import Search from './Components/Search'
import MyCompanies from './Components/CompaniesList'
import {TabNavigator}  from 'react-navigation'

const Tabs = TabNavigator ({
  //Search:{screen: Search},
  About: {screen: About},
  Companies: {screen: MyCompanies}
},{
  tabBarPosition: 'bottom',
  tabBarOptions:{
    showIcon: true,
    showLabel: false,
    indicatorStyle:{
      height:3,
      backgroundColor:'#FFF'
      
    },
    style:{
      backgroundColor: "#487de4",
      borderTopWidth:1,
      borderColor: "#3f101c"
    }
  }
})

export default class App extends React.Component {
  render(){
    return(
      <View style={{flex:1}}>
        <StatusBar hidden = {true}/>
         <Tabs/>
        </View>
    );
  }
}
