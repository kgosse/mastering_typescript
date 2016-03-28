# Mastering-TypeScript - Slice-it Pizza (Server App)

The server-side portion of slice-it pizza's order management website.

See `../readme.md` for more details.

## Structure

```
~server-app
|---_dist - All files created by the build go here.
|---_src
|   |--- config - Configuration for application. Supports custom config for tests
|   |--- models - Interfaces and enums that represent what is stored in the database
|   |--- routes - Classes whose methods represent the routes for the web server
|   |--- storage - Classes for retrieving items from the database
|   |--- tests - Tests for the application
|   |--- utils - Misc utils classes and decorators used by the rest of the application
|   |
|   |--- app.ts - Sets up the application. Configures routes and runs a webserver
|   |--- main-factory.ts - Creates instances of certain classes
|   |--- models.ts - Re-exports of models folder
|   |--- storage-factory.ts - Creates instances of storage classes
|---_resources - Default database files with prepopulated data are stored here, then
|                copied to the dist/storage/data folder during the build
|---_typings
|   |--- tsd.d.ts - Contains references to all typescript definition files
|   └--- **/*.d.ts - TypeScript definition files
|
|--- gulpfile.js - Build script (https://github.com/gulpjs/gulp)
|--- package.json - npm configuration (https://docs.npmjs.com/files/package.json)
|--- readme.md - Overview of the application.
|--- tsconfig.json - Typescript compiler options used by the typescript compiler
|                    in gulpfile.js (https://github.com/Microsoft/typescript/wiki/tsconfig.json)
|--- tsd.json - tsd configuration (http://definitelytyped.org/tsd/)
└--- tslint.json - tslint configuration (https://www.npmjs.com/package/tslint)
```
