# Moo Movie React Version

## Overview

This Project is simple app which display information like movie (list and detail). This Project Consume some available service API

Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). and with some magic tool like typescript

## Project Requirements Before Setup

-   Node (>= 10.16.0)
-   NPM (>= 6.9.0)
-   Yarn (1.22.5)
-   Typescript (>=4.1.2)

## Installing (Via Github)

Clone Repo

```
git clone https://gitlab.com/hamdankun/moo-movie.git
```

Go To Project Directory

```
cd moo-movie
```

Create some environment

```
touch .env.local
```

Fill `.env.local` whit this

```
REACT_APP_API_URL=https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1

```

install depedencies & run application with command

```
yarn install && yarn start
```

and then, open <a href="http://localhost:3000">http://localhost:3000<a/> in google chrome (prefered)

build production and run production build with serve

```
yarn build & serve /build
```

#### File Structure

```
moo-movie
|   .prettierrc
|   docker-composer.yaml
|   package.json
|   README.md
|   tsconfig.json
|   yarn.lock
└───src/ <-- This is where you put your app files.
|   |   api/ <-- list of api put in here
|   |   assets/ <-- such as image etc put in here
|   |    |  images/
|   |   components/ <-- global/common component put in here
|   |   config/ <-- some global config for app put in here
|   |   helpers/ <-- some function to use in any components put in here
|   |   libraries/ <-- some custom libraries put in here
|   |   pages/ <-- all page in application put in here
|   |   redux/ <-- reducers, actions & store (state management) put in here
|   |   |   redux/actions/
|   |   |   slices/ <-- our reducers put in here
|   |   |   store.ts <-- our collect reducers
|   |   router/ <-- configuration router and navigation puth in here
|   |   theme/ <-- some global styles for any components
│   │   App.tsx <-- sub entry point before index.tsx
|   |   index.tsx <-- entry point
|   |   react-app-env.d.ts
|   |   reportWebVitals.ts
|   |   setupTests.ts
|   |   index.tsx // entry point
│
└───build/ # This is where your compiled production files
```

## Functionality overview

This Project just a application which display information list movie and detail movie, consume API from `third-party`

#### User Interface (UI)

To create the UI, this project uses the `JSX` technology come from ReactJS
and `virtual-dom` for performance purposes
and some library `third-party` such as `material icon`,
<b>for now IS NOT SUPPORTED FOR RESPONSIVE</b>

#### State Management

for state management this project use utility library named `@reduxjs/toolkit` (official redux)
and for integration between redux and ui, this project use `react-redux`

#### HTTP Request (making request API)

for do a some request api, this project use library call as `axios`, its simple and lightweight for http client library, easy to use dan easy for custom

#### General functionality

-   Get List Movie
-   Get Detail Movie

#### The general page breakdown looks like this:

-   `[HOST]/movies`
-   `[HOST]/movies/{movieId}`

Copyright (c) 2021, Hamdan Hanafi
