import React from 'react'

import MapView from 'react-native-maps';
import axios from 'axios'
import CustomCallout from './callout/CustomCallout'


import { View, Text, StyleSheet, ActivityIndicator, Image, Button, TextInput, Keyboard, Navigator } from 'react-native'

export default class Map extends React.Component {

    //=============================================================== google api maps example===================================================
    /*componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    }
                })
            })
        }
    }
    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
      const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }

  }
  loadMap() {
    if (this.props && this.props.google) {
      // ...
      this.map = new maps.Map(node, mapConfig);

      let centerChangedTimeout;
      this.map.addListener('dragend', (evt) => {
           if (centerChangedTimeout) {
                clearTimeout(centerChangedTimeout);
                centerChangedTimeout = null;
             }
             centerChangedTimeout = setTimeout(() => {
          this.props.onMove(this.map);
        }, 0);
      })
    }
    // ...
  }
*///=============================================================== google api maps example===================================================
    static navigationOptions = {
        title: 'Vous êtes ici...',
        tabBarIcon: () => {
            return <Image source={require('./icons/map.png')} style={{ width: 16, height: 16 }} />
        }
    }


    /* constructor (props) {
        super(props)
        this.state = {
           //city: this.props.navigation.state.params.city,
            report: null
        }
        setTimeout(()=>{
            this.fetchCompanies()
        },1000)
        
    }*/


    constructor(props) {


        super(props);
        console.log("prop company" + JSON.stringify(this.props.navigation.state.params.companies));
        this.state = {
            companiesList: this.props.navigation.state.params.selectedCompany || this.props.navigation.state.params.companies,
            mapRegion: null,
            lastLat: this.props.navigation.state.params.coordonnees.latitude,//47.24921510000001,
            lastLong: this.props.navigation.state.params.coordonnees.longitude, //-1.5930484999999999,
            latDelta: 0.0622,
            longDelta: 0.0321,
            report: null,
            markers: [],
            favMarker: require('./icons/favMarker.png'),
            clientMarker: require('./icons/clientMarker.png'),
            visitedMarker: require('./icons/visitedMarker.png'),
            standardMarker: require('./icons/marker.png')

        }

        // console.log("selected company" + this.state.companiesList);


    }

    componentWillMount() {
        let list = this.fetchCompanies();
        this.setState({
            markers: list
            //report: response.data
        });
    }
    /*componentDidMount() {


        navigator.geolocation.getCurrentPosition(
            (position) => {
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
                this.onRegionChange(region, region.latitude, region.longitude);
            },

            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        /* this.watchID = navigator.geolocation.watchPosition((position) => {
             var lastPosition = JSON.stringify(position);
 
             let lastRegion = {
                 latitude: lastPosition.coords.latitude,
                 longitude: lastPosition.coords.longitude,
                 latitudeDelta: 0.0922,
                 longitudeDelta: 0.0421
             }
 
             this.onRegionChange(lastRegion, lastRegion.latitude, lastRegion.longitude);
 
         }
         );
        //console.log( "WATCH ID    "+this.watchID);


}*/
    onRegionChange(region, lastLat, lastLong) {

        this.setState({

            mapRegion: region,
            // If there are no new values set the current ones
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
        console.log(" on channnge result state " + this.state.lastLat)
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    onMapPress(e) {
        let region = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        this.onRegionChange(region, region.latitude, region.longitude);
    }

    /*componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }*/




    /*search() {
        this.props.navigation.navigate('Search')
    }


    /*getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }*/

    /*setLocation(region) {
        this.setState({ region });
    }*/
    submit() {
        //Keyboard.dismiss();
        // this.fetchCompanies();
        //this.props.navigation.navigate('Result', {city: this.state.report})
        this.props.navigation.navigate('Result'/*, {location: this.state.location}*/)
    }
    fetchCompanies() {
        let listMarkers = [];
        let length = this.state.companiesList.length;

        for (var i = 0; i < length; i++) {
            listMarkers.push({
                coordinates: {
                    latitude: this.state.companiesList[i].coordonnees.lat,
                    longitude: this.state.companiesList[i].coordonnees.long
                },
                title: this.state.companiesList[i].nom,
                description: this.state.companiesList[i].activite,
                adress: this.state.companiesList[i].adresse,
                fav: this.state.companiesList[i].fav,
                client: this.state.companiesList[i].client,
                visited: this.state.companiesList[i].visited,
                key: i + 1
            });
        };
        return listMarkers
    }

    //<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    render() {
        if (this.state.lastLat === null) {
            return (
                /*<Button onPress={() => this.submit()} title="Trouver une entreprise" color={globalStyle.color}/>
                <Button onPress={() => this.fetchCompanies()} title="Localiser les entreprises" color={globalStyle.color}/>*/
                <View>

                    <ActivityIndicator size="large" />
                </View>

            )

        } else {
            console.log("RENDER result state " + this.state.lastLat)

            return (

                /*<Button onPress={() => this.submit()} title="Trouver une entreprise" color={globalStyle.color}/>
                <Button onPress={() => this.fetchCompanies()} title="Localiser les entreprises" color={globalStyle.color}/>*/
                <View style={styles.container}>
                    <View>

                    </View>
                    <MapView style={styles.map}
                        showsUserLocation={true}
                        followUserLocation={true}
                        zoomEnabled={true}
                        region=/*{this.state.mapRegion}*/
                        {{
                            latitude: this.state.lastLat, //47.23916450000001,
                            longitude: this.state.lastLong,//-1.6024515000000292,
                            latitudeDelta: this.state.latDelta,
                            longitudeDelta: this.state.longDelta,
                        }}
                        // onRegionChange={this.onRegionChange.bind(this)}
                        onPress={this.onMapPress.bind(this)}
                        fitToElements={true}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.coordinates}
                                title={marker.title}
                                description={marker.description}
                                image={marker.fav == true ? this.state.favMarker : marker.client == true ? this.state.clientMarker :this.state.standardMarker }
                                key={marker.key}
                            >
                                <MapView.Callout  tooltip={true}>
                                    <CustomCallout spot={marker}/>
                                </MapView.Callout>

                            </MapView.Marker>
                        ))}






                    </MapView>
                </View>
            )
        }

    }
}

