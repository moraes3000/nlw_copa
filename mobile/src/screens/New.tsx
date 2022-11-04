import { useState } from "react";
import { VStack, Heading, Text, useToast, Toast } from "native-base";

import Logo from '../assets/logo.svg'

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/axios";



export function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Informe o nome do bolão",
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    try {
      setIsLoading(true)

      await api.post('/pools', { title })

      toast.show({
        title: "Bolão criado com sucesso",
        placement: 'top',
        bgColor: 'green.500',
      })

      setTitle("")

    } catch (error) {
      toast.show({
        title: "Erro ao criar bolão",
        placement: 'top',
        bgColor: 'red.500',
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems='center'>
        <Logo />
        <Heading fontFamily='heading' color='white' fontSize='xl' my={8} textAlign='center' >
          Crie o seu próprio bolão da copa  e compartilhe entre os amigos!
        </Heading>

        <Input
          mb={2}
          placeholder='Qual é o nome do seu bolão'
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR O SEU BOLÂO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
          Após criar o seu bolão, você receberá um código único que poderá user para convidar outras pessoas
        </Text>
      </VStack>
    </VStack>
  )
}