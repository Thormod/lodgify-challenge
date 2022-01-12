Open LodgifyHTML as a project to get started

The following instructions use Bash, so make sure to install Git Bash before running the commands.

1. Download Node.js from https://nodejs.org/es/download/ and then execute "$ npm run install-all". 
2. You will need to start a local server to run tests, execute "$ npm run dev-server" in a different terminal, leave this terminal open.
3. To run your test, you should test files inside "cypress/integration/testName.test.js" (where "testName" is the name of the test you're adding).
4. Run the tests with $ "npm run cy:run"
5. You should be able to run and check tests results with these steps, now you can proceed with the requirements below, which you will also find in the Test file.
6. You can create folders for selectors anywhere, the whole structure is up to you, try not to hardcode and create a clean test structure.
7. Make sure to do smart waits in case slowness on services.
8. Tests should be able to run on any environment.

## How we'd like to receive the solution?

Clone this repository and upload it as a new public repository in your GitHub account
Create a new branch in your repository
Create a pull request with the requested functionality to unchanged master branch in your repository
Share link to the PR with us

Quick start commands:
## Installing
```
$ npm run install-all
```
## Starting mock up server (leave a terminal open for this command, and run the test in another terminal)
```
$ npm run dev-server

Note: by default, server.js is using your port 8080, feel free to change it in case you're using it for something else, port 3000 would also be a good alternative. (node server/server.js)
```
## Execute Tests
```
$ npm run cy:run
```

Challengue Requirements:

Two HTML files are provided:

*Pricing page: This page allows the users to select different pricing options.
*Contact page: This page allows the users to fill a form and then send an email.

These simpler version of those pages will require you to add the following tests:

Steps:

1. On "Lodgify Pricing" page, add a test to verify that the "Yearly" plan selecting 50 rentals displays: 
   $64 for Starter plan
   $375 for Professional plan
   $525 for Ultimate plan
2. On "Lodgify Pricing" page, add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options. 
   The way you do so, and the extra verification steps are up to you (such as verifying the currency price difference)
3. Using your own criteria, add tests according to what you think should be important to cover in this page "Lodgify Pricing". (Optional)
4. On "Contact" page, add a test to verify that the field validations appear according to the following requirements. 
   "Name" is mandatory and a message should be displayed in case this field is left empty
   "Phone number" is mandatory and a message should be displayed in case this field is left empty
   "Email address" is mandatory and a message should be displayed in case this field is left empty
   "Comment" is mandatory and a message should be displayed in case this field is left empty
   This test should pick the date of arrival "April 14th" and date of departure "June 14" to verify the datepicker is working as expected
   This test should also add a random Lorem Ipsum of your choice to "Comment" field
5. Using your own criteria, add tests according to what you think should be important to cover in this page "Contact". (Optional)


IMPORTANT NOTE: Some tests, if followed the requirements correctly, will fail. For those, add an example of a bug report in the test document. 


## Troubleshooting

Using the provided steps, everything should work as explained, if not, make sure your Node.js is updated. In case you have any issues with Webdriver.io, you can always install another webframework like Express. In these cases, please also add extra information in the README. 

In case you change your configuration, make sure to change your package.json file to run accordingly to avoid any kind of troubles or incompatibilities.

Good luck!

# Challenge Lodgify
## Testing:
Se usó cypress para realizar los tests, básicamente mi premisa fue realizar una prueba de integración donde simularamos una interacción real pero interceptando todos los llamados al backend o terceros y aparte revisando los elementos de la página, en el caso del slider usando TDD. Opté por usar `data-automation` en vez de usar selectores CSS o del DOM porque estos le aportan mantenibilidad a la prueba (cuando fue posible). También usé una especie de page object model sin ser propiamente POM.
Para correr las pruebas headless debes correr:
```
npm run cy:ci
```
Para correr las pruebas headed debes correr:
```
npm run dev-server
y en otra terminal
npm run cy:open
y seleccionar la prueba
```

Utilicé el modulo `start-server-and-test` para iniciar el servidor y las pruebas al mismo tiempo.
## CI/CD:
Quisé agregar adicionalmente una simulación de CI/CD.
Se usó circleci como CI, toda la configuración se encuentra en `.circleci/config.yml`, creé varios Jobs que considero son básicos para mantener integridad del código, como lo son:
- Instalar las dependencias
- Un lint del commit (que realizo en el pre-commit con husky) (para usar la sintaxis de los commits y generar la versión de manera automática usando `semantic-release`) y una revisión de licencias de las librerías.
- Pruebas de integración -> Opté por las pruebas de integración porque son las que mejor revisan el sistema, estamos realmente realizando una interacción real con el sistema sin dejar de ser pruebas de bajo nivel, rápidas y efectivas.

Cada vez que un desarrollador crea una rama y envía un commit, circleci tiene un webhook que escucha y ejecuta los workflows según sea el caso (si es la rama principal ejecuta el build de la imagen).
También configuré los branch protection rules para que no se pueda mergear nada sin que pasen las pruebas y sin que haya un PR.

## Semantic release:
Se usa para generar la versión que vamos a desplegar a partir de la sintaxis del commit que se mergee a la rama principal, en este caso configuré github para que solo permita squash and merge y solo llegue un commit. También instalé una herramienta de apoyo al desarolllador que permite crear commits con la sintaxis adecuada (siguiendo el estándar), para ello deben correr:
```
npm run commit
```
Cuando se corre el semantic release en el CI, el genera una imagen a partir del commit y crea un tag y un release en github, y usando esa misma versión se puede tagear la imagen para que todos esten relacionados con la misma versión.

## Nota:
1: Sobre los errores de la aplicación, aparte de los errores de CORS (que no considero que se deban reportar porque andamos en un ambiente local y esas URL se deben interceptar), me hubiera gustado ver más sobre el backend, también tengo experiencia desarrollando pruebas de integración en jest, usualmente usando docker y otras herramintas.
2: Usé un comando de cypress que hace un bypass a los errores, no es para uso cotidiano, solo para la realización de este reto.
3: Me hubiera gustado invertirle más tiempo, pero estoy en semana de despliegues y no tengo mucho tiempo disponible, porque son muchos sitios y nos exijen una regresión. Cualquier duda siempre a la ordén. También, de antemano muchas gracias por la oportunidad!
