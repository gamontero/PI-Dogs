
## About the project

- Develop an App using React, Redux, Node y Sequelize.

The general idea is to develop and app where you can find and create different dog breeds alongside relevant information. In addition, the main purpose is to show stacks and functionalities. It will change based technologies learned.  


<div align="center">
     <img src="https://github.com/gamontero/PI-Dogs/blob/main/images/Screen%20Shot%202021-12-22%20at%2001.01.01.png" alt="Logo" width="150" height="150">
</div>

## Getting started

 1. Fork and clone the repository. 

Minimum required versions:

 * __Node__: 12.18.3 or higher
 * __NPM__: 6.14.16 or higher

2. Install NPM packa: npm install 


boilerplate includes two folders: `api` and `client` (back-end and front-end).


## Technologies implemented:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres
- [ ] External API [the dog api](https://thedogapi.com/)

#### Frontend

Components and functionalities: 

- [ ] Landing page
- [ ] Home Page
- [ ] Searchbar
- [ ] Navbar 
- [ ] Filtering and sorting
- [ ] Paging 
- [ ] Create Breeds page: controlled form
 

#### Database

Database created to storage all breeds submitted by the client. 

- [ ] Breeds model:
  - ID 
  - Name 
  - Hight 
  - Weight
  - Life span
- [ ] Temperaments model: 
  - ID
  - Name

#### Backend

Routes: 

- [ ] __GET /dogs__:
  - List of breeds from the api and database
  
- [ ] __GET /dogs?name="..."__:
  - List of breeds matching with the input submitted by query parameter 
- [ ] __GET /dogs/{idRaza}__:
  - Send the detailed information of a particular breed and include repective temperaments
  - [ ] __GET /temperament__:
  - List of temperaments obtained from the external API and then saved into the database 
- [ ] __POST /dog__:
  - Save data submitted by the client in the controlled form. 

## Contact: 

Gustavo Montero - gusmontero@gmail.com
