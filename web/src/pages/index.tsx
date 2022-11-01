import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw.png'
import logo from '../assets/logo.svg'
import avatar from '../assets/avatares.png'
import check from '../assets/icon.svg'
import { api } from '../lib/axios'
import { FormEvent, use, useState } from 'react'


interface HomeProps {
  poolsCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert("bolão criado com sucesso, código copiado para area de transferência")

      setPoolTitle('')

    } catch (error) {
      alert("falha ao criar o bolão")
    }


  }

  return (
    <div className='max-w-5xl mx-auto h-screen grid grid-cols-2 items-center gap-28 '>
      <main>

        <Image src={logo} className='' alt='logo nlw copa' />
        <h2 className='mt-14 text-white font-bold text-5xl leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h2>
        <div className='mt-10 flex items-center gap-2'>
          <Image src={avatar} className='' alt='' />
          <strong className='text-gray-100 text-xl'>
            <span className='text-green-500'>+{props.usersCount} </span>pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex '>
          <input type="text"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
            required placeholder='Qual e o nome do bolão'
            className='
              flex-1 px-6 py-4 rounded
              bg-gray-800 border 
              border-gray-600 
              text-white
              text-sm'

          />
          <button type="submit"
            className='bg-yellow-500 text-gray-900   flex-1 px-6 py-4 rounded uppercase text-sm hover:bg-yellow-700'
          >Criar meu bolão
          </button>
        </form>
        <p className='text-gray-300 text-sm leading-tight mt-4 '>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between divide-x text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={check} className='' alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-lg'>+ {props.poolsCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>


          <div className='flex items-center gap-6'>
            <Image src={check} className='' alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-lg'>+{props.guessCount}</span>
              <span>Palpites enviados </span>
            </div>
          </div>



        </div>
      </main>
      <Image src={appPreviewImg} className='' alt='img de 2 celulares' />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse]
    = await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count')
    ])

  return {
    props: {
      poolsCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.guess,
      usersCount: usersCountResponse.data.user,
    }
  }
}