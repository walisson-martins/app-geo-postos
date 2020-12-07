import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CadastrarUsuario from '../pages/CadastrarUsuario';
import CadastrarPosto from '../pages/CadastrarPosto';
import Menu from '../pages/Menu';
import Index from "../pages/Index";
import Perfil from "../pages/Perfil";
import ListarPostos from '../pages/ListarPostos';
import RecuperarSenha from '../pages/RecuperarSenha';
import Login from '../pages/Login';
import AlterarPostoUser from '../pages/AlterarPostoUser';

const Stack = createStackNavigator();
export default function Routers() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
                    <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
                    <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} options={{
                        title: "Cadastrar usuário", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />
                    <Stack.Screen name="Perfil" component={Perfil} options={{
                        title: "Perfil", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />

                    <Stack.Screen name="CadastrarPosto" component={CadastrarPosto} options={{
                        title: "Cadastrar posto", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />

                    <Stack.Screen name="ListarPostos" component={ListarPostos} options={{
                        title: "", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />

                    <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{
                        title: "Recuperar senha", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />

                    <Stack.Screen name="Login" component={Login} options={{
                        title: "Login", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />

                    <Stack.Screen name="AlterarPostoUser" component={AlterarPostoUser} options={{
                        title: "Alterar posto", headerTitleStyle:
                            { textAlign: "center", },
                        headerTitleAlign: 'center'
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}