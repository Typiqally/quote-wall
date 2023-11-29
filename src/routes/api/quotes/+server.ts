import db, {jsonResponseHeaders} from '$lib/database';
import {error, type RequestEvent, type RequestHandler} from "@sveltejs/kit";


export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const page = reqEvent.url.searchParams.get('page');
    const discordId = reqEvent.url.searchParams.get('discordId');
    const search = reqEvent.url.searchParams.get('search');

    let where = {};

    if (discordId) {
        where = {
            ...where,
            discordId: discordId,
        };
    }

    if (search) {
        where = {
            ...where,
            text: {
                contains: search,
            },
        };
    }

    const quotes = await db.quote.findMany({
        where,
        take: 10,
        skip: page ? parseInt(page, 10) * 10 : 0,
    });

    const totalCount = await db.quote.count({
        where,
    });

    return new Response(JSON.stringify({
        "total_count": totalCount,
        "page": page ? parseInt(page, 10) : 0,
        "quotes": quotes
    }), jsonResponseHeaders);
};

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
    const {text, discordId} = await reqEvent.request.json();

    if (!text) {
        throw error(400, 'Missing quote text.');
    }

    if (!discordId) {
        throw error(400, 'Missing discord id.');
    }

    const quote = await db.quote.create({
        data: {
            text,
            discordId,
        },
    });

    return new Response(JSON.stringify(quote), {
        status: 201,
        ...jsonResponseHeaders,
    });
}
