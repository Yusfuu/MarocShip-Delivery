import { connect, connection } from "mongoose";
beforeAll(async () => {
  await connect(process.env.DATABASE_URL as string);
});

beforeEach(async () => {
  const collections: any = await connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await connection.close();
});

test('it should connect to mongodb', done => {
  expect(connection.readyState).toBe(1);
  done();
});