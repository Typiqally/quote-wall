import db from '$lib/database';
import {error, type RequestEvent, type RequestHandler} from "@sveltejs/kit";

const responseHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
    const { quoteId, discordId } = await reqEvent.request.json();

    const deletedQuote = await db.vote.deleteMany({
      where: {
        quoteId: quoteId,
        discordId: discordId,
      },
    });

    return new Response(JSON.stringify(deletedQuote), responseHeaders);
}

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
  const { quoteId, discordId } = await reqEvent.request.json();

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
      quoteId: quoteId,
      discordId: discordId,
    },
  });

  if (voteExists) {
    throw error(403, "You have already voted for this quote.");
  }

  const vote = await db.vote.create({
    data: {
      quoteId: quoteId,
      discordId: discordId,
    },
  });

  return new Response(JSON.stringify(vote), responseHeaders);
}