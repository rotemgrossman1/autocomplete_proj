class AutoCompleteTrie{
    constructor(){
        this.value = null
        this.children = {}
        this.endOfWord = false
    }

    searchChildren(node, letter){
        return node.children[letter] || null// Returns the child node for the given letter, or null if it doesn't exist
    }
    addWord(word){
        let n = word.length;
        let i = 0;
        let currentNode = this
        while(i < n){
            
            let nextNode = this.searchChildren(currentNode, word[i])
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
}


// At the bottom of AutoCompleteTrie.js
module.exports = AutoCompleteTrie;