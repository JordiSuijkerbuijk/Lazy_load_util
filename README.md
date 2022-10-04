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

## Notes for functionality 
- Add the option for specific for when the image should load to the util.
  - Could by done by specific loader passed to the image component... for example: 'lazy' and 'lazyAnimation'
  - Could pass a data-margin attribute to the Image component
  

## If changes is needed for this component please let me know in the slack thread
