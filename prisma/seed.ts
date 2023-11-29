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

const generateVotes = async (quote: Quote, count: number) => {
    const votes = [];

    for (let i = 0; i < count; i++) {
        const vote = await db.vote.create({
            data: {
                discordId: faker.number.int({min: 1000, max: 100000000}).toString(),
                createdAt: faker.date.past(),
                quote: {connect: {id: quote.id}},
            },
        });

        votes.push(vote)
    }

    return votes
};

generateQuotes(10)
    .then(async (generatedQuotes) => {
        const votes = [];

        for (const quote of generatedQuotes) {
            const count = Math.floor(Math.random() * 10) + 1;
            votes.push(await generateVotes(quote, count))
        }

        return votes
    })
