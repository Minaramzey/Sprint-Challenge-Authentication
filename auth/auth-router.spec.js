const request = require("supertest");
const server = require("../api/server");

describe("auth-router", () => {
  it("runs test suite", () => {
    expect(true).toBe(true);
  });

  describe("POST api/auth/login", () => {
    it("should return a status of 200", async () => {
        await request(server)
          .post("/api/auth/register")
          .send({ username: "abcd", password: "1234" });
        const res = await request(server).post("/api/auth/login").send({
          username: "abcd",
          password: "1234",
        });
        expect(res.status).toBe(200);
      });

    it("returns json on login success", async () => {
      const res = await request(server)
        .post("/api/auth/login");
      expect(res.type).toMatch(/json/);
    });
  });

  describe('POST api/auth/register', () => {
    const register = Date.now();
        const data = {
          username: `test${register}`,
          password: "1234"
        };

    it("should return success 201", async () => {
        const response = await request(server)
          .post("/api/auth/register")
          .send(data);
        expect(response.status).toBe(201);
      });

    it('returns 500 Error if an empty object is passed in', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send(data);
      expect(res.status).toBe(500);
    });
  });
});