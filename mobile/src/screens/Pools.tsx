import { useCallback, useState } from "react";
import { api } from "../services/axios";
import { VStack, Icon, useToast, FlatList } from "native-base";

import { Octicons } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardPros } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const [isLoading, setLoading] = useState(true)
  const [pools, setPools] = useState<PoolCardPros[]>([])

  const toast = useToast()

  const { navigate } = useNavigation();

  async function featPools() {
    try {
      setLoading(true)
      const response = await api.get('/pools')
      setPools(response.data.pools)
      // console.log(response.data.pools)

    } catch (error) {
      console.log(error)

      toast.show({
        title: "Error, ao carregar bolões",
        placement: 'top',
        bgColor: 'red.500',
      })
    }
    finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      featPools()
    }, [])
  )


  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6} mx={5}
        pb={4} mb={4}
        alignItems='center'
        borderBottomWidth={1}
        borderBottomColor='gray.600'
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size='md' />
          }
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading ?
        <Loading />
        : (
          <FlatList
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PoolCard
                data={item}
                onPress={() => navigate('details', { id: item.id })}
              />
            )}
            ListEmptyComponent={() => <EmptyPoolList />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            px={5}
          />
        )
      }

    </VStack>
  )
}