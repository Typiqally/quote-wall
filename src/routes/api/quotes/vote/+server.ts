import db from '$lib/database';
import {error, type RequestEvent, type RequestHandler} from "@sveltejs/kit";

const responseHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
  try {
    const { quoteId, discordId } = await reqEvent.request.json();

    const vote = await db.vote.deleteMany({
      where: {
        quoteId: quoteId,
        discordId: discordId,
      },
    });

    return new Response(JSON.stringify(vote), responseHeaders);
  } catch (e) {
    throw error(500, "Failed to decrement quote votes.");
  }
}

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
  try {
    const { quoteId, discordId } = await reqEvent.request.json();

    const vote = await db.vote.create({
      data: {
        quoteId: quoteId,
        discordId: discordId,
      },
    });

    return new Response(JSON.stringify(vote), responseHeaders);
  } catch (e) {
    throw error(500, "Failed to increment quote votes.");
  }
}