import React, { Component } from 'react';
import { View, TextInput, Button, Image, ImageBackground, Alert, StyleSheet, Dimensions } from "react-native";
import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class CadastrarUsuario extends Component {
    state = {
        nome: '',
        email: '',
        endereco: '',
        cpf: '',
        telefone: '',
        senha: '',
    }

    gravaFirebase = async () => {
        var usuarios = {
            nome: this.state.nome,
            email: this.state.email,
            endereco: this.state.endereco,
            cpf: this.state.cpf,
            telefone: this.state.telefone,
            senha: this.state.senha,
        }        
        this.gravaMemoriaCeular(usuarios)//recebe um objeto json
        let dbRef = database().ref(`usuarios/${this.state.cpf}`);
        dbRef.set({ ...usuarios }).then((data) => {
            console.log('firebase enviado');
            global.usuario = JSON.stringify(usuarios);
            this.buscaFirebase();
        }).catch((error) => {
            console.log('error firebase ', error)
        })
    }

    gravaMemoriaCeular = async (objeto) => {
        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(objeto));
        } catch (error) {
            console.log('erro ao tentar salvar no storage: ' + error);
        }
        this.consultaMemoriaCelular();
    };

    consultaMemoriaCelular = async () => {
        try {
            const value = await AsyncStorage.getItem('usuario');
            if (value !== null) {
                // We have data!!
                console.log('CONSULTANDO na memoria do celular: ' + value);
            }
        } catch (error) {
            Alert.alert('', 'Erro ao salvar no banco');
        }
    };


    atualizarSenha = async (alteracao) => {
        let dbRef = database().ref(`usuarios/${this.state.cpf}`);
        dbRef.update({ senha: alteracao })
            .then(() => console.log('Data updated.'));
    }

    buscaFirebase() {
        let dbRef = database().ref(`usuarios/${this.state.cpf}`)
        dbRef.on("value", dataSnapshot => {
            console.log('consultando cadastro no firebase:')
            console.log(dataSnapshot)
        });
    }

    render() {
        return (
            <>
                <ImageBackground style={styles.bgColor} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6-nEP8l5mX_s2VpxKg-DcoNJcwkWCX3wKg&usqp=CAU" }}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Image style={styles.logoUsuario} source={{ uri: 'https://www.freeiconspng.com/uploads/user-add-icon---shine-set-add-new-user-add-user-30.png' }} />
                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc56LE7pdQzoPsGP31r2oWFHLvBpLRyxnULA&usqp=CAU' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="Nome"
                                    keyboardType="default"
                                    maxLength={50}
                                    onChangeText={text => this.setState({ nome: text })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/TK_email_icon.svg/600px-TK_email_icon.svg.png' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="E-mail @"
                                    keyboardType="email-address"
                                    onChangeText={text => this.setState({ email: text })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://w7.pngwing.com/pngs/583/119/png-transparent-computer-icons-map-desktop-wallpaper-map-address.png' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="Endereço: "
                                    keyboardType="name-phone-pad"
                                    onChangeText={text => this.setState({ endereco: text })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://png.pngtree.com/png-clipart/20190630/original/pngtree-cpf-file-document-icon-png-image_4166624.jpg' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="CPF"
                                    keyboardType="numeric"
                                    onChangeText={text => this.setState({ cpf: text })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://png.pngtree.com/png-clipart/20200709/original/pngtree-phone-icon-png-image_1163134.jpg' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="Telefone"
                                    keyboardType="phone-pad"
                                    onChangeText={text => this.setState({ telefone: text })}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Image style={styles.inputIcon} source={{ uri: 'https://w7.pngwing.com/pngs/561/120/png-transparent-computer-icons-password-unlocking-share-icon-symbol-password.png' }} />
                                <TextInput style={styles.inputs}
                                    placeholder="Senha"
                                    keyboardType="name-phone-pad"
                                    secureTextEntry={true}
                                    onChangeText={text => this.setState({ senha: text })}
                                />
                            </View>

                            <View style={styles.botaoCadastrar}>
                                <Button
                                    title="CADASTRAR"
                                    color="primary"
                                    accessibilityLabel="Botão de entrar no sistema"
                                    onPress={() => {
                                        if (this.state.nome != '' && this.state.email != '' && this.state.endereco != '' && this.state.dtNascimento != '' && this.state.telefone != '' && this.state.senha != '') {
                                            this.gravaFirebase();
                                            this.props.navigation.navigate('Login');
                                            Alert.alert(
                                                "",
                                                "Dados cadastrados com sucesso!",
                                            )
                                        } else {
                                            Alert.alert("  ", 'Todos os campos são obrigatórios')
                                        }

                                    }} />
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </>
        )
    }
}

const styles = StyleSheet.create({
    textoh1: {
        textAlign: "center",
        color: "#fff",
        textTransform: "uppercase",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },
    bgColor: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
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
        height: 150,
        width: 150,
    },
    recuperarSenha: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#87cefa',
        textDecorationLine: "none"
    },
    botaoEntrar: {
        marginTop: 10,
    },
    botaoCadastrar: {
        marginBottom: 60,
    },
    posicaoFoto: {
        marginBottom: 15,
    },
});