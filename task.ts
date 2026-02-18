// function blueHearts(lineCount: number): void {
//   for (let i = 0; i < lineCount; i++) {
//     for (let j = 0; j <= i; j++) {
//       console.log("💙  ");
//     }
//     console.log("\n");
//   }
// }
//**
//  */
// blueHearts(8);

/**
 * The blueHearts function prints blue hearts in a right-angled triangle pattern as shown below.
 *💙
 *💙 💙
 *💙 💙 💙
 * when the function is called with the parameter as '3' this should be the output
 * @param lineCount the number of lines to be printed
 */

function blueHearts(lineCount: number): void {
  for (let i = 0; i < lineCount; i++) {
    let linePrint = "";
    for (let j = 0; j <= i; j++) {
      linePrint = linePrint + "💙 ";
    }
    console.log(linePrint);
  }
}
blueHearts(8);
