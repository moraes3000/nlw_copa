import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, Heading, Text, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { api } from "../services/axios";

interface RouteParams {
  id: string;
}

export function Detail() {
  const route = useRoute()
  const { id } = route.params as RouteParams


  const [detail, setDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleJoinPool() {


    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${id}/games`)
      console.log(response.data)

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
    handleJoinPool()
  }, [])


  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={`Detail - ${id}`} showBackButton />
    </VStack>
  )
}