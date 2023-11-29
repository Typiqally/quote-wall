import db from "$lib/database";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const quotes = db.quote.findMany({include: {votes: true}})

    return {
        streamed: {
            quotes: quotes
        }
    };
}
