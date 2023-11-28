import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

type Quote = {
  text: string;
  author: string;
}

async function getQuotes(): Promise<Quote[]> {
  const quotes: Quote[] = [];
  for (let i = 0; i < 10; i++) {
    quotes.push({
      text: faker.lorem.words({ min: 5, max: 13 }),
      author: faker.person.fullName(),
    });
  }
  return quotes;
}

async function saveQuotesToDatabase(): Promise<void> {
  try {
    const quotes = await getQuotes();
    for (const quote of quotes) {
        await prisma.quote.create({
            data: quote,
        });
    }
    console.log('Quotes saved to the database.');
  } catch (error) {
    console.error('Error saving quotes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

await saveQuotesToDatabase();