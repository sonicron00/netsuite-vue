# netsuite-vue

## Project setup

```
npm install (in the App directory)
```

## Setting up SDF

JDK 11 is required - https://www.oracle.com/uk/java/technologies/javase-jdk11-downloads.html

`npm install -g @oracle/suitecloud-cli`

CD into the `sdf` directory and run:

`npm install` (again for this new directory as the suitecloud tool has own package.json)

then

`suitecloud account:setup`

You will need to rename the `vue-app-test` folder as it needs to be unique for the NetSuite file cabinet.

Once renamed, you should modify the `repoName` const defined in postBuild.js

You will need to define the script & script deployment via XML in the Objects directory.

## Development

The generic RESTlet must be re-named to something unique otherwise you'll face errors when deploying via SDF.

The RESTlet URL must then be replaced in `app/src/helpers/index.ts`

Any logic must be written as an 'action' within the `actions` folder located under the project folder.

Example Request:

```typescript
import { REST } from './helpers'

const employees = REST.get({action: 'getEmployees'})
    employees.then((result) => {
        console.log(result);
    })
```

This would make a GET request to the RESTlet and trigger the 'getEmployees' action that has been defined as an example.

### Compiles and hot-reloads for development
```

npm run start

```

### Compiles and minifies for production
```

npm run build - must be executed in both app & sdf directories.

````

### Deploy to NetSuite Account

Within the 'sdf' directory

`npm run deploy`
