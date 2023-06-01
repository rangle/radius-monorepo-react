import { useEffect } from 'react';

type VoidCallback = () => void;
const voidCallback = () => {};

export const useMutationObserver = (callback: VoidCallback = voidCallback) => {
  useEffect(() => {
    // Define the function that will handle the mutations
    const handleMutations =
      (callback: VoidCallback = voidCallback) =>
      (mutations: MutationRecord[], observer: MutationObserver) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            let target = mutation.target as HTMLElement;
            // Temporarily disconnect the observer to avoid infinite loop
            observer.disconnect();
            // Run the callback
            callback();
            // Reconnect the observer
            observeChanges(target, observer);
          }
        });
      };

    // Define the function that will set up the observer
    const observeChanges = (
      element: Element,
      observer: MutationObserver,
      updateElements: VoidCallback = voidCallback
    ) => {
      observer.observe(element, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['class'],
      });
      console.log('OBSERVING', element);
    };

    // Find elements that should be observed
    const elementsToWatch = document.querySelectorAll(
      '[data-radius-watch="true"]'
    );

    // Find elements that should change if any observed element changes
    const elementsToChange = document.querySelectorAll(
      '[data-radius-watch-token-changes="true"]'
    );

    // Create a new MutationObserver instance
    const observer = new MutationObserver(
      handleMutations(() => {
        elementsToChange.forEach((element) => {
          const changeCount = parseInt(
            element.getAttribute('data-radius-change-count') || '0'
          );
          element.setAttribute(
            'data-radius-change-count',
            (changeCount + 1).toString()
          );
          // selector for the element to replace
          const selector =
            element.getAttribute('data-radius-target-selector') || 'img';
          // attribute to replace
          const attribute =
            element.getAttribute('data-radius-target-attribute') || 'src';
          // token to replace with
          const token = '--asset-component-navigation-primary-logo';

          // get the element
          const elementsToReplace = element.querySelector(selector);
          if (!elementsToReplace) return;
          // obtain the current computed value of the css variable for the element
          const computedValue =
            getComputedStyle(element).getPropertyValue(token);
          console.log('computedValue:', computedValue);
          elementsToReplace.setAttribute(attribute, computedValue);
        });
        console.log('CHANGED', elementsToChange.length, 'elements');
      })
    );

    // Observe each element marked to watch
    elementsToWatch.forEach((element) => {
      observeChanges(element, observer);
    });

    // Clean up when the component is unmounted
    return () => observer.disconnect();
  }, []);
};
