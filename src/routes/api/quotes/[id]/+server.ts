import type {RequestEvent, RequestHandler} from "@sveltejs/kit";
import db from "$lib/database";
import {error} from "@sveltejs/kit";
import {jsonResponseHeaders} from "$lib/response";

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
    const id = reqEvent.params.id;

    if (!id) {
        throw error(400, {
            message: "Missing quote id"
        });
    }

    const quote = await db.quote.delete({
        where: {
            id: parseInt(id)
        }
    });

    return new Response(JSON.stringify(quote), jsonResponseHeaders);
}
