import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Gambit = (state) => {

  const jsChessEngine = require('js-chess-engine');
  const { move, aiMove, status, moves, getFen } = jsChessEngine;
  
  const { inGame, playingAs, selected, aiLevel, game, history, commands } = useSelector(state => state.game);

  const dispatch = useDispatch();

  const WHITE = 'w';
  const BLACK = 'b';

  let singlePlayer = true;

  useEffect(() => {
    try {
        setBotDepth(localStorage.getItem('aiLevel') ?? 0);
    } catch { }
  },[]);

  let parseCommand = (input) => {
    // TODO: need to update this to accept the FEN notation for setFromFEN()
    if (!/^[a-z]+[a-zA-Z]*\(-?[a-zA-Z0-9]*(\,\s?\-?[a-zA-Z0-9]*)*\)$/.test(input)){
        let result = "Invalid function format.";
        dispatchToStore("SET_COMMANDS", {result: result, command: input});
        return result;
    }
    // clean data
    let data = input.split('(');
    let command = data[0];
    let params = data[1].split(')')[0].split(',');
    params = params.map(p => p.trim());
    params = params.filter((str) => { return str.length > 0; });

    let result = runCommand(command, params);
    if (result == '')
        dispatchToStore("SET_COMMANDS", {result: result, command: input});
    else
        dispatchToStore("SET_COMMANDS", {result: result, command: input});

    dispatchToStore("SET_PREV_COMMAND", {command: input});
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
                select(params[0]);
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
            else {
                select('');
                return '';
            }
            break;
        case 'move':
            if (!inGame)
                return 'A game must be started to move a piece.';
            else if (selected === '')
                return 'There is no piece currently selected to move.';
            else if (params.length !== 1)
                return "move() expects 1 argument.";
            else if (!isValidMove(selected, params[0]))
                return "This is not a valid move.";
            
            let result = playMove(params);
            dispatchToStore('SET_HISTORY', {history: [...history, ...result]});
            if (result.length > 1){
                return `[${result[0][0]}, ${result[0][1]}]\n[${result[1][0]}, ${result[1][1]}]`;
            } else return `[${result[0][0]}, ${result[0][1]}]`;
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
            else if (!isValidMove(selected, params[0]))
                return "This is not a valid move.";
            else {
                let result = move(selected, params[0]);
                dispatchToStore('SET_POSITION', {from: selected, to: params[0]});
                return result;
            }
            break;
        case 'isValidMove':
            if (!inGame)
                return 'A game must be started to select a piece.';
            else if (params.length !== 1 && params.length !== 2)
                return "isValidMove() expects 1 or 2 arguments.";
            else if (selected === '' && params.length === 1)
                return 'There is no piece currently selected to check if move is valid.';
            else if (params.length === 1)
                return `${isValidMove(selected, params[0])}`;
            else
                return `${isValidMove(params[0], params[1])}`;
            break;
        case 'getValidMoves':
            if (!inGame)
                return 'A game must be started to select a piece.';
            else if (params.length !== 0 && params.length !== 1)
                return "getValidMoves() expects 0 or 1 arguments.";
            else if (selected === '' && params.length === 1)
                return 'There is no piece currently selected to check if move is valid.';
            else if (params.length === 1){
                return '['+getValidMoves(params[0])+']';
            } else {
                return '['+getValidMoves()+']';
            }
            break;
        case 'showValidMoves':
            if (!inGame)
                return 'A game must be started to show valid moves.';
            else if (selected === '')
                return 'There is no piece currently selected to show valid moves.';
            else if (params.length !== 0)
                return "showValidMoves() expects no arguments.";
            else if (selected !== ''){
                let result = getValidMoves() ?? [];
                dispatchToStore('SET_VALID_MOVES', {moves: result});
                return '';
            } else return 'false';
            break;
        case 'hideValidMoves':
            if (!inGame)
                return 'A game must be started to hide valid moves.';
            else if (selected === '')
                return 'There is no piece currently selected.';
            else if (params.length !== 0)
                return "hideValidMoves() expects no arguments.";
            else {
                dispatchToStore('SET_VALID_MOVES', {moves: []});
                return '';
            }
            break;
        case 'showMoveHistory':
            if (!inGame)
                return 'A game must be started to show move history.';
            else if (params.length !== 0)
                return "showMoveHistory() expects no arguments.";
            else {
                return formatMoves();
            }
            break;
        case 'showWhiteMoves':
            if (!inGame)
                return 'A game must be started to show white\'s move history.';
            else if (params.length !== 0)
                return "showWhiteMoves() expects no arguments.";
                else {
                    return formatMoves(WHITE);
                }
            break;
        case 'showBlackMoves':
            if (!inGame)
                return 'A game must be started to show black\'s move history.';
            else if (params.length !== 0)
                return "showBlackMoves() expects no arguments.";
                else {
                    return formatMoves(BLACK);
                }
            break;
        case 'startGame':
            if (inGame)
                return 'You can\'t start a new game with an existing instance.';
            else if (params.length !== 0)
                return "startGame() expects no arguments.";
            else {
                startGame();
                return '';
            }
            break;
        case 'offerDraw':
            if (!inGame)
                return 'A game must be started to offer a draw.';
            else if (params.length !== 0)
                return "offerDraw() expects no arguments.";
            
            return offerDraw();
            break;
        case 'resign':
            if (!inGame)
                return 'A game must be started to resign.';
            else if (params.length !== 0)
                return "resign() expects no arguments.";
            
            return finishGame();
            break;
        case 'resetBoard':
            if (inGame)
                return 'Cannot reset the board while in a game.';
            else if (params.length !== 0)
                return "resign() expects no arguments.";
            else {
                dispatchToStore('RESET');
                return '';
            }
            break;
        case 'getFEN':
            if (params.length !== 0)
                return "getFEN() expects no argument.";
            else
                return getFen(game);
            break;
        case 'setFromFEN':
            if (params.length !== 1)
                return "setFromFEN() expects 1 argument.";
            else
                setFromFEN(params[0]);
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
                return 'You can\'t change the bot depth during a game.';
            else if (params.length !== 1)
                return "setBotDepth() expects 1 argument.";
            else if (params[0] < 0 || params[0] > 3) {
                return "New depth must be in the range [0, 3].";
            } else {
                setBotDepth(params[0]);
                return params[0];
            }
            break;
        case 'playAs':
            if (inGame)
                return 'You can\'t change who you are playing as during a game.';
            else if (params.length !== 1)
                return "playAs() expects 1 argument.";
            else if (params[0] !== WHITE && params[0] !== BLACK)
                return "Valid paramaters are w for white or b for black.";
            else{
                setPlayingAs(params[0]);
                return '';
            }
        case 'help':
            if (params.length !== 1)
                return "help() expects 1 argument.";
            
            return formatHelp(params[0]);
            break;
        case 'clear':
            return clear();
        default:
            return "This command is not recognized.";
      }
      return '';
  }

  let dispatchToStore = (type, payload) => {
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
        action = {
            type: "SET_PREV_COMMAND",
            prevCommand: payload.command
        }
    } else if (type === "SET_AI_LEVEL") {
        action = {
            type: "SET_AI_LEVEL",
            aiLevel: payload.aiLevel
        }
    } else if (type === "SET_HISTORY") {
        action = {
            type: "SET_HISTORY",
            history: payload.history
        }
    } else if (type === "SET_VALID_MOVES") {
        action = {
            type: "SET_VALID_MOVES",
            moves: payload.moves
        }
    } else if (type === "RESET") {
        action = {
            type: "RESET"
        }
    }
    dispatch(action);
  }

  let getPiece = (square) => {
    return getPieces()[square];
  }

  let getPieces = () => {
    return status(game).pieces;
  }

  let isOwnPiece = (square) => {
      let piece = getPiece(square);
      if (playingAs === WHITE){
          return piece === piece.toUpperCase();
      }else
          return piece === piece.toLowerCase();
  }

  let select = (square) => {
    dispatchToStore('SET_SELECTED', {square: square.trim().toUpperCase()});
  }

  let playMove = (params) => {
    let next = move(game, selected, params[0]);
    if (singlePlayer) {
        let aiMove = playAiMove(next);
        return [[selected, params[0]], aiMove];
    } else {
        dispatchToStore('SET_POSITION', {next: next});
        return [selected, params[0]];
    }
  }

  let take = (dest) => {
    
  }

  let isValidMove = (from, to) => {
    let validMoves = moves(game)[from];
    return validMoves && validMoves.includes(to);
  }

  let getValidMoves = (square=selected) => {
    return moves(game)[square].toString();
  }

  let formatMoves = (side='wb') => {
    let result = [];
    if (side === WHITE) {
        let whiteMoves = history.filter((value, index) => index % 2 === 0);
        result = whiteMoves.map(m => '['+m[0]+','+m[1]+']');
    } else if (side === BLACK) {
        let blackMoves = history.filter((value, index) => index % 2 === 1);
        result = blackMoves.map(m => '['+m[0]+','+m[1]+']');
    } else {
        result = history.map(m => '['+m[0]+','+m[1]+']');
    }
    return '['+result.join(' ')+']';
  }

  let startGame = () => {
    dispatchToStore('START_GAME');
    if (singlePlayer && playingAs === BLACK) {
        playAiMove();
    }
  }

  let offerDraw = () => {
    if (aiLevel * Math.ceil(Math.random()) % 10 >= 3)
        return "Draw was declined.";
    else {
        dispatchToStore('FINISH_GAME');
        return "Draw was accepted.";
    }
  }

  let finishGame = () => {
    dispatchToStore('FINISH_GAME');
    return (playingAs === WHITE ? 'Black' : 'White') + ' wins!';
  }

  let playAiMove = (position = game) => {
    try {
        let result = aiMove(position, aiLevel);
        let next = move(position, Object.entries(result)[0][0], Object.entries(result)[0][1]);
        dispatchToStore("SET_POSITION", {next: next});
        return Object.entries(result)[0];
    } catch(e) {
        return e;
    }
  }

  let setFromFEN = (FEN) => {
    
  }

  let setBotDepth = (newLevel = 0) => {
    localStorage.setItem('aiLevel', newLevel);
    dispatchToStore('SET_AI_LEVEL', {aiLevel: newLevel});
  }

  let setPlayingAs = (side = 'w') => {
    dispatchToStore("SET_PLAYING_AS", {playingAs: side});
  }

  let formatHelp = () => {
    let result = '';
    return result;
  }

  let clear = () => {
    return [];
  }

  return {
    enterCommand: function(input) { return parseCommand(input); },
  }

}

export default Gambit;