import { prisma } from '@/lib/prisma' 
import { nanoid } from 'nanoid'

async function seed() {
    await prisma.habit.create({
        data : {
            id : nanoid(),
            name : 'Meditate',
            category : 'Health'
        }
    })
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });