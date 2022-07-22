
# Backbase BBlog API - API Assignment
An API TypeScript testing framework for BBlog Articles API (CRUD operations).
## Getting Started
These instructions will get you a copy of the framework up and running up and running on your local machine for testing process.

### Prerequisites

## Setting up you local environment
An IDE like VScode or WebStorm is preferable
After cloning the framework you will need to run the following steps:
In your local working directory:
### Install node modules
```
npm install
```
### Create an .env file in your local working directory
The .env file should contain the following paramters:
```
BasicAuth_USERNAME
BasicAuth_PASSWORD
EMAIL
PASSWORD
```
The basic auth username and password can be found in the assignment repository.
The Email and the password are associated with user who will sign up to BBlog.

### Run tests
After setting up your .env file, now you are ready to run the tests.
In the terminal of your IDE run the following command: 

```
npm run test
```

### Test report
After the test suite is fully executed in the terminal you will be able to view the generated test report.
Under the root directory you can open the following html report in any browser:

```
test-report.html
```
