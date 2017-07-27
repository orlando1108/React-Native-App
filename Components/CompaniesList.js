import React from 'react'
import { Text, ActivityIndicator, ListView, Image, View, Button, StyleSheet, TouchableWithoutFeedback, AsyncStorage } from 'react-native'


import axios from 'axios'



import Map from './Map'
import { StackNavigator } from 'react-navigation'

class CompaniesList extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Companies '/*+ navigation.state.params.city*/,
            tabBarIcon: () => {
                return <Image source={require('./icons/map.png')} style={{ width: 20, height: 20 }} />
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            coordonnees: {},
            report: null,
            companies: [],
            companiesToLocalize: [],
            iconWidth: 50,
            iconHeight: 50,
            iconSelected: require('./icons/fullStar2.png'),
            iconUnselected: require('./icons/emptyStar2.png'),
            iconClientSelected: require('./icons/fullClient.png'),
            iconClientUnselected: require('./icons/emptyClient.png'),
            iconVisitedSelected: require('./icons/fullLocalize.png'),
            iconVisitedUnselected: require('./icons/emptyLocalize.png'),
        }
        /*  setTimeout(()=>{
              this.fetchCompanies()
          },1000)*/

    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                this.setState({ coordonnees: coords });
            },

            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

    }

    componentDidMount() {
        this.getCurrentLocation();

    }

    fetchCompanies() {
        this.getCurrentLocation();
        axios.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=sirene%40public&q=menuiserie&lang=fr&rows=3&geofilter.distance=' + String(this.state.coordonnees.latitude) + '%2C' + String(this.state.coordonnees.longitude) + '%2C1000')
            .then((response) => {
                let companiesList = [];
                let companiesToLocalize = [];
                response.data.records.forEach(function (element) {

                    AsyncStorage.getItem(element.recordid).then((result) => {
                        if (result !== null) {
                            companiesList[element.recordid] = JSON.parse(result);
                            companiesToLocalize.push(JSON.parse(result));
                        } else {

                            var company = {
                                id: element.recordid,
                                nom: element.fields.nomen_long,
                                activite: element.fields.libapen,
                                adresse: element.fields.l4_normalisee + ' ' + element.fields.l6_normalisee,
                                coordonnees: {
                                    lat: element.fields.coordonnees[0],
                                    long: element.fields.coordonnees[1]
                                },
                                fav: false,
                                client: false,
                                visited: false
                            };
                            companiesList[element.recordid] = company;
                            companiesToLocalize.push(company);
                        }
                        this.setState({ companies: companiesList, companiesToLocalize: companiesToLocalize });
                    })
                }.bind(this));
                this.setState({ report: response.data });
            })
    }

    favOnRate(obj) {

        let companiesList = this.state.companies;
        let company;
        if (obj.fav == false) {
            company = {
                id: obj.id,
                nom: obj.nom,
                activite: obj.activite,
                adresse: obj.adresse,
                coordonnees: {
                    lat: obj.coordonnees.lat,
                    long: obj.coordonnees.long
                },
                fav: true,
                client: obj.client,
                visited: obj.visited
            };
            companiesList[obj.id] = company;
            AsyncStorage.setItem(obj.id, JSON.stringify(company));

        } else {
            company = {
                id: obj.id,
                nom: obj.nom,
                activite: obj.activite,
                adresse: obj.adresse,
                coordonnees: {
                    lat: obj.coordonnees.lat,
                    long: obj.coordonnees.long
                },
                fav: false,
                client: obj.client,
                visited: obj.visited
            };
            companiesList[obj.id] = company;
            AsyncStorage.removeItem(obj.id);
        }
        this.setState({ companies: companiesList });
    }

    clientOnRate(obj) {

        let companiesList = this.state.companies;
        let company;
        if (obj.client == false) {
            company = {
                id: obj.id,
                nom: obj.nom,
                activite: obj.activite,
                adresse: obj.adresse,
                coordonnees: {
                    lat: obj.coordonnees.lat,
                    long: obj.coordonnees.long
                },
                fav: obj.fav,
                client: true,
                visited: obj.visited

            };
            companiesList[obj.id] = company;
            AsyncStorage.setItem(obj.id, JSON.stringify(company));

        } else {
            company = {
                id: obj.id,
                nom: obj.nom,
                activite: obj.activite,
                adresse: obj.adresse,
                coordonnees: {
                    lat: obj.coordonnees.lat,
                    long: obj.coordonnees.long
                },
                fav: obj.fav,
                client: false,
                visited: obj.visited
            };
            companiesList[obj.id] = company;
            //AsyncStorage.removeItem(obj.id);
        }
        this.setState({ companies: companiesList });
    }
    visitedOnRate(obj) {

        let companiesList = this.state.companies;
        let company;
        if (obj.visited == false) {
            company = {
                id: obj.id,
                nom: obj.nom,
                activite: obj.activite,
                adresse: obj.adresse,
                coordonnees: {
                    lat: obj.coordonnees.lat,
                    long: obj.coordonnees.long
                },
                fav: obj.fav,
                client: obj.client,
                visited: true

            };
            companiesList[obj.id] = company;
            AsyncStorage.setItem(obj.id, JSON.stringify(company));

        } else {
            company = {
                id: obj.id,
                nom: obj.nom,
                activite: obj.activite,
                adresse: obj.adresse,
                coordonnees: {
                    lat: obj.coordonnees.lat,
                    long: obj.coordonnees.long
                },
                fav: obj.fav,
                client: obj.client,
                visited: false
            };
            companiesList[obj.id] = company;
            //AsyncStorage.removeItem(obj.id);
        }
        this.setState({ companies: companiesList });
    }

    deleteCompanies() {
        /* let test = this.state.companies;
         console.log(test);
         test.forEach(function (element) {
             console.log(element);
             AsyncStorage.removeItem( '92f2c94a00ea876f6acc61f99129f5a1b1663f6a',(err, result) => {
                 console.log("clear fav !");
             });
         });*/
        this.setState({ companies: [] });


    }
    localiseCompany(obj) {
        console.log("latitude sent" + obj.coordonnees.lat);
        let company = [obj];
        this.props.navigation.navigate('Map', { selectedCompany: company, coordonnees: this.state.coordonnees })

    }
    localiseAllCompany() {
        //console.log(" companies sennnnt    "+JSON.stringify(this.state.companies));
        /* let companiesList = [];
         this.state.companies.forEach(function (element) {
             companiesList.push(element);
         });*/
        // console.log("list sent !!!   "+JSON.stringify(companiesList));
        this.props.navigation.navigate('Map', { companies: this.state.companiesToLocalize, coordonnees: this.state.coordonnees })

    }



    render() {

        if (this.state.report === null) {
            return (
                <View style={styles.container}>
                    <Button onPress={() => this.fetchCompanies()} title="Rechercher" style={styles.button} />

                </View>
                /*<ActivityIndicator color={style.color} size="large"/>
                <Button onPress={() => this.localiser()} title="Localiser sur une carte" style={globalStyle.button}/>*/

            )
        } else {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
            return (
                <View style={styles.container}>
                    <View>
                        <Button onPress={() => this.fetchCompanies()} title="Nouvelle recherche" style={styles.button} />
                    </View>
                    <ListView
                        /* dataSource = {ds.cloneWithRows(this.state.report.list)}
                         renderRow = {(row, j, k)  => <WeatherRow day= {row} index={parseInt(k, 10)}/> }// => <Text>{JSON.stringify(rowData)}</Text>}
                        */
                        style={styles.list}
                        enableEmptySections={true}
                        dataSource={ds.cloneWithRows(this.state.companies)}
                        renderRow={(row) =>
                            <View style={styles.row} >
                                <View style={styles.rowInfos} >
                                    <Text style={styles.text}>nom: {row.nom}</Text>
                                    <Text style={styles.text}>domaine d'activité: {row.activite}</Text>
                                    <Text style={styles.text}>adresse : {row.adresse}</Text>
                                </View>

                                <View style={styles.iconsContainer}>
                                    <TouchableWithoutFeedback
                                        disabled={false}
                                       // style={{ height: 50 , width: 65 }}
                                        onPress={() => this.favOnRate(row)}>
                                        <Image style={styles.touchableImage}
                                            source={row.fav == true ? this.state.iconSelected : this.state.iconUnselected} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        disabled={false}
                                        //style={styles.touchable}
                                        onPress={() => this.clientOnRate(row)}>
                                        <Image style={ styles.touchableImage }
                                            source={row.client == true ? this.state.iconClientSelected : this.state.iconClientUnselected} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        disabled={false}
                                        //style={styles.touchable}
                                        onPress={() => this.localiseCompany(row, this.state.coordonnees)}>
                                        <Image style={styles.touchableImage}
                                            source={this.state.iconVisitedSelected} />
                                    </TouchableWithoutFeedback>

                                </View>
                            </View>

                        }
                    />

                    <View>

                        <Button onPress={() => this.localiseAllCompany()} title="Localiser toutes les entreprises" style={styles.button} />
                    </View>
                </View>

            )


        }


    }
}



