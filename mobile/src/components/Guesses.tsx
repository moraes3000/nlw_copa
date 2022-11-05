import { useEffect, useState } from 'react';
import { Box, FlatList, useToast } from 'native-base';
import { api } from '../services/axios';
import { Game, GameProps } from './Game';

interface Props {
  poolId: string;
}



export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()


  async function fetchGames() {
    try {
      setIsLoading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      // const response = await api.get(`/pools/cla14z1350001sbi8c20323fx/games`)
      // console.log(response.data.games)
      setGames(response.data.games)


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
    fetchGames()
  }, [poolId])

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => { }}
        />
      )}
    >

    </FlatList>
  );
}
