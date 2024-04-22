import { menuItens } from "./menu";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    for (let menuItem of menuItens) {
        await prisma.menu.create({
            data: menuItem
        })
    }
}

main().catch(err => {
    console.log(err);
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})