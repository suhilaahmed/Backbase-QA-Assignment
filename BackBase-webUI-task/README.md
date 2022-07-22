# Back-base BBlog Web - Web Assignment
An End to End Javascript UI test framework for BBlog Articles Web (CRUD operations).
## Getting Started
These instructions will get you a copy of the framework up and running up and running on your local machine for testing process.
### Prerequisites

## Setting up you local environment
An IDE like VScode or WebStorm is preferable

Install the latest testcafe using npm
```
npm install -g testcafe
```
After cloning the framework you will need to run the following steps
### Install node modules
```
npm install
```

### Create an .env file in your local working directory
The .env file should contain the following paramters:
```
BASIC_AUTH_USERNAME
BASIC_AUTH_PASSWORD
USER_EMAIL
USER_PASSWORD
```
The basic auth username and password can be found in the assignment repository.
The user email and the user password are associated with user who will sign up to BBlog.

### Run tests
After setting up your .env file, now you are ready to run the tests.
In the terminal of your IDE run on of the following commands:

#### Chrome
```
npm run test
```
#### Safari
```
npm run test-safari
```

#### Chrome Headless
```
npm run test-chrome-headless
```
#### Safari Headless
```
npm run test-safari-headless
```

#### Chrome With Report
```
npm run test-with-report
```

#### Chrome Headless With Report
```
npm run test-chrome-headless-with-report
```

### Test report
After the test suite is fully executed navigate to reports folder and check report.html to view output report.
The html report can be viewed using any browser of your choice.
