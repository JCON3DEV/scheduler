# Interview Scheduler

A scheduler app that allows you to choose a time and day for an appointment with an instructor. You can edit your details or cancel an existing interview.
The remaining slots for the chosen day are displayed and update according to any changes in bookings.

You can see the finished project hosted on [Netlify](https://jcon3dev-interview-scheduler.netlify.app/). Alternativly see below for installation instructions.

## Continuous Intergration 
Although a solo project, the pipeline for this project was setup using CircleCI to ensure that all testing cases were met throughout development. 

## Technologies used;
React, Webpack, Axios as well as Storybook, Jest, React Testing Library and Cypress.


## Screenshots

!["Main Dashboard"](https://github.com/JCON3DEV/scheduler/blob/master/docs/main_dashboard.png)
!["Editing Appointments"](https://github.com/JCON3DEV/scheduler/blob/master/docs/edit_apointment.png)
!["Deleting Appointments"](https://github.com/JCON3DEV/scheduler/blob/master/docs/deleting_appointment.png)

## Setup

Install dependencies with `npm install`.
```Important: This requires an APi server to run simultaneously with the webpack server in order to provide data for the axios requests. The api server can be downlaoded from [here](https://github.com/JCON3DEV/scheduler-api)```

## NPM commands

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cyprus for End to End Testing

```sh
npx cypress run
```
