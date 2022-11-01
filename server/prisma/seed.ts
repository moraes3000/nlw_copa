import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      nome: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/29808643?v=4'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Exemplo Pool',
      code: 'adasd',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-01T21:15:44.905Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T21:15:44.905Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participat: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })


}

main()