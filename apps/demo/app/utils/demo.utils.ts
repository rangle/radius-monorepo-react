import { useEffect } from 'react';

type VoidCallback = () => void;
const voidCallback = () => {};

/**
 * Special computed token, that currently doesn't come from Figma and is filled
 * with `brand` or the event's path
 */
const brandOrEventToken = '{--brandOrEvent}';
/** Event tokens to look for to identify if an event is active */
const events: any = [];

export const useMutationObserver = () => {
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
      // console.log('OBSERVING', element);
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
          const targetSelector =
            element.getAttribute('data-radius-target-selector') || 'img';
          // attribute to replace
          const targetAttribute =
            element.getAttribute('data-radius-target-attribute') || 'src';
          // string with tokens to replace with their values
          const replaceValue =
            element.getAttribute('data-radius-replace-value') || '';
          // get the element
          const targetElementsToReplace = element.querySelector(targetSelector);
          if (!targetElementsToReplace) return;

          // obtain the current computed value of the css variable for the element
          // -- this is a preliminary solution. if the resolved values for *this* element are not correct, we will need to obtain them for every target element
          const references = [...(replaceValue?.match(/\{--[\w]*\}/g) ?? [])];

          /** Cached computed styles to avoid recomputation */
          const computedStyle = getComputedStyle(element);
          const computedValues = references.reduce((acc, token) => {
            const event = events.find((e: any) =>
              computedStyle.getPropertyValue(e)
            );
            if (token === brandOrEventToken) {
              return {
                ...acc,
                [brandOrEventToken]: event ? event.replace(/^--/, '') : 'brand',
              };
            }
            return {
              ...acc,
              [token]: computedStyle.getPropertyValue(
                token.replace(/\{|\}/g, '')
              ),
            };
          }, {} as Record<string, string>);

          const newValue = replaceValue.replace(
            /\{(--[\w]*)\}/g,
            (_match, token) => computedValues[`{${token}}`] || ''
          );

          // console.log('references:', references);
          // replace the tokens with their values
          // console.log('computedValue:', computedValues);
          // console.log('replace:', replaceValue, newValue);
          targetElementsToReplace.setAttribute(targetAttribute, newValue);
        });
        // console.log('CHANGED', elementsToChange.length, 'elements');
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
