import db from '$lib/database';
import {error, type RequestEvent, type RequestHandler} from "@sveltejs/kit";

const responseHeaders = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const GET: RequestHandler = async (reqEvent: RequestEvent) => {
    try {
        const page = reqEvent.url.searchParams.get('page');
        let quotes;

        if (page) {
            const pageNumber = parseInt(page, 10);
            quotes = await db.quote.findMany({
                skip: pageNumber * 10,
                take: 10,
                orderBy: {
                    id: 'asc',
                },
                include: {
                    votes: true,
                }
            });
        } else {
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
            quotes = filteredQuotes.slice(0, 20);
        }

        return new Response(JSON.stringify(quotes), responseHeaders);
    } catch (e) {
        throw error(500, 'Failed to fetch quotes.');
    }
};

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
    const {id} = await reqEvent.request.json();

    const quote = await db.quote.delete({
        where: {
            id: id
        }
    });

    return new Response(JSON.stringify(quote), responseHeaders);
}

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
    const {text, discordId} = await reqEvent.request.json();
    const quote = await db.quote.create({
        data: {
            text,
            discordId,
        },
    });

    return new Response(JSON.stringify(quote), {
        status: 201,
        ...responseHeaders,
    });
}
