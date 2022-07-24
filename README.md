# EZY Find - Ecommerce

## Project boostrap built with:
- React.js
- Next.js
- Typescript
- SCSS
- Apollo
- GraphQl
- EsLint
- Prettier
- Styled Components
- react-bootstrap

## Getting started

### Install dependencies

Run the following command to install project depedencies
```
npm install
```

### Configure environment variables

Make sure a file named `.env` (in the project root) contains the following data:

```
NEXT_PUBLIC_GRAPHQL_URL=<GraphqL API>
NEXT_PUBLIC_DOCUMENT_URL=<Assets Path>
```

## Multi domain settings
- Move the "business" and "product" folders of pages/lawyers to pages/{domain folder}

## Development

Run `npm run-script dev` to start development server
```
Multiple Domain / website solution. Command to run each website
npm run domain
npm run dev (Lawyers Build)
npm run dev:manufacturing 
npm run dev:tyre
npm run dev:panel
npm run dev:magrepair 
npm run dev:finance
npm run dev:car
npm run dev:wedding
npm run dev:christ

```
npm run-script dev:manufacturing

## Deployment

1. Run `npm run build` to build the project
2. Run `npm run start` to run the project in production mode

## Multi domain Deployment build
npm run-script build:{domain}
```
example : npm run-script build:manufacturing
```
## Environment files
.env files holds environment variables
