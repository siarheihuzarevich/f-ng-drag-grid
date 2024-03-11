# @foblex/ng-drag-grid

`@foblex/ng-drag-grid` is an Angular library designed for creating complex interfaces with drag-and-drop capabilities, perfect for implementing calendars, task boards, and other applications where item movement is required.

[CALENDAR EXAMPLE](https://github.com/siarheihuzarevich/f-ng-calendar-demo)

## Features

1. Easy-to-integrate grid with drag-and-drop support.
2. Flexible customization options for cells and items.
3. Move event handling for additional processing logic.

## Installation

To add `@foblex/ng-drag-grid` to your project, run the following command:

```bash
npm install @foblex/ng-drag-grid --save
```

## Usage


Example:
```html
  <f-drag-grid>
    <f-header>
      <f-header-row>
        <f-header-cell>1</f-header-cell>
        <f-header-cell>2</f-header-cell>
        <f-header-cell>3</f-header-cell>
      </f-header-row>
    </f-header>
    <f-body>
      <f-body-row>
        <f-body-cell id="cell1">
          <f-cell-item id="item1">1</f-cell-item>
        </f-body-cell>
        <f-body-cell id="cell2">
          <f-cell-item id="item2">2</f-cell-item>
        </f-body-cell>
        <f-body-cell id="cell3">
          <f-cell-item id="item3">3</f-cell-item>
        </f-body-cell>
      </f-body-row>
    </f-body>
  </f-drag-grid>
```
## License

This library is distributed under the MIT License. See the LICENSE file for more information.

