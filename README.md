# yuki-swapife

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

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
