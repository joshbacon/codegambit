import {useSelector, useDispatch} from 'react-redux';

const Gambit = () => {

  // const game = new Game()
  
  const position = useSelector(state => state.position);

  const jsChessEngine = require('js-chess-engine');
  const game = new jsChessEngine.Game(position??'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
//   console.log(game.exportJson());
  

  let action = {};
  const dispatch = useDispatch();
  if (position) {
    action = {
        type: 'SET_POSITION',
        position: getJson()
    }
    dispatch(action);
  }

  const WHITE = 'w';
  const BLACK = 'b';

  let gameStarted = false;
  let singlePlayer = true;
  let playingAs = WHITE;

  let aiLevel = 2;

  let selectedSquare = '';

  let parseCommand = (input) => {
    if (!/^[a-z]+[a-zA-Z]*\([a-zA-Z0-9]*(\,[a-zA-Z0-9]*)*\)$/.test(input)){
      return "Invalid function format.";
    }
    // clean data
    let data = input.split('(');
    let command = data[0];
    let params = data[1].split(')')[0].split(',');
    params = params.filter((str) => { return str.length > 0; });

    let result = runCommand(command, params);
    // console.log(result);
    return result;
    // return runCommand(command, params);
  }

  let runCommand = (command, params) => {
    switch(command) {
        case 'select':
            if (!gameStarted)
                return 'A game must be started to select a piece.';
            else if (params.length !== 1)
                return "select() expects 1 argument.";
            else if (getPiece(params[0]) === '')
                return "There is no piece on this square.";
            else if (!/^[A-H][1-8]$/.test(params[0]))
                return "An invalid square was given.";
            else if (!isOwnPiece(params[0]))
                return "You can only select your own pieces.";
            else {
                select(params[0].trim().toUpperCase());
                const action = {
                    type: 'SET_SELECTED',
                    selected: selectedSquare
                }
                dispatch(action);
                return '';
            }
            break;
        case 'unselect':
            if (!gameStarted)
                return 'A game must be started to unselect a piece.';
            else if (params.length !== 0)
                return "unselect() expects no arguments.";
            else if (selectedSquare === '')
                return "A square must be selected to unselect.";
            else
                select('');
                return '';
            break;
        case 'move':
            if (!gameStarted)
                return 'A game must be started to move a piece.';
            else if (selectedSquare === '')
                return 'There is no piece currently selected to move.';
            else if (params.length !== 1)
                return "move() expects 1 argument.";
            else if (singlePlayer){
                let result = move(params[0]);
                playAiMove();
                return result;
            }       
            else
                return move(params[0]);
            break;
        case 'take':
            if (!gameStarted)
                return 'A game must be started to take a piece.';
            else if (selectedSquare === '')
                return 'There is no piece currently selected to take with.';
            else if (params.length !== 1)
                return "take() expects 1 argument.";
            else if (getPiece(params[0]) === '')
                return 'There is no piece to take on this square.';
            else
                return move(selectedSquare, params[0]);
            break;
        case 'isValidMove':
            if (!gameStarted)
                return 'A game must be started to select a piece.';
            else if (selectedSquare === '')
                return 'There is no piece currently selected to check if move is valid.';
            else if (params.length !== 1 && params.length !== 2)
                return "isValidMove() expects 1 or 2 arguments.";
            else if (params.length === 1)
                return isValidMove(selectedSquare, params[0]);
            else
                return isValidMove(params[0], params[1]);
            break;
        case 'showValidMoves':
            if (!gameStarted)
                return 'A game must be started to show valid moves.';
            else if (selectedSquare === '')
                return 'There is no piece currently selected to show valid moves.';
            else if (params.length !== 0)
                return "showValidMoves() expects no arguments.";
            break;
        case 'hideValidMoves':
            if (!gameStarted)
                return 'A game must be started to hide valid moves.';
            else if (selectedSquare === '')
                return 'There is no piece currently selected.';
            else if (params.length !== 0)
                return "hideValidMoves() expects no arguments.";
            break;
        case 'showMoveHistory':
            if (!gameStarted)
                return 'A game must be started to show move history.';
            else if (params.length !== 0)
                return "showMoveHistory() expects no arguments.";
            else 
            break;
        case 'showWhiteMoves':
            if (!gameStarted)
                return 'A game must be started to show white\'s move history.';
            else if (params.length !== 0)
                return "showWhiteMoves() expects no arguments.";
            break;
        case 'showBlackMoves':
            if (!gameStarted)
                return 'A game must be started to show black\'s move history.';
            else if (params.length !== 0)
                return "showBlackMoves() expects no arguments.";
            break;
        case 'startGame':
            if (gameStarted)
                return 'You can\'t start a new game with an existing instance.';
            else if (params.length !== 0)
                return "startGame() expects no arguments.";
            else
                startGame();
                return '';
            break;
        case 'offerDraw':
            if (!gameStarted)
                return 'A game must be started to offer a draw.';
            else if (params.length !== 0)
                return "offerDraw() expects no arguments.";
            break;
        case 'resign':
            if (!gameStarted)
                return 'A game must be started to resign.';
            else if (params.length !== 0)
                return "resign() expects no arguments.";
            else
                gameStarted = false;
            break;
        case 'setFromFEN()':
            if (params.length !== 1)
                return "setFromFEN() expects 1 argument.";
            else
                setFromFEN(params[0]);
            break;
        case 'getFEN':
            if (params.length !== 0)
                return "getFEN() expects no argument.";
            else
                return getFEN();
            break;
        case 'setBoardTheme':
            if (params.length !== 1)
                return "setBoardTheme() expects 1 argument.";
            else if (!['bDark', 'bLight', 'bPurple', 'bBlue', 'bGreen', 'bOrange'].includes(params[0]))
                return '';
            else 
                localStorage.setItem('bTheme', params[0]);
                return '';
            break;
        case 'setBotDepth':
            if (gameStarted)
                return 'You can\'t change the bot depth during a game';
            else if (params.length !== 1)
                return "setBotDepth() expects 1 argument.";
            break;
        case 'playAs':
            if (gameStarted)
                return 'You can\'t change who you are playing as during a game';
            else if (params.length !== 1)
                return "playAs() expects 1 argument.";
            else if (params[0] !== WHITE && params[0] !== BLACK)
                return "Valid paramaters are w for white or b for black.";
            else
                playAs(params[0]);
                return '';
        case 'help':
            if (params.length !== 1)
                return "help() expects 1 argument.";
            break;
        case 'clear':
            return clear();
        case 'writeGame': 
            // save the game to the store
            updatePosition();
            return '';
        default:
            return "This command is not recognized.";
      }
  }

  let updatePosition = () => {
    action = {
        type: 'SET_POSITION',
        inGame: gameStarted,
        selected: selectedSquare,
        playingAs: playingAs,
        position: getJson()
    }
    dispatch(action);
  }

  let isOwnPiece = (square) => {
      let piece =getPiece(square);
      if (playingAs === WHITE){
          return piece === piece.toUpperCase();
      }else
          return piece === piece.toLowerCase();
  }

  let select = (square) => {
    selectedSquare = square;
  }

  let unselect = () => {
    selectedSquare = '';
  }

  let move = (dest) => {
    try {
      game.move(selectedSquare, dest);
    } catch (e) {
      return e;
    }
  }

  let playAiMove = () => {
    // console.log('this is definetely the error');
    console.log("game: " + getJson());
    game.aiMove(aiLevel);
    // game.aiMove(localStorage.getItem('botDepth')??2);
  }

  let take = (dest) => {
    
  }

  let isValidMove = (dest) => {
    
  }

  let getValidMoves = () => {
    
  }

  let getValidMovesSelected = (square) => {
    
  }

  let showValidMoves = () => {
    
  }

  let hideValidMoves = () => {
    
  }

  let showMoveHistory = () => {
    
  }

  let showWhiteMoves = () => {
    
  }

  let showBlackMoves = () => {
    
  }

  let startGame = () => {
    gameStarted = true;
    if (singlePlayer && playingAs === BLACK) playAiMove();
    action = {
        type: 'START_GAME',
        inGame: gameStarted,
        selected: selectedSquare,
        playingAs: playingAs,
        position: getJson()
    }
    dispatch(action);
    updatePosition();
  }

  let offerDraw = () => {
    
  }

  let resign = () => {
    
  }

  let getPiece = (square) => {
    return getJson().pieces[square];
  }

  let getPieces = () => {
    return getJson().pieces;
  }

  let getEvaluation = () => {
    
  }

  let getJson = () => game.exportJson();

  let getFEN = () => game.exportFEN();

  let setFromFEN = (FEN) => {
    game = new jsChessEngine.Game(FEN??'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  }

  let setBoardTheme = (theme) => {
    
  }

  let setBotDepth = (depth) => {
    if (depth >= 0 && depth <=3) aiLevel = depth;
  }

  let playAs = (clr) => {
    if (clr === WHITE || clr === BLACK) playingAs = clr;
  }

  let help = (cmnd) => {
    
  }

  let clear = () => {
    return [];
  }

  return {
    enterCommand: function(input) { return parseCommand(input); },
    startGame: function() { gameStarted = true; },
    selected: function() { return selectedSquare; },
    select: function(square) { return select(square); },
    unselect: function() { return unselect(); },
    move: function(dest) { return move(dest); },
    take: function(dest) { return take(dest); },
    isValidMove: function(dest) { return isValidMove(dest); },
    getValidMoves: function() { return getValidMoves()},
    getValidMovesSelected: function(square) { return getValidMovesSelected(square)},
    showValidMoves: function() { return showValidMoves(); },
    hideValidMoves: function() { return hideValidMoves(); },
    showMoveHistory: function() { return showMoveHistory(); },
    showWhiteMoves: function() { return showWhiteMoves(); },
    showBlackMoves: function() { return showBlackMoves(); },
    startGame: function() { return startGame(); },
    offerDraw: function() { return offerDraw(); },
    resign: function() { return resign(); },
    getPiece: function(square) { return getPiece(square); },
    getPieces: function() { return getPieces(); },
    getEvaluation: function() { return getEvaluation(); },
    getJson: function() { return getJson(); },
    getFEN: function() { return getFEN(); },
    setBoardTheme: function(theme) { return setBoardTheme(theme); },
    setBotDepth: function(depth) { return setBotDepth(depth); },
    playingAs: function() { return playingAs; },
    playAs: function(clr) { return playAs(clr); },
    help: function(cmnd) { return help(cmnd); },
  }

}

export default Gambit;