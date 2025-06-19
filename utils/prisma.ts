import { PrismaClient } from "@/prisma/prisma"

declare global {
    var prisma : PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

export default prisma;