import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, Button, Image, ImageBackground, Alert, Dimensions } from 'react-native';
import { Label, Toast } from 'native-base';
import { Divider } from 'react-native-paper';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
    state = {
        visible: false,
        email: '',
        senha: '',
    }

    buscaFirebase() {
        let emailErrado = false;
        let senhaErrada = false;

        if (this.state.email != '' && this.state.senha != '') {
            let dbRef = database().ref(`usuarios`)
            dbRef.on("value", dataSnapshot => {
                dataSnapshot.forEach(usuario => {
                    if (JSON.parse(JSON.stringify(usuario)).email === this.state.email && JSON.parse(JSON.stringify(usuario)).senha === this.state.senha) {
                        this.gravaMemoriaCeular(JSON.stringify(usuario));
                        global.usuario = JSON.stringify(usuario);
                        this.props.navigation.navigate('Index', { logoff: true });
                    } else {
                        if (JSON.parse(JSON.stringify(usuario)).email === this.state.email) emailErrado = true;
                        if (JSON.parse(JSON.stringify(usuario)).senha === this.state.senha) senhaErrada = true;
                    }
                });
                if (global.usuario == null) {
                    if (!emailErrado && !senhaErrada) {
                        Alert.alert('', 'Verifique seu E-mail e senha, dados não encontrados.');
                    } else if (!emailErrado) {
                        Alert.alert('', 'Verifique seu E-mail, usuário não encontrados.');
                    } else if (!senhaErrada) {
                        Alert.alert('', 'Senha incorreta.');
                    }
                }
            })
        } else {
            Alert.alert('', 'É necessário preencher os campos E-mail e Senha');
        }


    }

    gravaMemoriaCeular = async (objeto) => {
        try {
            await AsyncStorage.setItem('usuario', objeto);
        } catch (error) {
            console.log('erro ao tentar salvar no storage: ' + error);
        }
    };

    render() {

        return (
            <>
                <StatusBar hidden={true}></StatusBar>
                <ImageBackground style={styles.bgColor} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6-nEP8l5mX_s2VpxKg-DcoNJcwkWCX3wKg&usqp=CAU" }}>
                    <View style={styles.container}>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{ uri: 'https://i.pinimg.com/474x/ee/c9/7f/eec97f7f050b0101897a0028a5bc1106.jpg' }} />
                            <Label>E-mail</Label>
                            <TextInput style={styles.inputs}
                                placeholder="@gmail.com"
                                keyboardType="email-address"
                                name='email'
                                onChangeText={
                                    email => this.setState({ email })
                                }
                            />

                        </View>

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={{ uri: 'https://listimg.pinclipart.com/picdir/s/203-2033374_password-svg-png-icon-free-download-reset-password.png' }} />
                            <Label>Senha</Label>
                            <TextInput style={styles.inputs}
                                placeholder="xxxxxxx"
                                name='senha'
                                secureTextEntry={true}
                                onChangeText={
                                    senha => this.setState({ senha })
                                }
                            />
                        </View>
                        <View style={styles.containerBtn}>
                            <View style={styles.botaoEntrar}>
                                <Button
                                    onPress={() => { this.buscaFirebase() }}
                                    title="ENTRAR"
                                    color="primary"
                                    accessibilityLabel="Botão de entrar no sistema"
                                />
                            </View>
                            <View style={styles.botaoCadastrar}>
                                <Button
                                    title="CADASTRAR"
                                    color="primary"
                                    accessibilityLabel="Botão de entrar no sistema"
                                    onPress={() => { this.props.navigation.navigate('CadastrarUsuario') }}
                                />
                            </View>
                        </View>
                        <Text style={styles.recuperarSenha} onPress={() => {
                            this.props.navigation.navigate('RecuperarSenha');
                        }
                        }>
                            Esqueceu a senha?
                </Text>

                        <Text style={styles.gmail} >
                            Entre com o GMAIL
                        </Text>


                        <Divider />

                        <TouchableOpacity style={{ position: 'absolute', top: 400, left: 120 }} onPress={async () => {
                            console.log('clicado no Gmail')
                            //this.props.navigation.navigate('');
                        }}>
                            <View style={styles.posicaoFoto}>
                                <Image style={styles.inputIconGmail} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Gmail_2020.png' }} />
                            </View>
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
        alignItems: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    inputIconGmail: {
        width: 80,
        height: 60,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    logoUsuario: {
        position: "relative",
        margin: 20,
        height: 50,
        width: 50,
        borderRadius: 30,
    },
    bgColor: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    recuperarSenha: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#87cefa',
        textDecorationLine: "none"
    },
    gmail: {
        top: 90,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        textDecorationLine: "none"
    },
    botaoEntrar: {
        marginTop: 10,
    },
    botaoCadastrar: {
        marginTop: 10,
    },
    containerBtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    posicaoFoto: {
        marginBottom: 15,
    },
});
