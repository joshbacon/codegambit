const Gambit = () => {
    
  const jsChessEngine = require('js-chess-engine');
  const game = new jsChessEngine.Game();

  let gameStarted = false;
  let singlePlayer = true;
  let playingAs = game.WHITE;

  let selectedSquare = '';

  let select = (square) => {
    selectedSquare = square;
  }

  let unselect = () => {
    selectedSquare = '';
  }

  let move = (dest) => {
    try {
      return game.move(selectedSquare, dest);
    } catch (e) {
      return e;
    }
  }

  let playAiMove = () => {
    console.log('this is definetely the error');
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
  }

  let offerDraw = () => {
    
  }

  let resign = () => {
    
  }

  let getPiece = (square) => {
    return game.exportJson().pieces[square];
  }

  let getPieces = () => {
    return game.exportJson().pieces;
  }

  let getEvaluation = () => {
    
  }

  let getJson = () => game.exportJson();

  let getFEN = () => game.exportFEN();

  let setFromFEN = (FEN) => {
    
  }

  let setBoardTheme = (theme) => {
    
  }

  let setBotDepth = (depth) => {
    
  }

  let playAs = (clr) => {
    
  }

  let help = (cmnd) => {
    
  }

  let clear = () => {
    
  }

  let hint = () => {
    
  }

  let selectedHint = (square) => {
    
  }

  let conventions = () => {
    
  }

  return {
    isStarted: function() { return gameStarted; },
    isSingle: function() { return singlePlayer; },
    playAiMove: function() { return playAiMove(); },
    startGame: function() { gameStarted = true; },
    selected: function() { return selectedSquare},
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
    setFromFEN: function(FEN) { return setFromFEN(FEN); },
    setBoardTheme: function(theme) { return setBoardTheme(theme); },
    setBotDepth: function(depth) { return setBotDepth(depth); },
    playingAs: function() { return playingAs; },
    playAs: function(clr) { return playAs(clr); },
    help: function(cmnd) { return help(cmnd); },
    clear: function() { return clear(); },
    hint: function() { return hint(); },
    selectedHint: function(square) { return selectedHint(square); },
    conventions: function() { return conventions(); },
  }

}

export default Gambit;