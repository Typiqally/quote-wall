import db from "$lib/database";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const quotes = await db.quote.findMany({
        include: {
            votes: true,
        },
    });

    const minimumVotes = 0
    const filteredQuotes = quotes.filter((quote) => quote.votes.length >= minimumVotes);
    filteredQuotes.sort((a, b) => b.votes.length - a.votes.length);

    return {
        quotes: filteredQuotes.slice(0, 20)
    };
}
