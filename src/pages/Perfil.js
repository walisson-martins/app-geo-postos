import React, { Component } from 'react';
import {
    StyleSheet, StatusBar, TouchableOpacity, View, PermissionsAndroid,
} from 'react-native';
import {
    Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Badge, ImageBackground,
} from 'native-base';
import { Button } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';

export default class Perfil extends Component {
    state = {
        usuario: '',
        visible: false,
        camera: null,
        showCamera: false,
        URIPicture: '',
    };

    componentDidMount() {
        this.setState({ usuario: JSON.parse(global.usuario) });
    }

    mostrarCamera = function () {
        this.setState({ showCamera: true });
    };

    takePicture = async function () {
        const grantedRead = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        const grantedWrite = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (
            this.camera &&
            grantedRead === PermissionsAndroid.RESULTS.GRANTED &&
            grantedWrite === PermissionsAndroid.RESULTS.GRANTED
        ) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ URIPicture: data.base64 });
            this.setState({ showCamera: false });
            global.base64 = 'data:image/jpg;base64,'+data.base64;
            console.log(data.base64)
        }
    };

    render() {
        return (
            <>
                <StatusBar hidden={true}></StatusBar>

                <Container>
                    <Header />
                    <Content>
                        <List>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri:
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSESlBAW6c7BOy33YM-opnb0O_6roKXQintA&usqp=CAU',
                                        }}
                                    />
                                </Left>
                                <Body>
                                    <Text>Nome</Text>
                                    <Text note numberOfLines={1}>
                                        {this.state.usuario.nome}
                                    </Text>
                                </Body>
                                <Right></Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri:
                                                'https://images.vexels.com/media/users/3/140137/isolated/preview/d5ce03b9b26818e8020ad0972de98baa---cone-redondo-de-e-mail-by-vexels.png',
                                        }}
                                    />
                                </Left>
                                <Body>
                                    <Text>E-mail</Text>
                                    <Text note numberOfLines={1}>
                                        {this.state.usuario.email}.
                  </Text>
                                </Body>
                                <Right></Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri:
                                                'https://i.pinimg.com/originals/14/22/3f/14223f903ac31d76af40053070c78287.png',
                                        }}
                                    />
                                </Left>
                                <Body>
                                    <Text>Endereço</Text>
                                    <Text note numberOfLines={1}>
                                        {this.state.usuario.endereco}
                                    </Text>
                                </Body>
                                <Right></Right>
                            </ListItem>

                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri:
                                                'https://image.flaticon.com/icons/png/512/2773/2773213.png',
                                        }}
                                    />
                                </Left>
                                <Body>
                                    <Text>CPF</Text>
                                    <Text note numberOfLines={1}>
                                        {this.state.usuario.cpf}.
                                   </Text>
                                </Body>
                                <Right></Right>
                            </ListItem>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri:
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3DDqyiGVRLFXzxn3s7oML4jCmNCt0ZxNFOA&usqp=CAU',
                                        }}
                                    />
                                </Left>
                                <Body>
                                    <Text>Telefone</Text>
                                    <Text note numberOfLines={1}>
                                        {this.state.usuario.telefone}
                                    </Text>
                                </Body>
                                <Right></Right>
                            </ListItem>
                        </List>
                    </Content>

                    <View style={styles.adicionarFoto}>
                        <TouchableOpacity
                            style={{ position: 'absolute' }}
                            onPress={async () => {
                                console.log('clicado no camera');
                                this.mostrarCamera();
                            }}>
                            <Thumbnail
                                onPress={console.log('clicando na camera')}
                                square
                                source={{
                                    uri:
                                        'https://www.kindpng.com/picc/m/112-1120914_plus-sign-icon-png-plus-icon-png-transparent.png',
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    {this.state.showCamera ? (
                        <View style={styles.containerCamera}>
                            <RNCamera
                                ref={(ref) => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                            // permissionDialogTitle={'Permissão para usar a câmera?'}
                            // permissionDialogMessage={'Precisamos de sua permissão para usar seu telefone com câmera'}
                            />

                            <View>
                                <TouchableOpacity
                                    onPress={this.takePicture.bind(this)}
                                    style={styles.capture}
                                    log={console.log('camera')}>
                                    <Text>Capturar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                            <View />
                        )}
                </Container>
            </>
        );
    }
}

const styles = StyleSheet.create({
    adicionarFoto: {
        position: 'absolute',
        top: 460,
        left: 280,
    },
    preview: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    containerCamera: {
        backgroundColor: 'black',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});
