import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Heading, Text, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Header } from "../components/Header";
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

  useEffect(() => {
    fetchPoolsDetails()
  }, [])


  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={`---Detail -  ${id}  `} showBackButton />

      <VStack px={5} flex={1}>
        {details._count?.participants > 0 ?
          <PoolHeader data={details} /> :
          <EmptyMyPoolList code={details.code} />
        }
      </VStack>

    </VStack>
  )
}