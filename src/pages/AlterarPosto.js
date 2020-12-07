import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Linking, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { ListItem, Thumbnail, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function AlterarPosto() {
    const navigation = useNavigation();
    const [DATA, setData] = useState('');
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState('');
    const [masterDataSource, setMasterDataSource] = useState('');

    useEffect(() => {
        let dbRef = database().ref(`postos`)
        dbRef.on("value", (dataSnapshot) => {
            var posto = [];
            dataSnapshot.forEach((child, index) => {
                if (JSON.parse(JSON.stringify(child)).cpfCadastrante === JSON.parse(global.usuario).cpf) {
                    posto.push(child);
                }
            });
            setData(posto);
            setFilteredDataSource(posto);
            setMasterDataSource(posto);
        });
    }, []);

    // state = {
    //     DATA: '',
    //     search: '',
    //     filteredDataSource: '',
    //     masterDataSource: '',
    // }

    // UNSAFE_componentWillReceiveProps(et) {
    //     console.log('olha: ' + et);
    // }

    // async componentDidMount() {
    // console.log(this.props);
    // let dbRef = database().ref(`postos`)
    // dbRef.on("value", dataSnapshot => {
    //     var posto = [];
    //     dataSnapshot.forEach((child, index) => {
    //         if (JSON.parse(JSON.stringify(child)).cpfCadastrante === JSON.parse(global.usuario).cpf) {
    //             posto.push(child);
    //             console.log(index)
    //         }
    //     });
    //     setData(posto );
    //     setFilteredDataSource(posto)
    //     // this.setState({ filteredDataSource: posto })
    //     // this.setState({ masterDataSource: posto })
    //     setMasterDataSource(posto)
    // });
    // }

    // excluirPosto = async function (item) {
    //     await database()
    //         .ref(`postos/${item.id}`)
    //         .remove();
    // }


    const renderItem = ({ item }) => {
        item = JSON.parse(JSON.stringify(item));
        return (
            <View>
                <ListItem style={styles.listagemItem}>
                    <Thumbnail style={styles.thunbnail} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVsw3c1P-cgvt7afjOOAlCR1rLumUp_fFCtg&usqp=CAU' }} />
                    <Text style={styles.divisao}>Nome do posto: {item.nome}</Text>
                    <Text style={styles.divisao}>Gasolina: R$ {item.gasolina}</Text>
                    <Text style={styles.divisao}>Gasolina aditivada: R$ {item.gasolinaAditivada}</Text>
                    <Text style={styles.divisao}>Álcool: R$ {item.alcool} Diesel: {item.diesel}</Text>
                    <Text style={styles.divisao}>GNV: R$ {item.GNV}</Text>

                    <TouchableOpacity style={{ position: 'absolute', left: 245, top: 60 }} onPress={() => { navigation.navigate('AlterarPostoUser', { coords: item }); }}>
                        <ImageBackground
                            style={styles.btn}
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJr6svtesvK3N-WYoGgnO7POdbA3cLqYfgA&usqp=CAU' }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ position: 'absolute', left: 280, top: 60 }} onPress={async () => {
                        await database().ref(`postos/${item.id}`).remove();
                        Alert.alert("  ", 'Posto removido com sucesso!')
                    }}>
                        <ImageBackground
                            style={styles.btn}
                            source={{ uri: 'https://freepikpsd.com/wp-content/uploads/2019/10/delete-icon-png-8-Transparent-Images.png' }} />
                    </TouchableOpacity>
                </ListItem>
            </View>
        )
    }

    const searchFilterFunction = function (text) {
        if (text) {
            const newData = masterDataSource.filter(function (item) {
                // console.log(JSON.parse(JSON.stringify(item)).nome)
                item = JSON.parse(JSON.stringify(item))
                const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            // this.setState({ search: text })
            setSearch(text)
            // this.setState({ filteredDataSource: newData })
            setFilteredDataSource(newData)
        } else {
            // this.setState({ search: text })
            setSearch(text)
            // this.setState({ filteredDataSource: this.state.masterDataSource })
            setFilteredDataSource(masterDataSource)
        }
    };

    // render() {
    return (
        <>
            <View style={styles.lista}>
                <View style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                    <Searchbar
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderRadius: 30,
                            height: 50,
                            width: 330
                        }}
                        placeholder="Consultar postos"
                        onChangeText={(text) => searchFilterFunction(text)}
                        onClear={(text) => searchFilterFunction('')}
                        value={search}
                        inputStyle={{
                            borderRadius: 30,
                        }}
                    />
                </View>

                <FlatList
                    data={filteredDataSource}
                    renderItem={renderItem}
                    keyExtractor={(item) => (JSON.parse(JSON.stringify(item)).id).toString()}
                />
            </View>
        </>
    )
    // }
}

const styles = StyleSheet.create({
    lista: {
        flex: 1,
        justifyContent: 'center',
    },
    btnButton: {
        left: 60,
    },
    thunbnail: {
        position: 'absolute',
        left: 10,
        top: 20
    },
    listagemItem: {
        flexDirection: 'column'
    },
    campoFiltro: {
        margin: 10
    },
    divisao: {
        fontSize: 12,
    },
    inputIconGmail: {
        width: 80,
        height: 60,
        marginLeft: 15,
        justifyContent: 'center'
    },
    btn: {
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: 10,
    },
})