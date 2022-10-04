/**
 * Represents lazy loading module for our image component.
 * This functionality fetches all the images with the class "lazy" and renders
 * the image once the element is intersecting.
 *
 * Source:
 * https://web.dev/lazy-loading-images/#images-inline-intersection-observer
 */
type Argument = {
  class: string;
  margin: `${number}px` | `${number}%` | `${number}rem`;
};

export default function LazyLoad(argument: Argument = { class: 'lazy', margin: '0px' }) {
  //Fetch all the images containing the lazy class
  const lazyImages = [].slice.call(
    document.querySelectorAll(`img.${argument.class}`)
  ) as NodeList[];

  let options = { rootMargin: argument.margin };

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
    },
    options);

    lazyImages.forEach(function (lazyImage: HTMLImageElement): void {
      lazyImageObserver.observe(lazyImage);
    });
  }
}
