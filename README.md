# yuki-swapife

Small Webpage to explore planet information from [SwAPI](https://swapi.dev/)

Written in Typescript and Vue, with some Tailwind thrown in.

## Project Setup

### Quick(er) Demo with Docker

```sh
docker build -t starwarslaurenbergeron .
```

then,

```sh
docker run -p 80:80 starwarslaurenbergeron
```

This builds the project using Docker and allows you to access by navigating to [localhost](http://localhost/)

### Basic IDE Flow

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


## Side Notes
- When I was working on this, it looked like the `schema` endpoint was down for the main planet functionality, so I ended up hardcoding interfaces instead of getting it/them dynamically from the schema from swAPI
  
- I went  with a kind of lazy-loading setup on the `Planets List`, Ideally if this was meant to be used on a large scale, something that allows for filtering/better searching would be ideal; however I found the api endpoints provided to be not entirely perfect for such a thing
    - `planets` endpoint returns a paginated list of full planet objects in some order, with no reference to id etc, instead of a simpler (Id + name) or basic information which can then be used to get further details.
      
-  I felt like a composable for handling and consuming endpoints was best here, due to the task at hand and data not really being shared in many places on the app, a store may be more beneficial at a larger scale, or to better wrangle the data from the API
