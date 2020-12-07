import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Text, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';

import FiltrarPostos from './FiltrarPostos';
import AlterarPosto from './AlterarPosto';
// import AlterarPostoUser from './AlterarPostoUser';

export default class ListarPostos extends Component {
    render() {
        return (
            <>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading={<TabHeading><Icon name="navigate" /><Text>Listar postos</Text></TabHeading>}>
                        <FiltrarPostos />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="shuffle" /><Text>Alterar postos</Text></TabHeading>}>
                        <AlterarPosto />
                    </Tab>
                </Tabs>
            </>
        )
    }
}

const styles = StyleSheet.create({
    posicaoFiltro: {
        flex: 1,
        position: 'absolute',
    },
});