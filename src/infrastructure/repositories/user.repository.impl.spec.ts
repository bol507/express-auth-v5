import UserRepositoryImpl from "./user.repository.impl";



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
    // Limpia los datos de prueba
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
    const userFound = await userRepository.findById(user.id);

    expect(userFound).toBeDefined();
    expect(userFound?.email).toBe(user.email);
    expect(userFound?.name).toBe(user.name);
    expect(userFound?.emailVerified).toEqual(user.emailVerified);
    expect(userFound?.image).toBe(user.image);
  });

  test("should return null if user not found", async () => {
    const userFound = await userRepository.findById("123456");

    expect(userFound).toBeNull();
  });

  test("should return a user by email", async () => {
    
    const userFound = await userRepository.findByEmail('test@test.com');

    expect(userFound).toBeDefined();
    expect(userFound?.email).toBe(user.email);
    expect(userFound?.name).toBe(user.name);
    expect(userFound?.emailVerified).toEqual(user.emailVerified);
    expect(userFound?.image).toBe(user.image);
  });

  test("should return null if user not found by email", async () => {
    const userFound = await userRepository.findByEmail("nonexistent@test.com");

    expect(userFound).toBeNull();
  });

  test("should return all users", async () => {
    const users = await userRepository.findAll();

    expect(users).toBeDefined();
    expect(users.length).toBe(2);
    expect(users.map(u => u.email)).toEqual(expect.arrayContaining([user.email, user2.email]));
  });
});