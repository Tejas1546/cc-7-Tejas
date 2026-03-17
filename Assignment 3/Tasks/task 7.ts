type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export class APIService {
  /**
   * fetchPost() is a api function defined in the APIService class that fetches data via POST operation
   * @param id number to fetct post the particular id
   * @returns a object that is returned via post operation under a Promise wrapper
   */
  async fetchPost(id: number): Promise<Post> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    if (!response.ok) throw new Error(`Issue to fetch the post ${id}`);
    return response.json();
  }

  /**
   * fetchComments() is a api function defined in the APIService class that fetches particular comments data via POST operation
   * @param id number to fetct post comments of the particular id
   * @param conut number of comments to fetch from the @param id
   * @returns a array of comments objects under the Promise wrapper
   */
  async fetchComments(id: number, conut: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );
    if (!response.ok) throw new Error(`Issue to fetch the comments ${id}`);
    const comments = await response.json();
    return comments.slice(0, conut);
  }
}

//console testing
const apiService = new APIService();
const post = await apiService.fetchPost(1);
console.log(post);
const comments = await apiService.fetchComments(1, 2);
console.log(comments[0]);
