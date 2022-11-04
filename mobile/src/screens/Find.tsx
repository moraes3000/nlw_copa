import { useNavigation } from "@react-navigation/native";
import { VStack, Heading, Text, useToast } from "native-base";
import { useState } from "react";


import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/axios";


export function Find() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleJoinPool() {
    if (!code.trim()) {
      return toast.show({
        title: "Informe o código do bolão",
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    // code.toUpperCase()

    try {
      await api.post('/pools/join', { code })

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: 'top',
        bgColor: 'green.500',
      })
      setCode('')
      navigate('find')

    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (error.response?.data?.message === 'Pool not found') {
        return toast.show({
          title: "Não foi possível entrar o bolão",
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (error.response?.data?.message === 'you already join this pool') {
        return toast.show({
          title: "Você já está no bolão",
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      toast.show({
        title: "Não foi possível entrar o bolão",
        placement: 'top',
        bgColor: 'red.500',
      })
    }

  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>

        <Heading fontFamily='heading' color='white' fontSize='xl' mb={8} textAlign='center' >
          Encontre um bolão através de {'\n'}
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder='Qual o código  do bolão'
          onChangeText={setCode}
          value={code}
          autoCapitalize='characters'
        />
        <Button
          title="BUSCAR BOLÂO"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />

      </VStack>
    </VStack>
  )
}