import db from '$lib/database';
import { error } from "@sveltejs/kit";
import type {RequestEvent, RequestHandler} from "./$types";

export const GET: RequestHandler = async () => {
  try {
    const quotes = await db.quote.findMany();
    return new Response(JSON.stringify(quotes));
  } catch (e) {
    throw error(500, "Failed to fetch quotes.");
  } finally {
    await db.$disconnect();
  }
}

export const DELETE: RequestHandler = async (reqEvent: RequestEvent) => {
  try {
    const { id } = await reqEvent.request.json();
    const quote = await db.quote.delete({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify(quote));
  } catch (e) {
    throw error(500, "Failed to delete quote.");
  } finally {
    await db.$disconnect();
  }
}

export const POST: RequestHandler = async (reqEvent: RequestEvent) => {
  try {
    const { text, author } = await reqEvent.request.json();
    const quote = await db.quote.create({
      data: {
        text,
        author,
      },
    });
    return new Response(JSON.stringify(quote), {
      status: 201
    });
  } catch (e) {
    throw error(500, "Failed to create quote.");
  } finally {
    await db.$disconnect();
  }
}