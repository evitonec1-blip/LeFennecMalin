/**
 * Teleport to Top Scroll Utility
 * Instantly teleports the user's viewport to the absolute top of the page
 * across all browsers, viewports, mobile screens, and inner scrollable containers.
 */

export function teleportToTop() {
  if (typeof window === 'undefined') return;

  // 1. Instant window scroll
  try {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  } catch (_) {
    window.scrollTo(0, 0);
  }

  // 2. Root document elements reset
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }

  // 3. Reset any internal overflow containers
  try {
    const scrollContainers = document.querySelectorAll(
      '#root, main, .overflow-y-auto, .overflow-auto, [data-scroll-container]'
    );
    scrollContainers.forEach((container) => {
      container.scrollTop = 0;
    });
  } catch (_) {}

  // 4. RequestAnimationFrame fallback for deferred DOM/layout updates
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } catch (_) {
        window.scrollTo(0, 0);
      }
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });
  }

  // 5. Short timeout fallback to ensure async component renders don't keep stale scroll
  setTimeout(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    } catch (_) {
      window.scrollTo(0, 0);
    }
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, 15);
}
