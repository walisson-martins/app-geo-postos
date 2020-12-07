import React, { Component, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, TouchableOpacity, StatusBar, Dimensions, ToastAndroid, Image, BackHandler, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Text, Button, Toast } from "native-base";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';

export default class Index extends Component {

    state = {
        coords: { latitude: 0, longitude: 0, latitudeDelta: 0.015, longitudeDelta: 0.0121, },
        addMarker: false,
        userid: 123,
        data: '',
        postosDataBase: [],
        mostrarAdicionarPostos: false,
        atualizar: true,
        modalVisible: false,
        currentPosto: '',
    }

    UNSAFE_componentWillReceiveProps(et) {
        console.log(et.route.params.logoff);
        global.usuario == null ? this.setState({ mostrarAdicionarPostos: et.route.params.logoff }) : this.setState({ mostrarAdicionarPostos: et.route.params.logoff })
    }

    async componentDidMount() {
        // console.log(' DATA ==== ' + new Date().toLocaleDateString('en-GB').trim() + ' ' + new Date().toTimeString().split(' ')[0],);

        global.usuario == null ? this.setState({ mostrarAdicionarPostos: false }) : this.setState({ mostrarAdicionarPostos: true })
        let myCoords = {};
        Geolocation.getCurrentPosition((info) => {
            myCoords.latitude = info.coords.latitude;
            myCoords.longitude = info.coords.longitude;
            myCoords.latitudeDelta = 0.015;
            myCoords.longitudeDelta = 0.0121;
            this.setState({ coords: myCoords });
        });

        let dbRef = database().ref(`postos`)
        this.listenerFirebase(dbRef);
        this.backHandler();
    }

    componentWillUnmount() {
        global.usuario = null;
        this.setState({ coords: '' });
    }

    listenerFirebase(dbRef) {
        dbRef.on("value", dataSnapshot => {
            var posto = [];
            dataSnapshot.forEach(child => {
                posto.push(child);
            });
            this.setState({ postosDataBase: posto });
        });
    }

    adicionandoPosto() {
        ToastAndroid.showWithGravityAndOffset(
            "Precione longamente o marcador, e arraste para o local certo. Em seguida, clique sobre ele.",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50
        );
        this.setState({ addMarker: true });
    }

