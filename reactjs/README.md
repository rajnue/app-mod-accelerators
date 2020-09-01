# React JS Skeleton

Starter example app with best practices.

## Prerequisite

- node version >14.0

## Setup the project

- Ensure you have recently updated Node and NPM

- Run `npm install`

## Running the project

The project includes a live-reloading static server on port `3003` (you can change the port in `package.json`), which will build, launch, and rebuild the app whenever you change application code. To start the server, run: `npm start`

## Testing

1. Project will be configured to reject any git commit which violates 95% lines code coverage via unit test.

2. All files under `src\transformers` folder must have unit tests under `__test__` & mock API response under `__mock__` folder.

3. Run `npm test` or use `jest` plugin to run/debug unit tests.

4. AAA - Arrange, Act & Assert pattern is followed to write unit tests.

5. On local git commit, build & test commands are configured to prevent faulty changes in repo.

## VS Code Recommended Plugins

VS Code is the editor of choice for most developers on this project. As such, the `.vscode/extensions.json` file specifies recommended plugins for use on the project. VS Code should prompt the user to install these plugins. This notification can be turned off if desired.

## Road Map

CLI template with customization options will be created for easier usability.

## Pending

- Project Component Aliasing
- Unit Testing
- JSON Server Setup
- docker image configuration
- bitbucket deployment configuration

## TBD

- Micro App considerations
- Micro Frontend considerations

## Contributions

Please ping/mail to raj.champaneriya@neudesic.com or leo.joy@neudesic.com for suggestions/comments/concerns/clarifications.
