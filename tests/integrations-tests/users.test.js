const appFn  = require('../../app');
const supertest = require('supertest');
const Fastify = require('fastify');

let app;
let request;

beforeAll(async () => {
  app = Fastify();
  await appFn(app, {});
  await app.ready();
  request = supertest(app.server);
});

afterAll(async () => {
  await app.close();
});

describe('User Routes', () => {

  test('GET /users should return an array of users', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /users/:id should return a user by their ID', async () => {
    const id = '67fe190652459bbe92e5028a';
    const response = await request.get(`/users/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'Noah James');
    expect(response.body).toHaveProperty('email', 'something@gmail.com');
  });

  test('POST /users should create a new user and return the user data', async () => {
    const firstUser = {
      username: 'Willow123',
      name: 'Willow Alexander',
      email: 'willow123@example.com',
    };

    const response = await request
      .post('/users')
      .send(firstUser)
      .expect(201);

    expect(response.body.username).toBe(firstUser.username);
    expect(response.body.name).toBe(firstUser.name);
    expect(response.body.email).toBe(firstUser.email);
    expect(response.body).toHaveProperty('_id');
  });

  test('POST /users should return 400 for duplicate username/email', async () => {
    const secondUser = {
      username: 'Willow123', 
      name: 'Another Willow',
      email: 'willow123@example.com',
    };

    const response = await request
      .post('/users')
      .send(secondUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toMatch(/username.*taken|duplicate/i);
  });

});
