### Objective

Your assignment is to build an internal API for a fake financial institution using Node and any framework.

### How to Run
We recommend to run the system with docker-compose. To install docker-compose, go to [this link](https://docs.docker.com/compose/install/) and follow the instructions for your OS. Note that for Windows and MacOS, docker-compose is included in Docker desktop. For Linux, you'd have to download both programs separately

After docker-compose is installed, follow these steps:

1. Clone this project `git clone https://trustle-iaqpie@git.codesubmit.io/trustle/banking-api-w-node-iaqpie && cd banking-api-w-node-iaqpie`
2. Execute `make run`. Running this command will build the image for run the system locally.
3. Once you executed `make run`, **wait until all the components init** (it may take a couple minutes) and access the web api through <http://localhost:8080>.

Take in account that the by default the system pre-populate the Customer table.


### TODO:
* More tests - Not finished yet!
* Add more validations on models - Not finished yet!

### OTHER TODO's:
* Add Login and authorization for api
* Maybe Add Emplooyee Model (represent employee of bank). Can manage the accounts and do transfers. Add info about who employee do the transfer for example.
* Improve historial transfer: Create a paper trail of a model (without relationships) for transfers (in order to keep versioning if instance model was deleted) - possible use of: sequelize-paper-trail npm package.
* Implement migrations and seed with sequelize-cli
* Add pagination to api (maybe use sequelize-pagination)

### Brief

While modern banks have evolved to serve a plethora of functions, at their core, banks must provide certain basic features. Today, your task is to build the basic HTTP API for one of those banks! Imagine you are designing a backend API for bank employees. It could ultimately be consumed by multiple frontends (web, iOS, Android etc).

### Tasks

- Implement assignment using:
  - Language: **Node**
  - Framework: **any framework**
- There should be API routes that allow them to:
  - Create a new bank account for a customer, with an initial deposit amount. A
    single customer may have multiple bank accounts.
  - Transfer amounts between any two accounts, including those owned by
    different customers.
  - Retrieve balances for a given account.
  - Retrieve transfer history for a given account.
- Write tests for your business logic

Feel free to pre-populate your customers with the following:

```json
[
  {
    "id": 1,
    "name": "Arisha Barron"
  },
  {
    "id": 2,
    "name": "Branden Gibson"
  },
  {
    "id": 3,
    "name": "Rhonda Church"
  },
  {
    "id": 4,
    "name": "Georgina Hazel"
  }
]
```

You are expected to design any other required models and routes for your API.

### Evaluation Criteria

- **Node** best practices
- Completeness: did you complete the features?
- Correctness: does the functionality act in sensible, thought-out ways?
- Maintainability: is it written in a clean, maintainable way?
- Testing: is the system adequately tested?
- Documentation: is the API well-documented?

### CodeSubmit

Please organize, design, test and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

The Trustle Team
