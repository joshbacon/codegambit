import { useSelector, useDispatch } from 'react-redux';

const Gambit = (state) => {

  // const game = new Game()
//   const {state, engine} = props;
  const jsChessEngine = require('js-chess-engine');
  const { move, aiMove, status, getFen } = jsChessEngine;
//   const engine = new jsChessEngine.Game('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  // 
//   const {inGame, playingAs, selected, aiLevel, game, commands} = useSelectstate;

//   const {FEN} = useSelector(state => state.FEN);
  const { inGame, playingAs, selected, aiLevel, game, commands } = useSelector(state => state.game);
//   const tempvar = useSelector(state => state.game);

//   console.log(game);

  const dispatch = useDispatch();

  const WHITE = 'w';
  const BLACK = 'b';

  let singlePlayer = true;

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
    console.log(result);
    if (result == '')
        dispatchToStore("SET_COMMANDS", {result: result, command: input});
    else
        dispatchToStore("SET_COMMANDS", {result: result, command: input});

    // console.log("NEW STATE AFTER DISPATCH", game);
    // console.log(input);
    dispatchToStore("SET_PREV_COMMAND", {command: input});
    // console.log(prevCommand);
    // console.log(tempvar);
    return result;
    // return runCommand(command, params);
  }

  let runCommand = (command, params) => {
    switch(command) {
        case 'select':
            if (!inGame)
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
                dispatchToStore('SET_SELECTED', {square: params[0].trim().toUpperCase()});
                return '';
            }
            break;
        case 'unselect':
            if (!inGame)
                return 'A game must be started to unselect a piece.';
            else if (params.length !== 0)
                return "unselect() expects no arguments.";
            else if (selected === '')
                return "A square must be selected to unselect.";
            else
                dispatchToStore('SET_SELECTED', {square: ''});
                return '';
            break;
        case 'move':
            if (!inGame)
                return 'A game must be started to move a piece.';
            else if (selected === '')
                return 'There is no piece currently selected to move.';
            else if (params.length !== 1)
                return "move() expects 1 argument.";
            
            let next = move(game, selected, params[0]);
            if (singlePlayer) {
                let aiMove = playAiMove(next);
                return `[${selected}, ${params[0]}]\n${aiMove}`;
            } else {
                dispatchToStore('SET_POSITION', {next: next});
                return `[${selected}, ${params[0]}]`;
            }
            break;
        case 'take':
            if (!inGame)
                return 'A game must be started to take a piece.';
            else if (selected === '')
                return 'There is no piece currently selected to take with.';
            else if (params.length !== 1)
                return "take() expects 1 argument.";
            else if (getPiece(params[0]) === '')
                return 'There is no piece to take on this square.';
            else {
                let result = move(selected, params[0]);
                dispatchToStore('SET_POSITION', {from: selected, to: params[0]});
                return result;
            }
            break;
        case 'isValidMove':
            if (!inGame)
                return 'A game must be started to select a piece.';
            else if (selected === '')
                return 'There is no piece currently selected to check if move is valid.';
            else if (params.length !== 1 && params.length !== 2)
                return "isValidMove() expects 1 or 2 arguments.";
            else if (params.length === 1)
                return isValidMove(selected, params[0]);
            else
                return isValidMove(params[0], params[1]);
            break;
        case 'showValidMoves':
            if (!inGame)
                return 'A game must be started to show valid moves.';
            else if (selected === '')
                return 'There is no piece currently selected to show valid moves.';
            else if (params.length !== 0)
                return "showValidMoves() expects no arguments.";
            break;
        case 'hideValidMoves':
            if (!inGame)
                return 'A game must be started to hide valid moves.';
            else if (selected === '')
                return 'There is no piece currently selected.';
            else if (params.length !== 0)
                return "hideValidMoves() expects no arguments.";
            break;
        case 'showMoveHistory':
            if (!inGame)
                return 'A game must be started to show move history.';
            else if (params.length !== 0)
                return "showMoveHistory() expects no arguments.";
            else 
            break;
        case 'showWhiteMoves':
            if (!inGame)
                return 'A game must be started to show white\'s move history.';
            else if (params.length !== 0)
                return "showWhiteMoves() expects no arguments.";
            break;
        case 'showBlackMoves':
            if (!inGame)
                return 'A game must be started to show black\'s move history.';
            else if (params.length !== 0)
                return "showBlackMoves() expects no arguments.";
            break;
        case 'startGame':
            if (inGame)
                return 'You can\'t start a new game with an existing instance.';
            else if (params.length !== 0)
                return "startGame() expects no arguments.";
            else {
                dispatchToStore('START_GAME');
                if (singlePlayer && playingAs === BLACK) {
                    playAiMove();
                }
                return '';
            }
            break;
        case 'offerDraw':
            if (!inGame)
                return 'A game must be started to offer a draw.';
            else if (params.length !== 0)
                return "offerDraw() expects no arguments.";
            
            if (aiLevel * 3 % 10 >= 3)
                return "Draw was declined.";
            else {
                inGame = false;
                dispatchToStore('FINISH_GAME');
                return "Draw was accepted.";
            }
            break;
        case 'resign':
            if (!inGame)
                return 'A game must be started to resign.';
            else if (params.length !== 0)
                return "resign() expects no arguments.";
            else
                inGame = false;
                return '';
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
                return getFENState();
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
            if (inGame)
                return 'You can\'t change the bot depth during a game';
            else if (params.length !== 1)
                return "setBotDepth() expects 1 argument.";
            break;
        case 'playAs':
            if (inGame)
                return 'You can\'t change who you are playing as during a game';
            else if (params.length !== 1)
                return "playAs() expects 1 argument.";
            else if (params[0] !== WHITE && params[0] !== BLACK)
                return "Valid paramaters are w for white or b for black.";
            else
                dispatchToStore("SET_PLAYING_AS", {playingAs: params[0]})
                return '';
        case 'help':
            if (params.length !== 1)
                return "help() expects 1 argument.";
            break;
        case 'clear':
            return clear();
        default:
            return "This command is not recognized.";
      }
      return '';
  }

  let dispatchToStore = (type, payload) => {
    // console.log(type, payload);
    let action = {type: ""};
    if (type === "START_GAME") {
        action = {
            type: 'START_GAME',
        };
    } else if (type === "FINISH_GAME") {
        action = {
            type: "FINISH_GAME",
            inGame: false
        };
    } else if (type === "SET_POSITION") {
        action = {
            type: "SET_POSITION",
            position: getFen(payload.next)
        };
    } else if (type === "SET_SELECTED") {
        action = {
            type: "SET_SELECTED",
            selected: payload.square
        };
    } else if (type === "SET_PLAYING_AS") {
        action = {
            type: "SET_PLAYING_AS",
            playingAs: payload.playingAs
        }
    } else if (type === "SET_COMMANDS") {
        // console.log(payload.result)
        if (typeof(payload.result) === 'object' && payload.result.length === 0) {
            action = {
                type: "SET_COMMANDS",
                commands: []
            };
        } else {
            if (payload.result === ""){
                action = {
                    type: "SET_COMMANDS",
                    commands: [...commands, payload.command]
                };
            } else {
                action = {
                    type: "SET_COMMANDS",
                    commands: [...commands, payload.command, payload.result]
                };
            }
        }
    } else if (type === "SET_PREV_COMMAND") {
        // console.log(payload.command)
        action = {
            type: "SET_PREV_COMMAND",
            prevCommand: payload.command
        }
    }
    // console.log("ACTION: ", action);
    dispatch(action);
  }

  let isOwnPiece = (square) => {
      let piece = getPiece(square);
      if (playingAs === WHITE){
          return piece === piece.toUpperCase();
      }else
          return piece === piece.toLowerCase();
  }

  let movePiece = (dest) => {
    try {
        let result = move({...game}, selected, dest);
        if (singlePlayer) {
            let num = Math.ceil(Math.random()*5)*1000;
            console.log(num, "309")
            setTimeout(
                () => {
                    console.log("playing black");
                    playAiMove();
                },
                num
            );
        }
        return result;
    } catch (e) {
        return e;
    }
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


  let offerDraw = () => {
    //incorporate ai level in some probability function that returns a boolean
  }

  let resign = () => {
    
  }

  let playAiMove = (position = game) => {
    try {
        let result = aiMove(position, aiLevel);
        console.log(result);
        console.log(Object.entries(result)[0][0], Object.entries(result)[0][1]);
        let next = move(position, Object.entries(result)[0][0], Object.entries(result)[0][1])
        console.log(next);
        dispatchToStore("SET_POSITION", {next: next});
        return `[${Object.entries(result)[0][0]}, ${Object.entries(result)[0][1]}]`;
    } catch(e) {
        return e;
    }
  }

  let getPiece = (square) => {
    // console.log(getPieces(), square)
    return getPieces()[square];
  }

  let getPieces = () => {
    return status(game).pieces;
  }

  let getEvaluation = () => {
    
  }

  let getFENState = () => getFen({...game});

  let setFromFEN = (FEN) => {
    // game = new jsChessEngine.Game(FEN??'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
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
    // startGame: function() { inGame = true; },
    // selected: function() { return selected; },
    // select: function(square) { return select(square); },
    // unselect: function() { return unselect(); },
    // move: function(dest) { return move(dest); },
    // take: function(dest) { return take(dest); },
    // isValidMove: function(dest) { return isValidMove(dest); },
    // getValidMoves: function() { return getValidMoves()},
    // getValidMovesSelected: function(square) { return getValidMovesSelected(square)},
    // showValidMoves: function() { return showValidMoves(); },
    // hideValidMoves: function() { return hideValidMoves(); },
    // showMoveHistory: function() { return showMoveHistory(); },
    // showWhiteMoves: function() { return showWhiteMoves(); },
    // showBlackMoves: function() { return showBlackMoves(); },
    // offerDraw: function() { return offerDraw(); },
    // resign: function() { return resign(); },
    // getPiece: function(square) { return getPiece(square); },
    // getPieces: function() { return getPieces(); },
    // getEvaluation: function() { return getEvaluation(); },
    // getJson: function() { return getJson(); },
    // getFEN: function() { return getFEN(); },
    // setBoardTheme: function(theme) { return setBoardTheme(theme); },
    // setBotDepth: function(depth) { return setBotDepth(depth); },
    // playingAs: function() { return playingAs; },
    // playAs: function(clr) { return playAs(clr); },
    // help: function(cmnd) { return help(cmnd); },
  }

}

export default Gambit;