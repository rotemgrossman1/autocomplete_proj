const AutoCompleteTrie = require('./AutoCompleteTrie'); // [cite: 96]

describe('AutoCompleteTrie Integration Tests (Diagram Specifications)', () => {
    let trie;

    // Before each test runs, initialize a fresh tree and insert the diagram words 
    beforeEach(() => {
        trie = new AutoCompleteTrie();
        const diagramWords = ["their", "there", "this", "that", "does", "did"]; // 
        diagramWords.forEach(word => trie.addWord(word)); // 
    });

    describe('findWord() Functionality', () => {
        test('should return true for exact words that exist in the diagram', () => {
            expect(trie.findWord('there')).toBe(true);
            expect(trie.findWord('did')).toBe(true);
        });

        test('should return false for valid paths that are only prefixes, not full words', () => {
            // "the" and "do" exist as branches but were never added as standalone words [cite: 184]
            expect(trie.findWord('the')).toBe(false); // [cite: 184]
            expect(trie.findWord('do')).toBe(false);  // [cite: 184]
        });

        test('should return false for completely non-existent words', () => {
            expect(trie.findWord('them')).toBe(false);
            expect(trie.findWord('done')).toBe(false);
        });
    });

    describe('predictWords() Functionality', () => {
        test('should return all 4 matching completions for prefix "th"', () => {
            const predictions = trie.predictWords('th');
            const expected = ["that", "their", "there", "this"];
            
            expect(predictions.length).toBe(4);
            expect(predictions).toEqual(expect.arrayContaining(expected));
        });

        test('should narrow completions down to 2 words for prefix "the"', () => {
            const predictions = trie.predictWords('the');
            const expected = ["their", "there"];
            
            expect(predictions.length).toBe(2);
            expect(predictions).toEqual(expect.arrayContaining(expected));
        });

        test('should match exactly 1 completion for prefix "di"', () => {
            const predictions = trie.predictWords('di');
            expect(predictions).toEqual(['did']);
        });

        test('should return an empty array and NOT crash if prefix does not exist', () => {
            // This ensures the defensive check for a null subtree works seamlessly [cite: 177, 178]
            expect(() => {
                const results = trie.predictWords('xyz');
                expect(results).toEqual([]);
            }).not.toThrow();
        });
    });
});