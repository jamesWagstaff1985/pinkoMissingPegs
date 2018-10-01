//input (array[width, height], integer, array[array[missingPegs(x,y)], array[missingPegs[x,y], ...]])
boardSetup = (size, endPoint, missingPegs) => {
  // Checks: size only contains odd numbers, 0 <= endPoint < size[1](width)
  if(size.length > 2 || size[0] % 2 === 0 || size[1] === 0 || endPoint < 0 || endPoint > size[1]){
    // Return an error message
    return {'Error' : 'Error in inputs'}
  }
  // Build a 2d array of 0's
  let board = new Array(size[1]).fill('')
  //Width is width x 2 to allow for pegs and gaps
  for(x in board) board[x] = new Array(size[0]*2-1).fill(0)
  // convert missingPegs 2d array to a 1d array of strings
  const missingPegs1D = missingPegs.map(a=>{
                                      if(a[0]%2===0){
                                        a[1]=a[1]*2
                                      }else{
                                        a[1]=a[1]*2+1
                                      }return a.join(',')});
  //Start point is always the same as the end point
  const startPoint = endPoint * 2 + 1
  board[0][startPoint] = 1
  // Loop throgh the board
  for(let i = 1; i<board.length;i++){
    for(let j = 0; j<board[i].length;j++){
      // If peg is missing, carry the value down to the next area
      if(missingPegs1D.indexOf([i, j].join(','))>-1 && i+1<board.length){
        board[i+1][j] = board[i-1][j]
        board[i][j-1] -= board[i-1][j]
        board[i-1][j] = 0
      }
      // Add the digits above and to the left, above and to the right
      let num1 = typeof(board[i-1][j-1]) == 'number' ? board[i-1][j-1] : 0
      let num2 = typeof(board[i-1][j+1]) == 'number' ? board[i-1][j+1] : 0

      board[i][j] += num1 + num2
    }
  }
  // The probability is the exit number divided by the sum of the numbers of that row
  const finalNumber = board[board.length-1][startPoint]
  const finalLine = eval(board[board.length-1].filter(a=>a!==0).join('+'))
  return `Entrada = ${endPoint}, Probabilidad = ${finalNumber / finalLine}`
}
// Tests
console.log(boardSetup([5,5], 0, [[1,1],[2,1],[3,2]]))
console.log(boardSetup([5,5], 1, [[1,1],[2,1],[3,2]]))
console.log(boardSetup([5,5], 2, [[1,1],[2,1],[3,2]]))
console.log(boardSetup([3,5], 1, [[1,1],[2,1],[3,2]]))
console.log(boardSetup([11,11], 2, [[1,1],[2,1],[3,2]]))
console.log(boardSetup([5,5], 0, [[1,0],[3,1],[3,2]]))
console.log(boardSetup([5,5], 2, [[1,2],[2,2],[2,3]]))
console.log(boardSetup([5,5], 1, [[2,1],[2,2]]))
console.log(boardSetup([5,5], 1, [[1,0],[3,1],[3,2]]))
