# Technos-web-project
A web application designed to manage a personal timetable.

## How to deploy ?

The usage of this app is as simple as running a single script.

### Global application deployement

You need to go to the root directory and simply execute the following command :

For Linux and Mac environnments :
```bash
chmod +x ./deploy.sh && ./deploy.sh
```

For Windows environnements :
```powershell
.\deploy.ps1
```

### Partial application deployment

Several options are available if you only need some parts of the application.
- **Backend development :** You'll only need the backend stack containing the postgres, redis and pgadmin containers. 
You can obtain them uing the following commands :

Linux and MacOS :
```bash
cd ./backend
chmod +x ./build.sh && ./build.sh
```
Windows :
```powershell
cd .\backend
.\build.ps1
```

*You can also test the container of the API by using the "bundle" argument.*

- **Frontend development :** You'll only need the backend stack containing the postgres, redis and pgadmin containers.
  You can obtain them uing the following commands :

Linux and MacOS :
```bash
cd ./frontend
chmod +x ./build.sh && ./build.sh
```
Windows :
```powershell
cd .\frontend
.\build.ps1
```

*You can also test the container of the Angular application by using the "production" argument.*

## How to use ?

There are several components :
- PgAdmin : A database explorer. It is available on the following address : http://localhost:8080
- Postgres : A database management system. It is available on the following address : http://localhost:5432
- Redis : A database management system mainly used for caching purposes. It is available on the following address : http://localhost:6379
- NestJS : A Javascript API. It is available on the following address : http://localhost:3000
- Angular : A web application written in angular, designed to work with the rest of the stack. It is deployed using a nginx proxy.
  - If not inside a container, it is available on the following address : http://localhost:4200
  - If inside a container, it is available on the following address : http://localhost:80, or http://localhost