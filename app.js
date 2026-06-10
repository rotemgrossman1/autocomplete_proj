// 1. Import the core module
const readline = require('readline');
const views = require('./views')

const AutoCompleteTrie = require('./AutoCompleteTrie'); 
const autoComplete = new AutoCompleteTrie();   
//helper function to determine correct number of arguments
function verifyNumberofArguments(command, arg, numOfArguments){
    if (arg.length > numOfArguments) {
        return false;
    }else if (arg.length < numOfArguments) {
        return false;
    }else{
        return true;
    }
}  

//helper check if a word is valid
function isValidWord(word) {
    return /^[a-zA-Z]+$/.test(word);
}
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


        //convert clean input into an array separated by spacebar
        let arrInput = cleanInput.split(" ")


    
        let command = arrInput[0]
        switch(command){
            case "exit":
                if(!verifyNumberofArguments(command, arrInput, 1)){
                    views.printArgumentsProblem(command, 1)
                    break;
                }
                views.printExit();
                rl.close(); 
                return;
            case "help":
                if(!verifyNumberofArguments(command, arrInput, 1)){
                    views.printArgumentsProblem(command, 1)
                    break;
                }
                views.printHelp() 
                break;
            case "add":
                if(!verifyNumberofArguments(command, arrInput, 2)){
                    views.printArgumentsProblem(command, 2)
                    break;
                }
                const word = arrInput[1]
                if(!isValidWord(word)){
                    views.printInvalidWord(word)
                    break;
                }
                if(!autoComplete.findWord(word)){
                    if(autoComplete.addWord(word)){
                    views.printWordAdded(word)
                    }
                }
                else{
                    views.printWordExists(word)
                }
                break;
            case "find":
                if(!verifyNumberofArguments(command, arrInput, 2)){
                    views.printArgumentsProblem(command, 2)
                    break;
                }
                const argument = arrInput[1]
                if(!isValidWord(argument)){
                    views.printInvalidWord(argument)
                    break;
                }
                if (autoComplete.findWord(argument)) {
                    views.printWordExists(argument);
                } else {
                    views.printNotFound(argument);
                }
                break;
            case "complete":
                if(!verifyNumberofArguments(command, arrInput, 2)){
                    views.printArgumentsProblem(command, 2)
                    break;
                }
                const prefix = arrInput[1]
                if(!isValidWord(prefix)){
                    views.printInvalidWord(prefix)
                    break;
                }
                const predictions = autoComplete.predictWords(prefix)
                views.printPredictions(prefix, predictions)
                break;
            default:
                views.printBadCommand(command)
            

            
            
        }

        // 4. Re-trigger the prompt to keep the loop spinning safely
        startAppLoop();
    });
}

// Kick off the loop for the very first time
startAppLoop();