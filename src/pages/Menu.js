import React, { Component } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, StatusBar, Dimensions, Image } from 'react-native';
import { Card, CardItem, Left, Body, Thumbnail } from 'native-base';

export default class Menu extends Component {
    state = {
        visible: false,
    }

    encerraSessao() {
        global.usuario = null;
        global.base64 = '';
        this.props.navigation.navigate('Index', { logoff: false });
    }

    render() {
        return (
            <>
                <StatusBar hidden={true}></StatusBar>
                <ImageBackground style={styles.bgColor} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6-nEP8l5mX_s2VpxKg-DcoNJcwkWCX3wKg&usqp=CAU" }}>
                    <View style={styles.menu}>
                        <Text style={styles.menuTexto} >Menu</Text>

                        {global.base64 != '' ? (<Image style={{ width: 105, height: 70, borderRadius: 50, position: 'absolute', left: 125, top: 10 }} source={{ uri: global.base64 }} />) : (<View></View>)}
                        <TouchableOpacity onPress={() => {
                            this.setState({ visible: true });
                            this.props.navigation.navigate('Perfil');
                        }}>
                            <Card style={styles.direcao}>
                                <CardItem style={styles.fundoCardEspecial} >
                                    <Left>
                                        <Thumbnail source={{ uri: 'https://iconsetc.com/icons-watermarks/flat-circle-white-on-orange/raphael/raphael_customer/raphael_customer_flat-circle-white-on-orange_512x512.png' }} />
                                        <Body >
                                            <Text style={styles.corTexto} >Perfil</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.setState({ visible: true });
                            this.props.navigation.navigate('Index');
                        }}>
                            <Card style={styles.direcao}>
                                <CardItem style={styles.fundoCardEspecial}>
                                    <Left>
                                        <Thumbnail source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsXqfdCw7C4jKGJG3BrhIX8DpQyhHpSjGIxQ&usqp=CAU' }} />
                                        <Body>
                                            <Text style={styles.corTexto}>Adicionar posto</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.setState({ visible: true });
                            this.props.navigation.navigate('ListarPostos');
                        }}>
                            <Card style={styles.direcao}>
                                <CardItem style={styles.fundoCardFinal} >
                                    <Left>
                                        <Thumbnail source={{ uri: 'https://images.vexels.com/media/users/3/147104/isolated/preview/f6fa8014ab7b09a98c62064c76600008-bot--o-de-pesquisa-do-instagram-by-vexels.png' }} />
                                        <Body>
                                            <Text style={styles.corTexto}>Listar postos</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.setState({ visible: true });
                            this.encerraSessao();
                        }}>
                            <Card style={styles.direcao}>
                                <CardItem style={styles.fundoCardFinal}>
                                    <Left>
                                        <Thumbnail source={{ uri: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-logout-icon-png-image_4233257.jpg' }} />
                                        <Body>
                                            <Text style={styles.corTexto}>Sair</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    btnMenu: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 100,
    },
    adicionarPosto: {
        width: 50,
        height: 50,
        top: 420,
        left: 280,
        margin: 10,
        borderRadius: 100,
    },
    menu: {
        padding: 10,
        marginTop: 30,
        fontStyle: "normal",
    },
    direcao: {
        flex: 0,
    },
    fundoCardEspecial: {
        backgroundColor: "#8B4513",
    },
    bgColor: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    corTexto: {
        color: "#FFF",
    },
    fundoCardFinal: {
        backgroundColor: '#8B4513',

    }, menuTexto: {
        color: "#FFF",
        left: 120,
        paddingBottom: 30,
        fontSize: 40,
    }
});