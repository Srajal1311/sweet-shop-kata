const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); // We import the App, not the Server
const User = require('../src/models/User');
const Sweet = require('../src/models/Sweet');

require('dotenv').config();

// Connect to Database before tests
beforeAll(async () => {
  // NOTE: This uses your main database. In a real job, use a separate Test DB.
  await mongoose.connect(process.env.MONGO_URI);
});

// Close connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('🍬 Sweet Shop API Tests', () => {
  let adminToken;
  let userToken;

  // Setup: Create users to get Tokens
  beforeAll(async () => {
    // 1. Create a Test Admin
    await User.deleteOne({ username: 'testadmin' }); // Clean up old run
    const adminRes = await request(app).post('/api/v1/auth/register').send({
      username: 'testadmin',
      password: 'password123'
    });
    // If admin already exists (login instead)
    if (adminRes.statusCode === 400) {
        const loginRes = await request(app).post('/api/v1/auth/login').send({
            username: 'testadmin',
            password: 'password123'
        });
        adminToken = loginRes.body.token;
    } else {
        adminToken = adminRes.body.token;
    }

    // 2. Create a Test User
    await User.deleteOne({ username: 'testuser' }); // Clean up old run
    const userRes = await request(app).post('/api/v1/auth/register').send({
      username: 'testuser',
      password: 'password123'
    });
    // If user already exists (login instead)
    if (userRes.statusCode === 400) {
        const loginRes = await request(app).post('/api/v1/auth/login').send({
            username: 'testuser',
            password: 'password123'
        });
        userToken = loginRes.body.token;
    } else {
        userToken = userRes.body.token;
    }
  });

  // ✅ TEST 1: Everyone can see sweets
  it('GET /api/v1/sweets should return 200 OK', async () => {
    const res = await request(app).get('/api/v1/sweets');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // 🔒 TEST 2: Hackers cannot add sweets (No Token)
  it('POST /api/v1/sweets should fail 401 without token', async () => {
    const res = await request(app).post('/api/v1/sweets').send({
      name: 'Hacker Sweet', price: 10, category: 'Bad', quantity: 5
    });
    expect(res.statusCode).toEqual(401);
  });

  // 🔒 TEST 3: Regular Users cannot add sweets
  it('POST /api/v1/sweets should fail 403 for normal users', async () => {
    const res = await request(app)
      .post('/api/v1/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'User Sweet', price: 10, category: 'Test', quantity: 5
      });
    expect(res.statusCode).toEqual(403);
  });

  // ✅ TEST 4: Admins CAN add sweets
  it('POST /api/v1/sweets should succeed 201 for Admin', async () => {
    const res = await request(app)
      .post('/api/v1/sweets')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Jest Test Sweet',
        price: 99,
        category: 'Testing',
        quantity: 100
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Jest Test Sweet');
    
    // Clean up: Delete the sweet we just made
    await Sweet.findByIdAndDelete(res.body._id);
  });
});