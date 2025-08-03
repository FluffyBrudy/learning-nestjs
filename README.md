# learning

#1. initialized project using

#### since i am in current dir already i used period(.) insted of project name

```bash
nest new .
```

#2. installed:

- @nestjs/typeorm
  -looking docs it says: 'provides integration wrapper for typeorm'. `forRoot` method comes from this package
  - feat: dependency injection for repository(not sure what repository is, learning soon)
- typeorm: ORM library itself
- @nestjs/config: helps in config and load env vars
- pg: db driver for postgresql

#3. configure global configuration

#### ⚠️ the explanation below is not standard but what i understood. to be honest the flow is too magical and is difficult to understand compared to expressjs. feel free to create pull request for recommendation or correct the information

- configure module and configure typeorm and setup postgres database
- In `app.module.ts` in imports array we setup config for loading env variables and setup for ORM as well.
  - add and call ConfigModule.forRoot as first item as ConfigModule.forRoot() with or without option, for basic use providing no parameter is sufficient
  - secondly setup for typeorm, we use `forRootAsync` because not service is asynchronous, so it help to build config dynamically. then we specify config service which is injection for the useFactory. (this depend on ConfigModule to be initialized first so ConfigModule has to exist)
    **In conclusion, the order:**
    - Load ConfigModule (loads env config)
    - instantiate ConfigService
    - inject the configService instance into factory
    - **important part is that it this async suffix is used for dynamic config at runtime**