const blue = '#487de4'
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 10,
        backgroundColor: '#CFD8DC',
        height: 600,
        //  paddingVertical: 10

    },
    text: {
        marginLeft: 5,
        marginRight: 5,
        color: '#0e2f44'
    },
    button: {
        width: 40,
        backgroundColor: blue,
        //color: '#FFFFFF',
        marginTop: 20,
        /* top: 0,
         left: 0*/
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
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5
    },
    list: {
        // bottom: 50,
        backgroundColor: '#C7ECF4'
    },
    row: {
        margin: 10,
        borderWidth: 2,
        borderColor: '#0f4c5c'
    },
    rowInfos: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
        //alignItems: 

    },
    buttonRow: {
        margin       : 5,
        width        : 200

    },
    headerTitle: {
        color        : '#FFF'
    },
    header: {
        backgroundColor: blue

    },
    touchable: {
        width       : 40,
        height      : 40
    },
  rowContainer : {
        elevation   : 3,
        flex        : 1,
        margin      : 10,
        padding     : 10,
        borderWidth : 2,
        borderColor : '#78909C'
  },
  touchableImage:{
      height: 30,
      width: 30
  }



});

const navigationOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
}

export default StackNavigator({

    Result: {
        screen: CompaniesList,
        navigationOptions
    },
    Map: {
        screen: Map,
        navigationOptions
    },
})
