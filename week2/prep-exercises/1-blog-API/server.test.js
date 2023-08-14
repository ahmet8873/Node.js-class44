import request from "supertest";
import app from "./server";

describe("Blog API endpoints", () => {
  it("should create a new blog post", async () => {
    const response = await request(app)
      .post("/blogs")
      .send({ title: "NewBlogPost", content: "This is the content." });

    expect(response.status).toBe(201);
  });

  it("should read a blog post", async () => {
    const response = await request(app).get("/blogs/NewBlogPost");

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("NewBlogPost");
  });

  it("should update a blog post", async () => {
    const response = await request(app)
      .put("/blogs/NewBlogPost")
      .send({ content: "Updated content." });

    expect(response.status).toBe(200);
  });

  it("should delete a blog post", async () => {
    const response = await request(app).delete("/blogs/NewBlogPost");

    expect(response.status).toBe(200);
  });

  it("should retrieve a list of blog titles", async () => {
    const response = await request(app).get("/blogs");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
