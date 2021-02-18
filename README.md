## Email Template Application

**Frontend**: React, Mobx, Typescript, HTML5, CSS3

**Backend**: NodeJS, ExpressJS, MySQL

## Requirement
1. Main page should have list of saved templates and button for adding new template.
2. Each Template can be modified or removed.
3. System using that third-party editor for editing templates.
4. Templates saving to backend.
5. There are few predefined tokens that can be inserted into template by your plugin for that third-party editor.
6. Root store on front is a class with mobx.
7. All should be written on TS.
8. There is possibility to show parsed template when editing it (for example, click on button in editor and some models with parsed tokens opening).

## Structure
```
- src
  - assets
  - components
  - constants
  - containers
  - models (defined interfaces that can be used in stores, react class components)
  - stores (defined stores)
  - utils
```

## Instructions
```
1. npm install
2. npm start
```
