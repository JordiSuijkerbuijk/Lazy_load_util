# Lazy_load_util
This branch contains a default implementation for lazy loading images

## Remix implementation
The lazy load functionality should be added to the util folder in your project.

To implement this util use the transition hook from remix in your root.tsx as a trigger for a useEffect that will call the lazyload util. This will ensure on navigation the new images will be fetched.

```
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === 'idle') {
      LazyLoad();
    }
  }, [transition]);
```
