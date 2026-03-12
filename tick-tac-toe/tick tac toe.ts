type Player = "x" | "o";
type Cell = Player | null;
type Status = Player | "Draw" | "InGame";

type GameState = {
  board: Cell[];
  currentPlayer: Player;
  status: Status;
};

type GameAction = { type: "MOVE"; index: number } | { type: "RESET" };

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "x",
  status: "InGame",
};

const winningStreak = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getStates = (board: Cell[], lastPlayer: Player): Status => {
  const isWin = winningStreak.some((line) =>
    line.every((idx) => board[idx] === lastPlayer),
  );

  if (isWin) return lastPlayer;
  if (board.every((cell) => cell !== null)) return "Draw";
  return "InGame";
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "RESET":
      return initialState;

    case "MOVE": {
      const { index } = action;
      const { board, currentPlayer, status } = state;
      if (
        status !== "InGame" ||
        board[index] !== null ||
        index < 0 ||
        index > 8
      ) {
        return state;
      }

      const newBoard = board.map((cell, i) =>
        i === index ? currentPlayer : cell,
      );

      return {
        board: newBoard,
        currentPlayer: currentPlayer === "x" ? "o" : "x",
        status: getStates(newBoard, currentPlayer),
      };
    }
    default:
      return state;
  }
};

const createStore = <T, A>(
  initialState: T,
  reducer: (state: T, action: A) => T,
) => {
  // This is the private "Source of Truth"
  let state: T = initialState;

  return {
    // The only way to update state
    dispatch(action: A) {
      state = reducer(state, action);
    },

    // The only way to read state
    currentState() {
      return state;
    },
  };
};

const game = createStore(initialState, gameReducer);
game.dispatch({ type: "MOVE", index: 4 });
game.dispatch({ type: "MOVE", index: 0 });
game.dispatch({ type: "MOVE", index: 1 });
game.dispatch({ type: "MOVE", index: 3 });
game.dispatch({ type: "MOVE", index: 7 });

const finalState = game.currentState();
console.log(finalState.board);
if (finalState.status === "InGame")
  console.log(`Next Turn: ${finalState.currentPlayer}`);
console.log(`Status: ${finalState.status}`);
