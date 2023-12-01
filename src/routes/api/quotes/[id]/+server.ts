import type {RequestEvent, RequestHandler} from "@sveltejs/kit";
import db, { jsonResponseHeaders } from "$lib/database";
import {error} from "@sveltejs/kit";

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
    const quoteId = reqEvent.params.id;

    if (!quoteId) {
        throw error(400, 'Missing quote id.');
    }

    const quote = await db.quote.delete({
        where: {
            id: parseInt(quoteId)
        }
    });

    return new Response(JSON.stringify(quote), jsonResponseHeaders);
}