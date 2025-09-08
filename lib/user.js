import { prisma } from "./db";
import { randomUUID } from "crypto";

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createGuestUser() {
  const id = randomUUID();
  const name = `Guest-${id.substring(0, 6)}`;
  return prisma.user.create({ data: { id, name } });
}

export async function updateUserNameDB(id, newName) {
  return prisma.user.update({ where: { id }, data: { name: newName } });
}
