import UserRepositoryImpl from "./user.repository.impl";

import {describe, expect, test} from '@jest/globals';
import { User as prismaUser } from "@prisma/client"
import { prisma } from "@src/config/adapters/prisma.adapter";

const userRepository = new UserRepositoryImpl();

describe("Users Repository", () => { 
  let user: prismaUser
  let user2: prismaUser

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        email: "test@test.com",
        name: "Test",
        password: "123456",
        emailVerified: new Date(),
        image: "https://test.com/test.png",
      },
    });
    user2 = await prisma.user.create({
      data: {
        email: "test2@test.com",
        name: "Test2",
        password: "123456",
        emailVerified: new Date(),
        image: "https://test.com/test.png",
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ["test@test.com", "test2@test.com"],
        },
      },
    });
    await prisma.$disconnect();
  });

  test("should return a user", async () => {
    const userFound = await userRepository.getById(user.id);

    expect(userFound).toBeDefined();
    expect(userFound?.email).toBe(user.email);
    expect(userFound?.name).toBe(user.name);
    expect(userFound?.emailVerified).toEqual(user.emailVerified);
    expect(userFound?.image).toBe(user.image);
  });

  test("should return null if user not found", async () => {
    const userFound = await userRepository.getById("123456");

    expect(userFound).toBeNull();
  });

  test("should return a user by email", async () => {
    
    const userFound = await userRepository.getByEmail('test@test.com');

    expect(userFound).toBeDefined();
    expect(userFound?.email).toBe(user.email);
    expect(userFound?.name).toBe(user.name);
    expect(userFound?.emailVerified).toEqual(user.emailVerified);
    expect(userFound?.image).toBe(user.image);
  });

  test("should return null if user not found by email", async () => {
    const userFound = await userRepository.getByEmail("nonexistent@test.com");

    expect(userFound).toBeNull();
  });

});