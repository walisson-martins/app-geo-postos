import { Form } from 'native-base';
import React, { Component } from 'react';
import { View, TextInput, Button, Image, ImageBackground, Alert, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import database from '@react-native-firebase/database';

export default class RecuperarSenha extends Component {
    state = {
        email: '',
        senha: '',
        novaSenha: '',
        cpf: '',
    }

    recuperaSenha() {
        if (this.state.email != "" && this.state.senha != "" && this.state.novaSenha != "") {
            let currentUsuario = null;

            let dbRef = database().ref(`usuarios`)
            dbRef.on("value", dataSnapshot => {
                dataSnapshot.forEach(usuario => {
                    if (JSON.parse(JSON.stringify(usuario)).email === this.state.email) {
                        currentUsuario = usuario;
                        this.setState({ cpf: JSON.parse(JSON.stringify(usuario)).cpf })
                    }
                });

                if (currentUsuario) {
                    if (this.state.senha === this.state.novaSenha) {
                        // //alterar no firebase
                        this.atualizarSenha(this.state.senha);
                        Alert.alert('', 'Senha alterada!');
                        this.props.navigation.pop();
                    } else {
                        Alert.alert(" ", 'A confirmação da nova senha está diferente da senha informada!');
                    }
                } else {
                    Alert.alert(" ", 'Usuário não encontrado!');
                }
            })
        } else {
            Alert.alert(" ", 'Preencha todos os campos.');
        }
    }

    atualizarSenha = async (alteracao) => {
        let dbRef = database().ref(`usuarios/${this.state.cpf}`);
        dbRef.update({ senha: alteracao })
            .then(() => console.log('Data updated.'));
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
                <ImageBackground style={styles.bgColor} style={styles.container} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6-nEP8l5mX_s2VpxKg-DcoNJcwkWCX3wKg&usqp=CAU" }}>
                    <Form >
                        <View style={styles.container}>
                            <View style={styles.posicaoFoto}>
                                <ImageBackground style={styles.logoSenha} source={{ uri: 'https://cdn2.iconfinder.com/data/icons/mix-color-5/100/Mix_color_5__lock-16-512.png' }} />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://i.pinimg.com/474x/ee/c9/7f/eec97f7f050b0101897a0028a5bc1106.jpg' }} />
                                {/* <Label>Email: </Label> */}
                                <TextInput style={styles.inputs}
                                    name="email"
                                    placeholder="E-mail @"
                                    keyboardType="email-address"
                                    onChangeText={
                                        email => this.setState({ email })
                                    }
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://img2.gratispng.com/20180806/ezl/kisspng-clip-art-christmas-microsoft-powerpoint-openclipar-5b68fda6d83026.2932760915336073348855.jpg' }} />
                                <TextInput style={styles.inputs}
                                    name="senha"
                                    placeholder="Nova Senha"
                                    secureTextEntry={true}
                                    onChangeText={
                                        senha => this.setState({ senha })
                                    }
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/secured-connection-1839522-1560700.png' }} />
                                <TextInput style={styles.inputs}
                                    name="novaSenha"
                                    placeholder="Confirmar nova senha"
                                    secureTextEntry={true}
                                    onChangeText={
                                        novaSenha => this.setState({ novaSenha })
                                    }
                                />
                            </View>

                            <View style={styles.botaoEntrar}>
                                <Button
                                    onPress={() => {
                                        this.recuperaSenha();
                                    }}
                                    title="Salvar"
                                    color="primary"
                                    accessibilityLabel="Botão de entrar no sistema"
                                />
                            </View>
                        </View>
                    </Form>
                </ImageBackground>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    logoSenha: {
        height: 140,
        width: 140,
        marginBottom: 20,
    },
    botaoEntrar: {
        marginTop: 10,
    },
    posicaoFoto: {
        marginBottom: 15,
    },
    bgColor: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});