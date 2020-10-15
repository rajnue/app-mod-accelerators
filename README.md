### app-mod-accelerators

Repository for App Mod Accelerators. The accelerators are supposed to be tech area specific, residing under different branches of this repository. An accelerator will have 

- Guidelines
- Starter project template (s)


### Angular
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
### Install packages
- npm install

#### Start local Json DB (Go inside "app" folder)
- npm install -g json-server
- json-server --watch db.json

### Now, all set and we can start application, by using command
- ng serve 

### For environment(dev, staging(itg), production) specific command
- ng serve -c=itg  

### For unit test & code coverage
- ng test

#### Code coverage result at this release was
=============================== Coverage summary ===============================
Statements   : 30.07% ( 175/582 )
Branches     : 11.76% ( 14/119 )
Functions    : 21.03% ( 45/214 )
Lines        : 26.65% ( 141/529 )
================================================================================

#### For more detailed code coverage, can view through "coverage/app/index.html" file, which will generage once you build 'ng test'
- open in browser(chrome) this file app/coverage/app/index.html

### Docker Build Image
- docker build -t patient-diagnosis-app-image .

### Run Docker Image
- docker run --name patient-diagnosis-app -d -p 8888:80 patient-diagnosis-app-image

