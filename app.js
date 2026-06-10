// 1. Import the core module
const readline = require('readline');
const views = require('./views')

const AutoCompleteTrie = require('./AutoCompleteTrie'); 
const autoComplete = new AutoCompleteTrie();           
// 2. Open the input and output streams to your terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
views.printHeader()

// 3. Define the recursive function that powers the loop
function startAppLoop() {
    // rl.question pauses execution and waits for user input
    rl.question('> ', (userInput) => {
        // Clean up the text input
        const cleanInput = userInput.trim().toLowerCase();

        // Check for the exit condition first
        if (cleanInput === 'exit') {
            views.printExit()
            rl.close(); // Closes the terminal stream, ending the script execution
            return;     // Stop the function early so it doesn't call itself again
        }

        //convert clean input into an array separated by spacebar
        let arrInput = cleanInput.split(" ")


        if (arrInput.length>2) {//isNan checks if the value is not a number, if it is not a number it will return true and we will print the error message
            console.log("✗ Too many arguments\n");
        } else {
            let command = arrInput[0]
            switch(command){
                case "exit":
                    views.printExit();
                    rl.close(); 
                    return;
                case "help":
                   views.printHelp() 
                   break;
                case "add":
                    const word = arrInput[1]
                    if(!autoComplete.findWord(word)){
                        autoComplete.addWord(word)
                        views.printWordAdded(word)
                    }
                    else{
                        views.printWordExists(word)
                    }
                    break;
                case "find":
                    if (!arrInput[1]) {
                        const argument = arrInput[1]
                        console.log("✗ Please provide a word to find. (e.g., find cat)\n");
                        break;
                    }
                    if (autoComplete.findWord(argument)) {
                        views.printWordExists(argument);
                    } else {
                        views.printNotFound(argument);
                    }
                    break;
                case "complete":
                    const prefix = arrInput[1]
                    const predictions = autoComplete.predictWords(prefix)
                    views.printPredictions(prefix, predictions)
                    break;
                default:
                    console.log(`✗ Unknown command: '${command}'. Type 'help' for commands.\n`);

            }

            
            
        }

        // 4. Re-trigger the prompt to keep the loop spinning safely
        startAppLoop();
    });
}

// Kick off the loop for the very first time
startAppLoop();