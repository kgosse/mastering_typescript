# Mastering-TypeScript - Slice-it Pizza (Web App)

The client-side portion of slice-it pizza's order management website.

The web-app uses the [flux](https://facebook.github.io/flux/) application architecture and the [react](https://facebook.github.io/react/) library.
React is used because static typing is achieved by bringing the view into tsx files.

See `../readme.md` for more details.

## Structure

```
~web-app
|---_dist - All files created by the build go here.
|---_src
|   |--- less - Styling. Less code (http://lesscss.org/)
|   |---_scripts
|   |   |--- actions - Flux actions. Used with app-dispatcher.ts to define and raise events in the application
|   |   |--- components - Base react components (textboxes, buttons, etc.)
|   |   |--- config - Configuration for application
|   |   |--- pages - React components that represent the pages of the website (ex. food-item-list.tsx)
|   |   |--- resources - Functions that translate enums to strings
|   |   |--- server - Files copied over from the server. Includes auto-generated code used to communicate with the server
|   |   |--- stores - Flux stores. Keeps track of data in the application
|   |   |--- utils - Misc utils classes and decorators used by the rest of the application
|   |   |
|   |   |--- app-dispatcher.ts - Flux dispatcher for web-app. Actions are listened for and raised centrally by this class
|   |   |--- main.tsx - Main view file that listens for page change actions and displayes the appropriate page
|   |   |--- server.ts - Re-exports for server folder
|   |   |--- server-factory.ts - Factory that creates instances of classes used to communicate with the server
|   |   |--- stores.ts - Re-exports for stores folder
|   |   └--- utils.ts - Re-exports for utils folder
|   |--- tests - Tests for the application
|   |
|   |--- index.html - The only html file for the application. Defines a simple layout,
|   |                 loads the styles, and loads the main script file.
|---_typings
|   |--- tsd.d.ts - Contains references to all typescript definition files
|   └--- **/*.d.ts - TypeScript definition files
|
|--- bower.json - bower configuration (http://bower.io/docs/creating-packages/)
|--- gulpfile.js - Build script (https://github.com/gulpjs/gulp)
|--- package.json - npm configuration (https://docs.npmjs.com/files/package.json)
|--- readme.md - Overview of the application
|--- tsconfig.json - Typescript compiler options used by the typescript compiler
|                    in gulpfile.js (https://github.com/Microsoft/typescript/wiki/tsconfig.json)
|--- tsd.json - tsd configuration (http://definitelytyped.org/tsd/)
└--- tslint.json - tslint configuration (https://www.npmjs.com/package/tslint)
```
