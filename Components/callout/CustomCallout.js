
import React from 'react'
import { StyleSheet, View, Text,TouchableWithoutFeedback,Image } from 'react-native'

export default class CustomCallout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iconFav: require('../icons/fullStar.png'),
            iconNotFav: require('../icons/emptyStar2.png'),
            iconClient: require('../icons/fullClient.png'),
            iconNotClient: require('../icons/emptyClient.png'),
        }
    }

    render() {
        const { spot } = this.props;
        let adress = spot.adress;
        console.log(spot.adress);
        return (
            <View >
                <View style={{ flexDirection: 'row', elevation: 5 }}>
                    <View
                        style={{
                            backgroundColor: '#78909C',
                            padding: 10,
                            borderTopLeftRadius: 10,
                            //borderBottomLeftRadius: 10,
                            height: 80,
                            width: 60,
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}>
                        <Text style={{ color: 'white' }}>INFO</Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 10,
                            borderTopRightRadius: 10,
                            //borderBottomRightRadius: 10,
                            height: 80,
                            width: 250,
                            // justifyContent         : 'center'
                        }}>
                        <Text style={{ marginBottom: 5, color: '#78909C' }}>
                            {spot.title}
                        </Text>
                        <Text style={{ marginBottom: 5, color: '#78909C' }}>
                            {adress}
                        </Text>
                        <Text style={{ marginBottom: 5, color: '#78909C' }}>
                            {spot.description}
                        </Text>
                    </View>
                    

                </View>
                <View style={{
                            flexDirection: 'row',
                            backgroundColor: '#CFD8DC',
                            
                            //borderBottomColor : '#BE57CC',
                            padding: 5,
                            borderColor: '#BE57CC',
                            borderBottomWidth: 2,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 10,
                            height: 40,
                            width: 310,
                            // justifyContent         : 'center'
                        }}>

                    <TouchableWithoutFeedback
                        disabled={false}
                        //style={{ height: this.state.iconHeight, width: 65 }}
                        /*onPress={() => this.favOnRate(row)}*/>
                        <Image style={{ height: 30, width: 30 }}
                            source={spot.fav == true ? this.state.iconFav : this.state.iconNotFav} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        disabled={false}
                        //style={styles.touchable}
                        /*onPress={() => this.clientOnRate(row)}*/>
                        <Image style={{ height: 30, width: 30 }}
                            source={spot.client == true ? this.state.iconClient : this.state.iconNotClient} />
                    </TouchableWithoutFeedback>

                </View>



            </View>


        )
    }
}

/*<Image style={{ height: 100, width: 100 }}
                        source={spot.require('./icons/fullLocalize.png')} />
                    <Image style={{ height: 100, width: 100 }}
                        source={require('./icons/fullLocalize.png')} />
                    <Image style={{ height: 100, width: 100 }}
                        source={require('./icons/fullLocalize.png')} />
*/