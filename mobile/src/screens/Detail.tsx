import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Heading, Text, useToast, HStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Option } from "../components/Option";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/axios";

interface RouteParams {
  id: string;
}

export function Detail() {
  const route = useRoute()
  const { id } = route.params as RouteParams


  const [details, setDetail] = useState<PoolCardPros>({} as PoolCardPros)
  const [isLoading, setIsLoading] = useState(false)
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')


  const toast = useToast()

  const { navigate } = useNavigation()

  async function fetchPoolsDetails() {


    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${id}`)
      setDetail(response.data.pools)
      // console.log(response.data.pools)

    } catch (error) {
      console.log(error)
      setIsLoading(false)

      toast.show({
        title: "Não foi possível entrar Carregar",
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }

  }

  async function handleCodeShare() {
    await Share.share({
      message: details.code
    })
  }

  useEffect(() => {
    fetchPoolsDetails()
  }, [])


  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={`---Detail -  ${id}  `} showBackButton showShareButton onShare={handleCodeShare} />


      {details._count?.participants > 0 ?
        <VStack px={5} flex={1}>
          <PoolHeader data={details} />

          <HStack bgColor='gray.800' p={1} rounded='sm' mb={8} >
            <Option
              title={"Seus palpites"}
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title={"Ranking"}
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />

          </HStack>
          <Guesses poolId={details.id} />
        </VStack>
        :
        <EmptyMyPoolList code={details.code} />
      }


    </VStack>
  )
}