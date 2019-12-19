# DcAdmin

Matrikel-Nr: 3406999
Matrikel-Nr: 5483613

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.7.

Certain features are not yet fully developed or need some more refinement to be production ready.

You can find the complete documentation in the folder documentation. Opening index.html will provide an interface for viewing the documentation properly.
The documentation can be updated after changes by running `npm run compodoc`

## Running the application

You have to have the Chrome browser installed because the tests utilize Chrome.

1. run `npm i` to install dependencies
2. run `npm run gulp-run` to build and run docker container and to start the application
3. go to localhost:4200

After completing the build process the application needs a few seconds for the docker container to be ready. If localhost:4200 does not open the application, wait a few seconds and reload the page.

## Stopping the application

To stop the application run `npm run gulp-stop`
To start the application again run `npm run gulp-start`
To stop the application and destroy the docker containers and images run `npm run gulp-destroy`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
