import type {RequestEvent, RequestHandler} from "@sveltejs/kit";
import db from "$lib/database";
import {error} from "@sveltejs/kit";
import {jsonResponseHeaders} from "$lib/response";

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const discordId = reqEvent.url.searchParams.get('discordId');

    if (!discordId) {
        throw error(400, 'Missing discord id.');
    }

    const votes = await db.vote.findMany({
        where: {
            discordId: discordId,
        },
    });

    return new Response(JSON.stringify(votes), jsonResponseHeaders);
}