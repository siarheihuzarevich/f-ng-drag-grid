export function isDragHandle(element: HTMLElement | SVGElement): boolean {
  const dragHandle = getClosestDragHandle(element);
  return !!dragHandle && !isElementOrParentExcluded(element);
}

function isElementOrParentExcluded(element: HTMLElement | SVGElement): boolean {
  const isContains = isElementContainsClass(element);
  const parentElement = (element.parentElement as HTMLElement);
  const dragHandle = getClosestDragHandle(parentElement);
  if (!isContains && !!dragHandle) {
    return isElementOrParentExcluded(parentElement);
  }
  return isContains;
}

function getClosestDragHandle(element: HTMLElement | SVGElement): HTMLElement {
  return element.closest('.f-drag-handle') as HTMLElement;
}

function isElementContainsClass(element: HTMLElement | SVGElement): boolean {
  return element.classList.contains('f-drag-handle-disabled');
}
