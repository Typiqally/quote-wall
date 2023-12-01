import {PrismaClient} from "@prisma/client";

const db = new PrismaClient();

export const jsonResponseHeaders = {
    headers: {
        'Content-Type': 'application/json',
    },
};


export default db;
