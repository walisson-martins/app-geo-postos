import React, { Component } from 'react';
import { View } from 'native-base';
import database from '@react-native-firebase/database';
import { Dimensions, StyleSheet, ImageBackground, ScrollView, Image, TextInput, Button, Alert } from 'react-native';

export default class AlterarPostoUser extends Component {
    state = {
        parametrosPosto: '',
        alcool: "",
        gasolina: "",
        gasolinaAditivada: '',
        diesel: '',
        GNV: '',
        nomePosto: "",
        id: '',
        cpfCadastrante: '',
        latitude: '',
        longitude: '',
    }

    componentDidMount() {
        console.log(this.props.route.params.coords);
        this.setState({ parametrosPosto: this.props.route.params.coords });
        this.setState({ alcool: this.props.route.params.coords.alcool });
        this.setState({ gasolina: this.props.route.params.coords.gasolina });
        this.setState({ gasolinaAditivada: this.props.route.params.coords.gasolinaAditivada });
        this.setState({ diesel: this.props.route.params.coords.diesel });
        this.setState({ GNV: this.props.route.params.coords.GNV });
        this.setState({ nomePosto: this.props.route.params.coords.nome });
        this.setState({ id: this.props.route.params.coords.id });
        this.setState({ cpfCadastrante: this.props.route.params.coords.cpfCadastrante });
        this.setState({ latitude: this.props.route.params.coords.latitude });
        this.setState({ longitude: this.props.route.params.coords.longitude });

    }

    post_firebase = () => {
        if (this.state.nomePosto != "" && this.state.alcool != "" && this.state.gasolina != "" && this.state.gasolinaAditivada != "" && this.state.diesel != "" && this.state.GNV != "") {

            let feedback = {
                id: this.state.id,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                alcool: this.state.alcool,
                gasolina: this.state.gasolina,
                gasolinaAditivada: this.state.gasolinaAditivada,
                diesel: this.state.diesel,
                GNV: this.state.GNV,
                nome: this.state.nomePosto,
                cpfCadastrante: this.state.cpfCadastrante,
                dataHora: new Date().toDateString() + ' ' + new Date().toTimeString().split(' ')[0],
            }

            let dbRef = database().ref(`postos/${this.state.id}`)
            dbRef.set({ ...feedback }).then((data) => {
                this.props.navigation.pop();
                Alert.alert(' ', 'Dados alterados!');
            }).catch((error) => {
                console.log('error ', error)
            })
        } else {
            Alert.alert(' ', ' Preencha todos os campos corretamente!');
        }
    }

    render() {
        return (
            <>
                <ImageBackground style={styles.bgColor} style={styles.container} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk6-nEP8l5mX_s2VpxKg-DcoNJcwkWCX3wKg&usqp=CAU" }}>
                    <ScrollView>
                        <View style={styles.posicaoFoto}>
                            <ImageBackground style={styles.logoPosto} source={{ uri: 'https://image.flaticon.com/icons/png/512/784/784867.png' }} />
                        </View>
                        <View style={styles.containerPrincipal}>
                            <View style={styles.container}>
                                <View style={styles.inputMain}>
                                    <Image style={styles.inputIcon} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc56LE7pdQzoPsGP31r2oWFHLvBpLRyxnULA&usqp=CAU' }} />
                                    <TextInput style={styles.inputs}
                                        placeholder='Nome do posto'
                                        keyboardType="default"
                                        value={this.state.nomePosto}
                                        onChangeText={text => this.setState({ nomeDoPosto: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.containerBtn}>
                                <View style={styles.inputSegundario}>
                                    <Image style={styles.inputIcon} source={{ uri: 'https://images.vexels.com/media/users/3/149825/isolated/preview/22c2afdb0d5ea0fd814aaea28c6c80c8---cone-do-tanque-de-gasolina-by-vexels.png' }} />
                                    <TextInput style={styles.inputs}
                                        placeholder='Preço gasolina'
                                        keyboardType="numeric"
                                        value={this.state.gasolina}
                                        onChangeText={text => this.setState({ gasolina: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.ctnGasolinaAditivada}>
                                <View style={styles.inputGasolinaAditivada}>
                                    <Image style={styles.inputIcon} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFjBY2xXIz4eyv2CWYCfklaBV9rn4R8e1dA&usqp=CAU' }} />
                                    <TextInput style={styles.inputs}
                                        placeholder='Preço gasolina aditivada'
                                        keyboardType="numeric"
                                        value={this.state.gasolinaAditivada}
                                        onChangeText={text => this.setState({ gasolinaAditivada: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.containerSegundario}>
                                <View style={styles.inputSegundario}>
                                    <Image style={styles.inputIcon} source={{ uri: 'https://image.flaticon.com/icons/png/512/2720/2720273.png' }} />
                                    <TextInput style={styles.inputs}
                                        placeholder='Preço alcool'
                                        keyboardType="numeric"
                                        value={this.state.alcool}
                                        onChangeText={text => this.setState({ alcool: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.ctnGasolinaDiesel}>
                                <View style={styles.inputSegundario}>
                                    <Image style={styles.inputIcon} source={{ uri: 'https://image.flaticon.com/icons/png/512/1284/1284508.png' }} />
                                    <TextInput style={styles.inputs}
                                        placeholder='Preço diesel'
                                        keyboardType="numeric"
                                        value={this.state.diesel}
                                        onChangeText={text => this.setState({ diesel: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.btnGNV}>
                                <View style={styles.inputSegundario}>
                                    <Image style={styles.inputIcon} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDF7SkNdHT9ZupwaX97SVcw0GqfAIlwXnTBw&usqp=CAU' }} />
                                    <TextInput style={styles.inputs}
                                        placeholder='Preço GNV'
                                        keyboardType="numeric"
                                        value={this.state.GNV}
                                        onChangeText={text => this.setState({ GNV: text })}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Button style={styles.btnSalvar}
                        title="Salvar"
                        onPress={() => { this.post_firebase(); console.log('Simple Button pressed') }}
                    />
                </ImageBackground>
            </>
        )
    }
}

const styles = StyleSheet.create({
    containerPrincipal: {
        margin: 150,
        marginLeft: 0,
    },
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    inputMain: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: Dimensions.get('window').width,
        marginBottom: 20,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputSegundario: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 150,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputGasolinaAditivada: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 200,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ctnGasolinaAditivada: {
        position: 'absolute',
        left: 160,
        top: 96,
    },
    ctnGasolinaDiesel: {
        position: 'absolute',
        left: 170,
        top: 160,
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
    btnHidden: {
        width: 0,
        height: 0,
    },
    posicaoFoto: {
        marginBottom: 15,
    },
    logoPosto: {
        height: 140,
        width: 140,
        marginBottom: 20,
        position: 'absolute',
        left: 110,
        top: 30,
    },
    btnGNV: {
        position: "absolute",
        left: 90,
        top: 220,
    }
});