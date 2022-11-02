import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {

    const user =  await prisma.user.create({
        data: {
            name: 'Lucas',
            email: 'lucaslmsc556762@gmail.com',
            avatarUrl: 'https://github.com/LucasLM1.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Bolão Teste do Pai',
            code: 'NS31D3N4D4',
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
            date: '2022-11-03T14:42:25.956Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'JP',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-04T20:42:25.956Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoint: 7,
                    secondTeamPoint: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()