///=============================================================== google api maps example===================================================
/*Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool,
  onMove: React.PropTypes.func
}
Map.defaultProps = {
  zoom: 13,
  // San Francisco, by default
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  centerAroundCurrentLocation: false,
  onMove: function() {}
}*/
//=============================================================== google api maps example===================================================

const red = '#A2273C'
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    button: {
        width: 10,
        backgroundColor: red,
        color: '#FFFFFF',
        top: 0,
        left: 0
    },
    input: {

        height: 40,
        width: 250,
        top: 0,
        left: 0,
        borderColor: 'blue',
        paddingHorizontal: 10,
        borderWidth: 1,
        marginBottom: 0
    },
    callView: {
        backgroundColor: '#A2D9CE',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        paddingHorizontal:0
    },
    callMap: {
        backgroundColor: '#A2D9CE',
        width: 150,
        height:50
    }


});

/*<Image
                            style={{
                            width: 24,
                            height: 24,
                            transform: [
                                        { rotate: `30deg` }
                                        ]
                             }}
                            source={require('./icons/marker.png')}/>*/




/*this.state = {
  markers: [{
    title: 'hello',
    coordinates: {
      latitude: 3.148561,
      longitude: 101.652778
    },
  },
  {
    title: 'hello',
    coordinates: {
      latitude: 3.149771,
      longitude: 101.655449
    },  
  }]
}
Inside render

<MapView 
  ....
>
  {this.state.markers.map(marker => (
    <MapView.Marker 
      coordinate={marker.coordinates}
      title={marker.title}
    />
  ))}
</MapView>



<MapView.Marker
                    coordinate= {{
              latitude: 47.24536450000001/*(this.state.lastLat ),
              longitude: -1.6024515000000292/*(this.state.lastLong ),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              }}
              title = "Home">
                </MapView.Marker>
                 <MapView.Marker
                   coordinate= {{
                    latitude: 47.24536450000001,
                    longitude: -1.6024515000000292,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                 title = "test">
                </MapView.Marker>
    
           /* <TextInput
                underlineColorAndroid = 'transparent'
                //onChangeText={(text) => this.setLocation(text)}
                //onSubmitEditing = {()=> this.submit()}
                style={styles.input}
                //value={this.state.location}
            />

            <View style={style.container}>
                <Text style={style.title}>A propos de l'application </Text>
                <Text>Application de météo </Text>
                <Button onPress={()=> this.search()} title = "Rechercher" color={style.color}/>
                


                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop:40 }}>
                    <ActivityIndicator style={style.view} color="#FF0000" size="large" animating={true} />

                </View>
            </View>
            
            /*{this.state.data.map(vendor => (
    <MapView.Marker
      coordinate=
      title={vendor.vndrName}
      description={vendor.description}
            */
