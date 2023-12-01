import type {error, RequestEvent, RequestHandler} from "@sveltejs/kit";
import db, {jsonResponseHeaders} from "$lib/database";

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const quotes = await db.quote.findMany({
        include: {
            votes: true,
        },
    });

    const minimumVotes = 0
    const filteredQuotes = quotes.filter((quote) => quote.votes.length >= minimumVotes);
    filteredQuotes.sort((a, b) => b.votes.length - a.votes.length);

    return new Response(JSON.stringify(filteredQuotes.slice(0, 20)), jsonResponseHeaders);
};
