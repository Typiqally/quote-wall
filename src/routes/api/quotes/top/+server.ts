import type {error, RequestEvent, RequestHandler} from "@sveltejs/kit";
import db, {jsonResponseHeaders} from "$lib/database";

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const quotesWithVotes = await db.quote.findMany({
        where: {
            votes: {
                some: {},
            },
        },
        include: {
            votes: true,
        },
    });

    const filteredQuotes = quotesWithVotes.filter((quote) => quote.votes.length >= 3);
    filteredQuotes.sort((a, b) => b.votes.length - a.votes.length);

    const quotes = filteredQuotes.slice(0, 20);

    return new Response(JSON.stringify(quotes), jsonResponseHeaders);
};