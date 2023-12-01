import type {RequestEvent, RequestHandler} from "@sveltejs/kit";
import db from "$lib/database";
import {jsonResponseHeaders} from "$lib/response";

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
