# Tic tac toe game
This project is a tic tac toe game.

It is build with React and Typescript.

## Pages
- `src/pages/start.tsx`: displays home page to allow user to select X or O
- `src/pages/game.tsx`: displays game page to allow 2 users to play the game in alternating turns.

## User Stories
- User should see button to determine if they would like to play with X or O.
- User should see game board on player selection.
- User should be able to click on squares in the board to mark their position on the board.
- User should "win" game if three squares are selected with horizontal, vertical or diagonally continuity.
- User should "tie" game if no squares are selected resulting in a win condition.
- On win or tie, user should be allowed to restart game.

## To run it locally

```
git clone https://github.com/Tsikitsiky/Tic-tac-toe

yarn install

yarn start
```

## Run cypress test
```
yarn cypress
```