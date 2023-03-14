// interface to type Node
export interface Node {
  children: Node[];
  end: boolean;
  value: string;
}

export class Node {
  // node created with array of children, boolean end and first letter from passed string
  constructor(string: string) {
    this.children = [];
    this.end = false;
    this.value = string[0] || "";

    // if string is longer then one - add Node to children
    if (string.length > 1) {
      this.children.push(new Node(string.substr(1)));
      // otherwise set end as true
    } else {
      this.end = true;
    }
  }

  // adding
  add(string: string) {
    const value = string[0];
    const next = string.substr(1);
    // loop through children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      // if letter is the same
      if (child.value === value) {
        // if still letters to add, call next add
        if (next) {
          child.add(next);
          // otherwise set end as true
        } else {
          child.end = true;
        }
        return;
      }
    }
    // if none of the children is the letter then add it to children (with end = true)
    this.children.push(new Node(string));
  }

  // look for completions with query
  complete(string: string) {
    let results: string[] = [];
    // loop through children
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      // call _complete on child and concat returned suggestions
      results = results.concat(child._complete(string, "", []));
    }

    // return completions
    return results;
  }

  // internal method for completing
  // built holds the word that is building
  _complete(search: string, built: string, suggestions: string[]) {
    // if suggestions list longer than 3 (max set by user)
    // or it is not hte right value (_complete called below on every child)
    // return current list
    if (suggestions.length >= 3 || (search && search[0] !== this.value)) {
      return suggestions;
    }

    // if end hit add whole word form built to results
    if (this.end) {
      suggestions.push(`${built}${this.value}`);
    }
    // call complete an every child and look for suggestions
    this.children.forEach((child) =>
      child._complete(search.substr(1), `${built}${this.value}`, suggestions)
    );

    return suggestions;
  }
}

// create Trie - add every word lowercased
export default function createTrie(words: string[]) {
  const root = new Node("");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    root.add(word.toLowerCase());
  }

  return root;
}
