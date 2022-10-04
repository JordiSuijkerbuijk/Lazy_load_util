/**
 * Represents lazy loading module for our image component.
 * This functionality fetches all the images with the class "lazy" and renders
 * the image once the element is intersecting.
 *
 * Source:
 * https://web.dev/lazy-loading-images/#images-inline-intersection-observer
 */
export default function LazyLoad() {
  //Fetch all the images containing the lazy class
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy')) as NodeList[];

  if ('IntersectionObserver' in window) {
    const lazyImageObserver: IntersectionObserver = new IntersectionObserver(function (
      entries: IntersectionObserverEntry[]
    ) {
      entries.forEach(function (entry: IntersectionObserverEntry): void {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          // When intersecting and the image exists set the src or srcSet if
          // they exist
          if (lazyImage !== null) {
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              delete lazyImage.dataset.src;
            }
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
              delete lazyImage.dataset.srcset;
            }
            //Remove the class and data sources from the image afterwards.
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    lazyImages.forEach(function (lazyImage: HTMLImageElement): void {
      lazyImageObserver.observe(lazyImage);
    });
  }
}
