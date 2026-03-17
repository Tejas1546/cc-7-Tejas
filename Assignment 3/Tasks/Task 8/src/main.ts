import { APIService, type Post } from './APIService';
import { CacheService } from './CacheService';
import { delay } from './delays';

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

const apiService = new APIService();
const cacheService = new CacheService();
let currentPostId = 1;
const totalPosts = 10;

document.addEventListener('DOMContentLoaded', () => {
  loadPost();
});

async function getPostData(id: number): Promise<Post> {
  const cacheKey = `post-${id}`;

  if (cacheService.has(cacheKey)) {
    return cacheService.get<Post>(cacheKey)!;
  }

  await delay(1000);
  const post = await apiService.fetchPost(id);
  cacheService.set(cacheKey, post);
  return post;
}

async function getCommentsData(postId: number): Promise<Comment[]> {
  const cacheKey = `comments-${postId}`;

  if (cacheService.has(cacheKey)) {
    return cacheService.get<Comment[]>(cacheKey)!;
  }

  await delay(1000);
  const comments = await apiService.fetchComments(postId, 100);
  cacheService.set(cacheKey, comments);
  return comments;
}

function getAppRoot(): HTMLElement {
  const root = document.getElementById('app-root');
  if (!root) throw new Error('Element #app-root not found');
  return root;
}

function renderLoading() {
  const root = getAppRoot();
  root.innerHTML = `
    <div class="post-meta">POST #${currentPostId} OF ${totalPosts}</div>
    <div class="loading-wrapper">
      <span class="loading-text">Loading</span>
    </div>
    <div class="pagination">
      <button class="btn-secondary" disabled>&larr; Previous</button>
      <button class="btn-secondary" disabled>Next &rarr;</button>
    </div>
  `;
  attachButtonListeners();
}

function renderPostView(post: Post, showCommentsBtn: boolean) {
  const root = getAppRoot();
  root.innerHTML = `
    <div class="post-meta">POST #${currentPostId} OF ${totalPosts}</div>
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    
    <div class="actions">
      <button id="btn-refresh" class="btn-secondary">
        <span>🔄</span> Refresh
      </button>
      ${showCommentsBtn ? `<button id="btn-comments" class="btn-primary">View Comments</button>` : ''}
    </div>

    <div id="comments-container"></div>

    <div class="pagination">
      <button id="btn-prev" class="btn-secondary" ${currentPostId === 1 ? 'disabled' : ''}>
        &larr; Previous
      </button>
      <button id="btn-next" class="btn-secondary" ${currentPostId === totalPosts ? 'disabled' : ''}>
        Next &rarr;
      </button>
    </div>
  `;
  attachButtonListeners();
}

function renderCommentsView(comments: Comment[]) {
  const container = document.getElementById('comments-container');
  if (!container) return;

  const commentsHTML = comments
    .map(
      (c) => `
    <div class="comment-card">
      <div class="comment-email">${c.email}</div>
      <div class="comment-body">${c.body}</div>
    </div>
  `,
    )
    .join('');

  container.innerHTML = `
    <div class="comments-section">
      <h3>Recent Comments</h3>
      ${commentsHTML}
    </div>
  `;
}

async function loadPost() {
  renderLoading();
  try {
    const post = await getPostData(currentPostId);
    renderPostView(post, true);
  } catch (error) {
    console.error('Failed to load post', error);
    getAppRoot().innerHTML = `<p style="text-align: center; color: red;">Failed to load post data.</p>`;
  }
}

async function loadComments() {
  try {
    const post = await getPostData(currentPostId);
    renderPostView(post, false);

    const comments = await getCommentsData(currentPostId);
    renderCommentsView(comments);
  } catch (error) {
    console.error('Failed to load comments', error);
  }
}

// --- Event Handling (Direct Bindings) ---
function attachButtonListeners() {
  const nextBtn = document.getElementById('btn-next');
  const prevBtn = document.getElementById('btn-prev');
  const refreshBtn = document.getElementById('btn-refresh');
  const commentsBtn = document.getElementById('btn-comments');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPostId < totalPosts) {
        currentPostId++;
        loadPost();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPostId > 1) {
        currentPostId--;
        loadPost();
      }
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      cacheService.clear();
      currentPostId = 1;
      loadPost();
    });
  }

  if (commentsBtn) {
    commentsBtn.addEventListener('click', () => {
      loadComments();
    });
  }
}
