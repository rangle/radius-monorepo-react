import { isEqual } from './token-parser.utils';
import { TokenLayers } from './token-parser.types';

export const compareTokenLayers = (
  snapshot: TokenLayers,
  update: TokenLayers,
  showValueDifferences: boolean
) => {
  const messages: string[] = [];
  {
    const layerOrderMap = new Map(
      snapshot.order.map((name, index) => [name, index])
    );
    const updatedExisingOrder = update.order.filter((l) =>
      layerOrderMap.has(l)
    );
    updatedExisingOrder.forEach((tokenName, index) => {
      if (tokenName !== snapshot.order[index]) {
        messages.push(
          `Different order at index ${index}: ${tokenName} vs ${snapshot.order[index]}`
        );
      }
    });
  }

  const updateLayersMap = new Map(update.layers.map((l) => [l.name, l]));

  snapshot.layers.forEach((originalLayer) => {
    const updatedLayer = updateLayersMap.get(originalLayer.name);
    if (updatedLayer) {
      if (!isEqual(updatedLayer.parameters, originalLayer.parameters)) {
        messages.push(`Different parameters in layer ${originalLayer.name}`);
      }
      {
        const variablesMap = new Map(
          updatedLayer.variables.map((v) => [v.key, v])
        );

        originalLayer.variables.forEach((originalVariable) => {
          const updatedVariable = variablesMap.get(originalVariable.key);
          if (!updatedVariable) {
            messages.push(
              `Variable removed in layer ${originalLayer.name}: ${originalVariable.key}`
            );
          } else if (showValueDifferences) {
            if (updatedVariable.value !== originalVariable.value) {
              messages.push(
                `Different variable value in layer ${originalLayer.name} for ${updatedVariable.key}
    Expected: ${originalVariable.value}
    Found: ${updatedVariable.value}`
              );
            }
          }
        });
      }
    } else {
      messages.push(`Missing layer ${originalLayer.name}`);
    }
  });
  return messages;
};
