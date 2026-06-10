export function printHeader(){
    console.log("=== AutoComplete Trie Console ===");
    console.log("Type 'help' for commands\n");

}
export function printExit(){
    console.log("Goodbye!");
}
export function handleCommand(command){

}
export function printHelp(){
    console.log(`
        Commands:
        add <word>      - Add word to dictionary
        find <word>     - Check if word exists
        complete <prefix> - Get completions
        help           - Show this message
        exit           - Quit program
    `);
}
export function printWordAdded(word){
    console.log(`✓ Added '${word}' to dictionary`)
}
export function printWordExists(word){
    console.log(`✓ '${word}' exists in dictionary`)
}
export function printNotFound(word){
    console.log(`✗ '${word}' not found in dictionary`)
}
export function printPredictions(prefix, predictions){
    console.log(`Suggestions for ${prefix}: ${predictions}`)
}