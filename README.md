# Lazy_load_util
This branch contains a default implementation for lazy loading images

## Remix implementation
The lazy load functionality should be added to the util folder in your project.

To implement this util use the transition hook from remix in your root.tsx as a trigger for a useEffect that will call the lazyload util. This will ensure on navigation the new images will be fetched.

```javascript
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === 'idle') {
      LazyLoad();
    }
  }, [transition]);
```

## Image component
There is not a lot needed for your specific Image component but keep in mind that some parts are mandatory, and the component should look something along the lines of this:

```javascript
export default function Image({ src, srcSet, alt, loading = 'lazy', className = '' }) {
  return (
    <img data-src={src} data-srcset={srcSet} alt={alt} className={clsx([className, loading])} />
  );
}
```

## If changes is needed for this component please let me know in the slack thread
