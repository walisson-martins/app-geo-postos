import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Linking } from 'react-native';
import { Searchbar } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { ListItem, Thumbnail, Button, Text } from 'native-base';

export default class FiltrarPostos extends Component {
    state = {
        DATA: '',
        search: '',
        filteredDataSource: '',
        masterDataSource: '',
    }
    async componentDidMount() {
        let dbRef = database().ref(`postos`)
        dbRef.on("value", dataSnapshot => {
            var posto = [];
            dataSnapshot.forEach(child => {
                posto.push(child);
            });
            this.setState({ DATA: posto });
            this.setState({ filteredDataSource: posto })
            this.setState({ masterDataSource: posto });
        });
    }

    componetWillUnmont() {
        database().ref(`postos`).off('value');
    }

    renderItem = function ({ item }) {
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
                    <Text style={styles.divisao}>Latitude:  {item.latitude}</Text>
                    <Text style={styles.divisao}>Longitude: {item.longitude}</Text>
                    <Button style={styles.btnButton}
                        onPress={() => Linking.openURL(`https://www.google.com.br/maps/@${item.latitude},${item.longitude},16z?hl=pt-BR`)}><Text>Navegar para posto</Text></Button>
                </ListItem>
            </View>
        );
    }

    searchFilterFunction = function (text) {
        if (text) {
            const newData = this.state.masterDataSource.filter(function (item) {
                item = JSON.parse(JSON.stringify(item))
                const itemData = item.nome ? item.nome.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            this.setState({ search: text })
            this.setState({ filteredDataSource: newData })
        } else {
            this.setState({ search: text })
            this.setState({ filteredDataSource: this.state.masterDataSource })
        }
    };

    render() {
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
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            onClear={(text) => this.searchFilterFunction('')}
                            value={this.state.search}
                            inputStyle={{
                                borderRadius: 30,
                            }}
                        />
                    </View>

                    <FlatList
                        data={this.state.filteredDataSource}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => (JSON.parse(JSON.stringify(item)).id).toString()}

                    />
                </View>
            </>
        )
    }
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
        flexDirection: 'column',
        // fontSize: 50,
    },
    campoFiltro: {
        margin: 10,
    },
    divisao: {
        fontSize: 12,
    }
});