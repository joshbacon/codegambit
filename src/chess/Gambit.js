const Gambit = () => {
    
  const jsChessEngine = require('js-chess-engine');
  const game = new jsChessEngine.Game();

  let gameStarted = false;

  let select = (square) => {
    
  }

  let unselect = () => {
    
  }

  let move = (dest) => {
    
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

  let getFEN = () => {
    
  }

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
    select: function() { return select(); },
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
    getFEN: function() { return getFEN(); },
    setFromFEN: function(FEN) { return setFromFEN(FEN); },
    setBoardTheme: function(theme) { return setBoardTheme(theme); },
    setBotDepth: function(depth) { return setBotDepth(depth); },
    playAs: function(clr) { return playAs(clr); },
    help: function(cmnd) { return help(cmnd); },
    clear: function() { return clear(); },
    hint: function() { return hint(); },
    selectedHint: function(square) { return selectedHint(square); },
    conventions: function() { return conventions(); },
  }

}

export default Gambit;