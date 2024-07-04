const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const hashedPassword = bcrypt.hashSync("123456", 10);

// const user = [
//   {
//     firstname: "test",
//     lastname: "t001",
//     password: hashedPassword,
//     email: "test@gmail.com",
//   },
// ];

// async function run() {
//   await prisma.user.createMany({ data: user });
// }
// run();