    verificarUsuarioENavegar() {
        if (global.usuario != null) {
            this.props.navigation.navigate('Menu');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    mostrarPostos = () => (
        this.state.postosDataBase.map((posto, index) => {
            let coords = { ...JSON.parse(JSON.stringify(posto)) };
            if (coords.latitude != undefined) {
                return (
                    <Marker
                        coordinate={coords} key={index}
                        onPress={() => {
                            this.setState({ currentPosto: posto });
                            this.setState({ modalVisible: true });
                        }}
                    >
                        <Image style={styles.marcador} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/point-of-interest-1/96/gas_station-512.png' }} />
                    </Marker>
                )
            }
        })
    )

    backHandler = () => {
        console.log('Adicionnao evento de back');
        BackHandler.addEventListener("hardwareBackPress", () => {
            this.setState({ atualizar: true })
        })
    };

    render() {

        return (
            <>
                <StatusBar hidden={true}></StatusBar>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.mapStyle}
                        region={this.state.coords}
                        zoomEnabled={true}
                    >
                        <Marker
                            coordinate={this.state.coords}
                        />
                        {/* adicionando postos do banco */}
                        {this.mostrarPostos()}

                        {/* adicionando marcador */}
                        {this.state.addMarker ? (
                            <Marker draggable
                                coordinate={this.state.coords}
                                onDragEnd={(e) => { this.setState({ coords: { ...e.nativeEvent.coordinate, latitudeDelta: 0.015, longitudeDelta: 0.0121 } }); }}
                                onPress={() => { this.props.navigation.navigate('CadastrarPosto', { coords: this.state.coords }); this.setState({ addMarker: false }) }}
                            >
                                <Image style={styles.marcador} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/point-of-interest-1/96/gas_station-512.png' }} />
                            </Marker>
                        ) : (<View />)}
                    </MapView>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {

                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                <Image style={styles.btnModal} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMlnCswSkyMPebDHSw-a09oKzcRcCfUvT-A&usqp=CAU' }} />
                                Nome posto: {JSON.parse(JSON.stringify(this.state.currentPosto)).nome}</Text>
                            <Text style={styles.modalText}>
                                <Image style={styles.btnModal} source={{ uri: 'https://images.vexels.com/media/users/3/151307/isolated/preview/b4b009c6c791f8dced461e75c11cec60-ilustra----o-do-tanque-de-gasolina-by-vexels.png' }} />
                                Gasolina: R$ {JSON.parse(JSON.stringify(this.state.currentPosto)).gasolina + '   '}
                                <Image style={styles.btnModal} source={{ uri: 'data:image/png;base64,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' }} />
                            Aditivada: R$ {JSON.parse(JSON.stringify(this.state.currentPosto)).gasolinaAditivada} </Text>
                            <Text style={styles.modalText}>
                                <Image style={styles.btnModal} source={{ uri: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/ethanol-2753893-2287568.png' }} />
                                Álcool: R$ {JSON.parse(JSON.stringify(this.state.currentPosto)).alcool + '   '}
                                <Image style={styles.btnModal} source={{ uri: 'https://previews.123rf.com/images/ruslanraqimov/ruslanraqimov1909/ruslanraqimov190900037/132057572-vector-diesel-fuel-pump-silhouette.jpg' }} />
                            Diesel: R${JSON.parse(JSON.stringify(this.state.currentPosto)).diesel}   </Text>
                            <Text style={styles.modalText}>
                                <Image style={styles.btnModal} source={{ uri: 'https://alphagasnatural.files.wordpress.com/2013/09/cilindros-gnv.jpg' }} />
                                GNV: R$ {JSON.parse(JSON.stringify(this.state.currentPosto)).GNV}</Text>
                            <Text style={styles.modalText}>Data/Hora: {JSON.parse(JSON.stringify(this.state.currentPosto)).dataHora}</Text>
                            <TouchableHighlight
                                style={styles.openButton} //...styles.openButton,
                                onPress={() => {
                                    this.setState({ modalVisible: false })
                                }}
                            >
                                <Text style={styles.textStyle}>X</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={{ width: 50, height: 50, top: -480, left: 10 }} onPress={() => { this.verificarUsuarioENavegar(); }} >
                    <ImageBackground
                        style={styles.botaoMenu}
                        source={{ uri: 'https://image.flaticon.com/icons/png/512/13/13838.png' }} />
                </TouchableOpacity>

                {/* validação de usuario para poder mostrar o botao de adicionar postos */}
                {this.state.mostrarAdicionarPostos ? (
                    <TouchableOpacity style={{ width: 50, height: 50, bottom: 40, right: -280 }} onPress={() => {
                        this.adicionandoPosto()
                    }}>
                        <ImageBackground
                            style={styles.adicionarPosto}
                            source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/12/16/32/gasoline-pump-151115_960_720.png' }} />
                    </TouchableOpacity>
                ) : (
                        <View></View>
                    )}
            </>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        position: "relative",
        top: 0,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        right: 0,
        top: 5,
        position: "absolute",
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 0,
        textAlign: "center",
        fontSize: 12,
    },
    botaoMenu: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 10,
        position: "absolute",
    },
    botaoMenuAdm: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 10,
        position: "relative",
    },
    adicionarPosto: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 10,
        position: "absolute",
    },
    marcador: {
        width: 50,
        height: 50,
    },

    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: "relative",
    },

    mapStyle: {
        ...StyleSheet.absoluteFillObject,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    btnModal: {
        width: 15,
        height: 15,
        margin: 10,
        borderRadius: 10,
        position: "absolute",
    },
});