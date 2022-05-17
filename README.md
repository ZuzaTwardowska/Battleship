# Battleship

## Description
Application consists of two modules: simulation and game. In this battleship, 
ships can be placed next to each other but they cannot overlap. Ships to be arranged by each player:
- 1 x 5 segments
- 2 x 4 segments
- 3 x 3 segments
- 4 x 2 segments

## How to run

#### Makefile
In main folder run:
```
make run
```

#### Docker
In main folder run:
```
docker-compose up --build
```

#### Other
In battleship-folder run:
```
dotnet run
```
In battleship-frontend run:
```
npm start
```

### React application

Application can be accessed on http://localhost:3000.

## Tests
In order to run tests, in battleship-backend folder run:
```
dotnet test
```

## Technologies
- React
- .Net
- Docker
