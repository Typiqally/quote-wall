import db, { jsonResponseHeaders } from '$lib/database';
import {error, type RequestEvent, type RequestHandler} from "@sveltejs/kit";

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
    const {discordId} = await reqEvent.request.json();
    const quoteId = reqEvent.params.id;

    if (!quoteId) {
        throw error(400, 'Missing quote id.');
    }

    if (!discordId) {
        throw error(400, 'Missing discord id.');
    }

    const deletedQuote = await db.vote.deleteMany({
        where: {
            quoteId: parseInt(quoteId),
            discordId: discordId,
        },
    });

    return new Response(JSON.stringify(deletedQuote), jsonResponseHeaders);
}

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
    const {discordId} = await reqEvent.request.json();
    const quoteId = reqEvent.params.id;

    if (!quoteId) {
        throw error(400, 'Missing quote id.');
    }

    if (!discordId) {
        throw error(400, 'Missing discord id.');
    }

    const amountOfVotes = await db.vote.count({
        where: {
            discordId: discordId,
        },
    });

    if (amountOfVotes >= 5) {
        throw error(403, "You have reached the maximum amount of votes.");
    }

    const voteExists = await db.vote.findFirst({
        where: {
            quoteId: parseInt(quoteId),
            discordId: discordId,
        },
    });

    if (voteExists) {
        throw error(403, "You have already voted for this quote.");
    }

    const vote = await db.vote.create({
        data: {
            quoteId: parseInt(quoteId),
            discordId: discordId,
        },
    });

    return new Response(JSON.stringify(vote), jsonResponseHeaders);
}
