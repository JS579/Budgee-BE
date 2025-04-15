require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");
describe("ENDPOINT: /api/articles", () => {
  describe("GET: /api/articles", () => {
    test("Responds with 200 OK status when articles are fetched successfully", async () => {
      await request(app).get("/api/articles").expect(200);
    });
    test("Returns an array of all articles sorted by date in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("created_at", {descending: true});
      articles.forEach((article) => {
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("article_img_url");
        expect(article).toHaveProperty("comment_count");
      });
    });
    test("Returns an array of all articles sorted by date in asc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?order=asc").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("created_at", {ascending: true});
    });
    test("Returns an array of all articles sorted by article_id in asc order", async () => {
      const {
        body: {articles},
      } = await request(app)
        .get("/api/articles?sort_by=article_id&order=asc")
        .expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("article_id", {ascending: true});
    });
    test("Returns an array of all articles sorted by title in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?sort_by=title").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("title", {descending: true});
    });
    test("Returns an array of all articles sorted by votes in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?sort_by=votes").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("votes", {descending: true});
    });
    test("Returns an array of all articles belonging to a topic in desc order", async () => {
      const {
        body: {articles, total_count},
      } = await request(app).get("/api/articles?topic=mitch").expect(200);
      expect(articles.length).toBe(10);
      expect(total_count).toBe(12);
      expect(articles).toBeSortedBy("created_at", {descending: true});
    });
    test("Returns an array of articles paginated, with a default query limit of 10 articles by page", async () => {
      const {
        body: {articles, total_count, pages, pageNumber},
      } = await request(app).get("/api/articles").expect(200);
      expect(articles.length).toBe(10);
      expect(total_count).toBe(13);
      expect(pages).toBe(2);
      expect(pageNumber).toBe(1);
    });
    test("Returns an array of articles paginated, when provided a query limit", async () => {
      const {
        body: {articles, total_count, pages},
      } = await request(app).get("/api/articles?limit=5").expect(200);
      expect(articles.length).toBe(5);
      expect(total_count).toBe(13);
      expect(pages).toBe(3);
    });
    test("Returns an array of articles paginated, when provided a query limit, and page where you are at", async () => {
      const {
        body: {articles, total_count, pages, pageNumber},
      } = await request(app).get("/api/articles?limit=3&p=4").expect(200);
      expect(articles.length).toBe(3);
      expect(total_count).toBe(13);
      expect(pages).toBe(5);
      expect(pageNumber).toBe(4);
    });
    test("Returns an array of articles paginated, when they are filteres by topic and provided a query limit", async () => {
      const {
        body: {articles, total_count, pages, pageNumber},
      } = await request(app)
        .get("/api/articles?topic=mitch&limit=2")
        .expect(200);
      expect(articles.length).toBe(2);
      expect(total_count).toBe(12);
      expect(pages).toBe(6);
    });
    describe("💥 Error handling tests", () => {
      test("Responds with 400 when provided with wrong query sort_by values", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get("/api/articles?sort_by=invalid_column")
          .expect(400);
        expect(msg).toBe("Bad Request");
      });

      test("Responds with 400 when provided with wrong query order values", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get("/api/articles?sort_by=created_at&order=invalid")
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Responds with 404 when the topic is not found", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get(`/api/articles?topic=doesnotexist`)
          .expect(404);
        expect(msg).toBe("Topic not found");
      });
      test("Returns an empty array when the topic exists but has no articles", async () => {
        const {
          body: {articles, total_count},
        } = await request(app).get(`/api/articles?topic=paper`).expect(200);
        expect(articles).toEqual([]);
        expect(total_count).toBe(0);
      });
      test("Responds with 400 when limit is not a positive number", async () => {
        const {
          body: {msg},
        } = await request(app).get("/api/articles?limit=-5").expect(400);
        expect(msg).toBe("Bad Request: Invalid limit");
      });
      test("Responds with 400 when p is not equal or greater than 1", async () => {
        const {
          body: {msg},
        } = await request(app).get("/api/articles?p=-5").expect(400);
        expect(msg).toBe("Bad Request: Invalid page");
      });
    });
  });
  describe("POST: /api/articles", () => {
    test("Responds with 201 when an article is created successfully", async () => {
      const testArticle = {
        author: "butter_bridge",
        title: "Living in the shadow of a great man",
        body: "I find this existence challenging",
        topic: "mitch",
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      };
      await request(app).post("/api/articles").send(testArticle).expect(201);
    });
    test("Returns newly created object article", async () => {
      const testArticle = {
        author: "rogersop",
        title: "Living in the shadow of a great man",
        body: "I find this existence challenging",
        topic: "mitch",
        article_img_url:
          "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=700&h=700",
      };
      const {
        body: {newArticle},
      } = await request(app)
        .post("/api/articles")
        .send(testArticle)
        .expect(201);
      expect(typeof newArticle.article_id).toBe("number");
      expect(newArticle.author).toBe("rogersop");
      expect(newArticle.topic).toBe("mitch");
      expect(newArticle.title).toBe("Living in the shadow of a great man");
      expect(newArticle.body).toBe("I find this existence challenging");
      expect(newArticle.article_img_url).toBe(
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=700&h=700"
      );
      expect(typeof newArticle.created_at).toBe("string");
      expect(newArticle.votes).toBe(0);
      expect(newArticle.comment_count).toBe(0);
    });
    test("Returns newly created object article with default article_img_url", async () => {
      const testArticle = {
        author: "rogersop",
        title: "Living in the shadow of a great man",
        body: "I find this existence challenging",
        topic: "mitch",
      };
      const {
        body: {newArticle},
      } = await request(app)
        .post("/api/articles")
        .send(testArticle)
        .expect(201);
      expect(newArticle.article_img_url).toBe(
        "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?w=700&h=700"
      );
    });
  });
  describe("", () => {
    test("Responds with 400 bad request if required fields are missing", async () => {
      const incompleteArticle = {
        title: "Test Title",
        body: "Test Body",
      };
      const {
        body: {msg},
      } = await request(app)
        .post("/api/articles")
        .send(incompleteArticle)
        .expect(400);
      expect(msg).toBe("Bad Request: Missing required field");
    });
    test("Returns 400 for invalid data types", async () => {
      const invalidArticle = {
        author: 123,
        title: "Valid Title",
        body: "Valid Body",
        topic: "Valid Topic",
      };
      const {
        body: {msg},
      } = await request(app)
        .post("/api/articles")
        .send(invalidArticle)
        .expect(400);
      expect(msg).toBe("Bad Request: Invalid data type");
    });
    test("Returns 404 if author does not exist", async () => {
      const invalidArticle = {
        author: "doesnotexist",
        title: "Valid Title",
        body: "Valid Body",
        topic: "mitch",
      };
      const {
        body: {msg},
      } = await request(app)
        .post("/api/articles")
        .send(invalidArticle)
        .expect(404);
      expect(msg).toBe("User not found");
    });
    test("Returns 404 if topic does not exist", async () => {
      const invalidArticle = {
        author: "rogersop",
        title: "Valid Title",
        body: "Valid Body",
        topic: "doesnotexist",
      };
      const {
        body: {msg},
      } = await request(app)
        .post("/api/articles")
        .send(invalidArticle)
        .expect(404);
      expect(msg).toBe("Topic not found");
    });
  });
});
