import { VStack, Heading, Text } from "native-base";

import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";


export function New() {
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
        />
        <Button
          title="CRIAR O SEU BOLÂO"
        />

        <Text color='gray.200' fontSize='sm' textAlign='center' px={10} mt={4}>
          Após criar o seu bolão, você receberá um código único que poderá user para convidar outras pessoas
        </Text>
      </VStack>
    </VStack>
  )
}