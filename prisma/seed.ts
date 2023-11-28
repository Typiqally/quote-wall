import type {Quote} from '@prisma/client';
import {faker} from '@faker-js/faker';
import db from '$lib/database';

const generateQuotes = async (count: number) => {
  const quotes = [];
  for (let i = 0; i < count; i++) {
    const newQuote = await db.quote.create({
      data: {
        text: faker.lorem.sentence(),
        discordId: faker.number.int({min: 1000, max: 100000000}).toString(),
        createdAt: faker.date.past(),
      },
    });
    quotes.push(newQuote);
  }
  return quotes;
};

const generateVotes = async (quotes: Quote[], voteCountPerQuote: number) => {
  const votes = [];
  for (const quote of quotes) {
    for (let i = 0; i < voteCountPerQuote; i++) {
      const newVote = await db.vote.create({
        data: {
          discordId: faker.number.int({min: 1000, max: 100000000}).toString(),
          createdAt: faker.date.past(),
          quote: { connect: { id: quote.id } },
        },
      });
      votes.push(newVote);
    }
  }
  return votes;
};

generateQuotes(10)
    .then((generatedQuotes) => {
      const voteCountPerQuote = Math.floor(Math.random() * 10) + 1;
      return generateVotes(generatedQuotes, voteCountPerQuote);
    })