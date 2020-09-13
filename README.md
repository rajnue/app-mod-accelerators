# app-mod-accelerators

Repository for App Mod Accelerators. The accelerators are supposed to be tech area specific, residing under different branches of this repository. An accelerator will have 

- Guidelines
- Starter project template (s)


# Angular
Angular Accelerators
- Page layout
  -Header
  -Footer
- Bootstrap css
- Components
- Routing & Navigation module
- Lazy loading  - modules
- Auth guard
- Interceptros
- Exception handling
- Http Services
- State management  Ngrx/Redux
- Custom directives
- Custom Pipes
- Template forms / Reactive forms
- In memory db
- Unit test - karma/jasmine 
- TSLint / ESLint
- AOT Build
- Containerization - Docker


### How to start locally
#### Install packages
- npm install

#### Start local Json DB (Go inside "app" folder)
- json-server --watch db.json

#### Now, all set and we can start application, by using command
- ng serve 

#### For environment(dev, staging(itg), production) specific command
- ng serve -c=itg  
