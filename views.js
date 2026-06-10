function printHeader(){
    console.log("=== AutoComplete Trie Console ===");
    console.log("Type 'help' for commands\n");

}
function printExit(){
    console.log("Goodbye!");
}
function handleCommand(command){

}
function printHelp(){
    console.log(`
        Commands:
        add <word>      - Add word to dictionary
        find <word>     - Check if word exists
        complete <prefix> - Get completions
        help           - Show this message
        exit           - Quit program
    `);
}
function printWordAdded(word){
    console.log(`✓ Added '${word}' to dictionary`)
}
function printWordExists(word){
    console.log(`✓ '${word}' exists in dictionary`)
}
function printNotFound(word){
    console.log(`✗ '${word}' not found in dictionary`)
}
function printPredictions(prefix, predictions){
    console.log(`Suggestions for ${prefix}: ${predictions.join(', ')}`)
}
function printBadCommand(command){
    console.log(`✗ Unknown command: '${command}'. Type 'help' for commands.\n`);
}
function printArgumentsProblem(command, expectedArgs){
    console.log(`✗ Invalid arguments for '${command}' command. Expected ${expectedArgs -1} argument(s).\n`);
}
function printInvalidWord(word){
    console.log(`✗ Invalid input '${word}'. Please enter a single word without spaces or special characters.\n`);
}
module.exports = {
    printHeader,
    printExit,
    handleCommand,
    printHelp,
    printWordAdded,
    printWordExists,
    printPredictions,
    printNotFound,
    printBadCommand,
    printInvalidWord,
    printArgumentsProblem
};