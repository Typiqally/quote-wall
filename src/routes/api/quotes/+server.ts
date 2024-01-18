import db from "$lib/database";
import {error, type RequestEvent, type RequestHandler} from "@sveltejs/kit";
import {jsonResponseHeaders} from "$lib/response";

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    const page = reqEvent.url.searchParams.get('page');
    const discordId = reqEvent.url.searchParams.get('discordId');
    const search = reqEvent.url.searchParams.get('search');
    const id = reqEvent.url.searchParams.get('id');

    let where = {};
    let pagination = {};

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

    if (id) {
        where = {
            ...where,
            id: parseInt(id),
        }
    }

    if (page) {
        pagination = {
            take: 10,
            skip: page ? parseInt(page, 10) * 10 : 0,
        }
    }

    const quotes = await db.quote.findMany({
        where,
        ...pagination,
        include: {votes: true}
    });

    const totalCount = await db.quote.count({
        where,
    });

    return new Response(JSON.stringify({
        "totalCount": totalCount,
        "page": page ? parseInt(page, 10) : 0,
        "quotes": quotes
    }), jsonResponseHeaders);
};

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
    const {text, discordId} = await reqEvent.request.json();

    if (!text) {
        throw error(400, {
            message: "Text is required"
        });
    }

    if (text.length >= 100) {
        throw error(400, {
            message: "Text should be less than 100 characters"
        });
    }

    if (!discordId) {
        throw error(400, {
            message: "Missing discord id"
        });
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
