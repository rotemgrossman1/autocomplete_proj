const AutoCompleteTrie = require('./AutoCompleteTrie'); 

// Grouping your autocomplete tests together
describe('AutoCompleteTrie Tests', () => {
    
    test('should add a single word and mark endOfWord correctly', () => {
        const trie = new AutoCompleteTrie();
        trie.addWord("run");
        
        const rNode = trie.searchChildren(trie, "r");
        const uNode = rNode ? trie.searchChildren(rNode, "u") : null;
        const nNode = uNode ? trie.searchChildren(uNode, "n") : null;
        
        // Assertions using Jest matchers
        expect(nNode).not.toBeNull();
        expect(nNode.endOfWord).toBe(true);
    });

    test('should reuse existing prefix paths for new words', () => {
        const trie = new AutoCompleteTrie();
        trie.addWord("run");
        trie.addWord("running");
        
        const rNode = trie.searchChildren(trie, "r");
        const uNode = rNode ? trie.searchChildren(rNode, "u") : null;
        const nNodeAfter = uNode ? trie.searchChildren(uNode, "n") : null;
        const nextNNode = nNodeAfter ? trie.searchChildren(nNodeAfter, "n") : null;
        
        expect(nNodeAfter.endOfWord).toBe(true);
        expect(nextNNode).not.toBeNull();
    });

    test('should return null for non-existent child nodes', () => {
        const trie = new AutoCompleteTrie();
        const missingNode = trie.searchChildren(trie, "z");
        
        expect(missingNode).toBeNull();
    });
});