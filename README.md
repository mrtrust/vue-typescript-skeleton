# TypeScript Vue Typescript Project Skeleton

## Installing
* `fork` this repo
* `clone` your fork
* `npm install`  or `yarn install` to install all dependencies
* `npm start`  or `yarn start` to start the dev server in another tab

# Core scripts
- `npm install`  - to install modules
- `npm start` - to start local webpack-dev-server 
- `npm build:(dev|prod|all)` to build files related to enviroment, **all** option 
is to build dev&prod in the same time
- `npm run test` - to start jest test
- `npm run lint` - to run lint test


#### Notes
we use `vue-css-ts` library https://github.com/numsg/vue-css-ts
- If the style file name like error.scss, the style is a global style, and if the file name is error.module.scss, the style is a scoped style
e.g. 
```
import Styles from './error.module.scss';
import ErrorHtml from './error.html';

@Component({
    template: ErrorHtml,
    style: Styles,
    components: {
      'err-con': ErrorChildComponent
    }
})
```
