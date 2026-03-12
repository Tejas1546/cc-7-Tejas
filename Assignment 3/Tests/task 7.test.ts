import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { APIService } from "../Tasks/task 7.ts";

describe("APIService Class", () => {
  let apiService: APIService;
  beforeEach(() => {
    apiService = new APIService();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("fetch post object", async () => {
    const mockPost = {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPost,
    } as Response);
    const actualData = await apiService.fetchPost(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    expect(actualData).toEqual(mockPost);
  });

  it("fetch comments", async () => {
    const mockComments = [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body:
          "laudantium enim quasi est quidem magnam voluptate ipsam eos\n" +
          "tempora quo necessitatibus\n" +
          "dolor quam autem quasi\n" +
          "reiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        name: "quo vero reiciendis velit similique earum",
        email: "Jayne_Kuhic@sydney.com",
        body:
          "est natus enim nihil est dolore omnis voluptatem numquam\n" +
          "et omnis occaecati quod ullam at\n" +
          "voluptatem error expedita pariatur\n" +
          "nihil sint nostrum voluptatem reiciendis et",
      },
    ];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockComments,
    } as Response);
    const actualData = await apiService.fetchComments(1, 2);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1/comments",
    );
    expect(actualData).toHaveLength(2);
    expect(actualData).toEqual([mockComments[0], mockComments[1]]);
  });
});
