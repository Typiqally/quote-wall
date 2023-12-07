import type {RequestEvent, RequestHandler} from "@sveltejs/kit";
import db, {jsonResponseHeaders} from "$lib/database";
import {error} from "@sveltejs/kit";

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const discordId = reqEvent.url.searchParams.get('discordId');

    if (!discordId) {
        throw error(400, 'Missing discord id.');
    }

    const getVotes = await db.vote.findMany({
        where: {
            discordId: discordId,
        },
    });

    return new Response(JSON.stringify(getVotes), jsonResponseHeaders);
}