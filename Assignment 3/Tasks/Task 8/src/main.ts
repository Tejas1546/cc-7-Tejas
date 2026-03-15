import "./style.css";
import gsap from "gsap";
import { APIService, type Post } from "./APIService";
import { CacheService } from "./CacheService";

type Comments = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

const apiService = new APIService();
const cacheService = new CacheService();
const BACKGROUND_COLORS = [
  "#6B5B50",
  "#2c3e50",
  "#8BA8A8",
  "#B5A882",
  "#4A5D6B",
  "#3d3b4f",
];

// --- App State ---
let currentPostId = 1;
const MAX_POSTS = 10;
let currentSliderInstance: CommentSlider | null = null;

// --- DOM Elements ---
const btnPrevPost = document.getElementById(
  "btn-prev-post",
) as HTMLButtonElement;
const btnNextPost = document.getElementById(
  "btn-next-post",
) as HTMLButtonElement;
const titleEl = document.querySelector(".slider__title") as HTMLElement;
const bodyEl = document.getElementById("post-body") as HTMLElement;
const metaEl = document.getElementById("post-meta") as HTMLElement;

// --- Utilities ---
const throttle = <T extends unknown[]>(
  callback: (...args: T) => void,
  limit: number,
) => {
  let waiting = false;
  return (...args: T) => {
    if (!waiting) {
      callback(...args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// --- The GSAP Slider Class ---
class CommentSlider {
  current: number;
  animating: boolean;
  total: number;
  comments: Comments[];
  el: HTMLElement;
  imagesEl: HTMLElement;
  slideEls: { el: HTMLElement; step: number }[];
  reducedMotion: boolean;

  // Storing our event listeners so we can remove them later!
  private onWheelHandler!: (e: WheelEvent) => void;
  private onKeyHandler!: (e: KeyboardEvent) => void;
  private onResizeHandler!: () => void;

  constructor(comments: Comments[]) {
    this.comments = comments;
    this.current = 0;
    this.animating = false;
    this.total = comments.length;

    this.el = document.querySelector(".slider") as HTMLElement;
    this.imagesEl = document.querySelector(".slider__images") as HTMLElement;

    this.imagesEl.innerHTML = "";
    this.slideEls = [];

    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const randomColor =
      BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)];
    gsap.to(this.el, { backgroundColor: randomColor, duration: 1 });

    this.buildCarousel();
    this.bind();
  }

  mod(n: number) {
    return ((n % this.total) + this.total) % this.total;
  }

  makeSlide(idx: number) {
    const div = document.createElement("div");
    div.className = "slider__slide";
    div.innerHTML = `
      <div class="comment-email">${this.comments[idx].email}</div>
      <div class="comment-text">"${this.comments[idx].body}"</div>
    `;
    return div;
  }

  getSlideProps(step: number) {
    const h = this.imagesEl.offsetHeight;
    const absStep = Math.abs(step);
    const positions = [
      { x: -0.35, y: -0.95, rot: -30, s: 1.35, b: 16, o: 0 },
      { x: -0.18, y: -0.5, rot: -15, s: 1.15, b: 8, o: 0.55 },
      { x: 0, y: 0, rot: 0, s: 1, b: 0, o: 1 },
      { x: -0.06, y: 0.5, rot: 15, s: 0.75, b: 6, o: 0.55 },
      { x: -0.12, y: 0.95, rot: 30, s: 0.55, b: 14, o: 0 },
    ];
    const idx = Math.max(0, Math.min(4, step + 2));
    const p = positions[idx];

    return {
      x: p.x * h,
      y: p.y * h,
      rotation: p.rot,
      scale: p.s,
      blur: p.b,
      opacity: p.o,
      zIndex: absStep === 0 ? 3 : absStep === 1 ? 2 : 1,
    };
  }

  positionSlide(slide: HTMLElement, step: number) {
    const props = this.getSlideProps(step);
    gsap.set(slide, {
      xPercent: -50,
      yPercent: -50,
      x: props.x,
      y: props.y,
      rotation: props.rotation,
      scale: props.scale,
      opacity: props.opacity,
      filter: "blur(" + props.blur + "px)",
      zIndex: props.zIndex,
    });
  }

  buildCarousel() {
    if (!this.imagesEl || this.imagesEl.offsetHeight === 0) return;
    this.imagesEl.innerHTML = "";
    this.slideEls = [];

    for (let step = -1; step <= 1; step++) {
      const idx = this.mod(this.current + step);
      const slide = this.makeSlide(idx);
      this.imagesEl.appendChild(slide);
      this.positionSlide(slide, step);
      this.slideEls.push({ el: slide, step: step });
    }
  }

  animateCarousel(direction: "next" | "prev") {
    if (!this.imagesEl || this.imagesEl.offsetHeight === 0)
      return gsap.timeline();

    const shift = direction === "next" ? -1 : 1;
    const enterStep = direction === "next" ? 2 : -2;
    const newIdx =
      direction === "next"
        ? this.mod(this.current + 2)
        : this.mod(this.current - 2);

    const newSlide = this.makeSlide(newIdx);
    this.imagesEl.appendChild(newSlide);
    this.positionSlide(newSlide, enterStep);
    this.slideEls.push({ el: newSlide, step: enterStep });

    this.slideEls.forEach((s) => {
      s.step += shift;
    });

    const duration = this.reducedMotion ? 0.01 : 1.2;
    const tl = gsap.timeline({
      onComplete: () => {
        this.slideEls = this.slideEls.filter((s) => {
          if (Math.abs(s.step) >= 2) {
            s.el.remove();
            return false;
          }
          return true;
        });
      },
    });

    this.slideEls.forEach((s) => {
      const props = this.getSlideProps(s.step);
      s.el.style.zIndex = props.zIndex.toString();
      tl.to(
        s.el,
        {
          x: props.x,
          y: props.y,
          rotation: props.rotation,
          scale: props.scale,
          opacity: props.opacity,
          filter: "blur(" + props.blur + "px)",
          duration: duration,
          ease: "power3.inOut",
        },
        0,
      );
    });

    return tl;
  }

  go(direction: "next" | "prev") {
    if (this.animating) return;
    this.animating = true;
    const master = gsap.timeline({
      onComplete: () => {
        this.current =
          direction === "next"
            ? this.mod(this.current + 1)
            : this.mod(this.current - 1);
        this.animating = false;
      },
    });
    master.add(this.animateCarousel(direction), 0);
  }

  bind() {
    this.onWheelHandler = throttle((e: WheelEvent) => {
      if (this.animating) return;
      this.go(e.deltaY > 0 ? "next" : "prev");
    }, 1500);
    window.addEventListener("wheel", this.onWheelHandler, { passive: true });

    this.onKeyHandler = (e: KeyboardEvent) => {
      if (this.animating) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") this.go("next");
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") this.go("prev");
    };
    window.addEventListener("keydown", this.onKeyHandler);

    this.onResizeHandler = debounce(() => {
      if (!this.animating && this.imagesEl.offsetHeight > 0) {
        this.slideEls.forEach((s) => {
          this.positionSlide(s.el, s.step);
        });
      }
    }, 300);
    window.addEventListener("resize", this.onResizeHandler, { passive: true });
  }

  // --- NEW: Clean up the old listeners so they don't stack up! ---
  destroy() {
    window.removeEventListener("wheel", this.onWheelHandler);
    window.removeEventListener("keydown", this.onKeyHandler);
    window.removeEventListener("resize", this.onResizeHandler);
  }
}

// --- App Loading Logic ---
async function loadPost(id: number) {
  btnPrevPost.disabled = id === 1;
  btnNextPost.disabled = id === MAX_POSTS;

  metaEl.textContent = `LOADING POST #${id}...`;
  titleEl.textContent = "Loading...";
  bodyEl.textContent = "Fetching data...";

  try {
    const postCacheKey = `post-${id}`;
    const commentsCacheKey = `comments-${id}`;

    let post: Post;
    let comments: Comments[];

    if (cacheService.has(postCacheKey)) {
      post = cacheService.get<Post>(postCacheKey)!;
    } else {
      post = await apiService.fetchPost(id);
      cacheService.set(postCacheKey, post);
    }

    if (cacheService.has(commentsCacheKey)) {
      comments = cacheService.get<Comments[]>(commentsCacheKey)!;
    } else {
      comments = await apiService.fetchComments(id, 5);
      cacheService.set(commentsCacheKey, comments);
    }

    metaEl.textContent = `POST #${id} OF ${MAX_POSTS}`;
    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    if (currentSliderInstance) {
      currentSliderInstance.destroy();
    }
    currentSliderInstance = new CommentSlider(comments);
  } catch (error) {
    console.error("Failed to load post:", error);
    titleEl.textContent = "Error";
    bodyEl.textContent = "Could not load the data.";
  }
}

btnPrevPost.addEventListener("click", () => {
  if (currentPostId > 1) {
    currentPostId--;
    loadPost(currentPostId);
  }
});

btnNextPost.addEventListener("click", () => {
  if (currentPostId < MAX_POSTS) {
    currentPostId++;
    loadPost(currentPostId);
  }
});

document.addEventListener("DOMContentLoaded", () => loadPost(currentPostId));
