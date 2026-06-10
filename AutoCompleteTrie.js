class AutoCompleteTrie{
    constructor(){
        this.value = null
        this.children = {}
        this.endOfWord = false
    }

    searchChildren(letter) {
        return this.children[letter] || null; 
    }
    addWord(word){
        let n = word.length;
        let i = 0;
        let currentNode = this
        while(i < n){
            
            let nextNode = currentNode.searchChildren(word[i])
            if(nextNode!==null){//this means the next letter in word is aleady in our tire
                i++;
                currentNode = nextNode
            }
            else{//next letter is not in the children
                const newNode = new AutoCompleteTrie()
                newNode.value = word[i]
                currentNode.children[word[i]] = newNode
                currentNode = newNode
                i++
                

            }
        }
        currentNode.endOfWord=true
        

    }
//     findWord(word)
// Returns true if word exists in trie
// Returns false if word doesn't exist
    findWord(word){
        let currentNode = this
        for(let letter of word){
            let nextNode = currentNode.searchChildren(letter);
            if(nextNode!==null){//this means the next letter in word is aleady in our tire
                currentNode = nextNode
            }
            else{//letter doesnt exist in tyre so return false
                return false;
            }
        }
        return true
        //possibly do this:
        // return currentNode.endOfWord;
    }
    // Navigates to the last node of the given prefix
    // Returns the node where the prefix ends
    _getRemainingTree(prefix, node = this){
        let currentNode = node
        for(let letter of prefix){
            let nextNode = currentNode.searchChildren(letter);
            if(nextNode!==null){//this means the next letter in word is aleady in our tire
                currentNode = nextNode
            }
            else{
                return null
            }
        }
        return currentNode
    }

}


// At the bottom of AutoCompleteTrie.js
module.exports = AutoCompleteTrie;