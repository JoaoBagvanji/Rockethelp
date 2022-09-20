import React, { useState } from 'react';
import { Alert } from 'react-native';

import { VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import  { Header } from '../Components/Header';
import firestore from '@react-native-firebase/firestore';

import { Input } from '../Components/Input';
import { Button } from '../Components/Button';

export function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister(){
    if(!patrimony || !description){
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    setIsLoading(true);
    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert("Solicitação","Solicitação registrada com sucesso.");
      navigation.goBack();
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
      return Alert.alert('Solicitação', 'Não foi possível registrar o pedido');
    })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova Solicitação"/>

        <Input 
            placeholder="Número do património"
            mt={4}
            onChangeText={setPatrimony}
        />

        <Input 
            placeholder="Descrição do problema"
            flex={1}
            mt={5}
            multiline
            textAlignVertical="top"
            onChangeText={setDescription}
        />

        <Button
            title="Cadastrar" 
            mt={5}
            isLoading={isLoading}
            onPress={handleNewOrderRegister}
        />
    </VStack>
  );
}