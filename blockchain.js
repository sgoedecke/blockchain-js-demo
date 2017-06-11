// This is a blockchain example app, written in Javascript

// generate a new blockchain with only a genesis block
function generateBlockChain() {
  return [
    {
      value: '[Genesis Block]',
      hashOfPreviousBlock: 'genesis'
    }
  ]
}

// take a simple hash of a block. this is a very simple (read: insecure) hash
// function lifted from SO. If you were doing this for real, you'd definitely
// choose a proper hashing library
function hashBlock(block) {
  var s = JSON.stringify(block)
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}


// given a string content, adds it to a block and appends to the given blockchain
function writeToChain(content, blockChain) {
  var lastBlock = blockChain[blockChain.length - 1]
  blockChain.push({
    value: content,
    hashOfPreviousBlock: hashBlock(lastBlock)
  })
}

// returns all the values in the given blockchain
function readFromChain(blockChain) {
  return blockChain.map(function(block) {
    return block.value
  }).join(', ')
}

// re-hashes the given blockchain and checks the hashes are valid
function isValidChain(blockChain) {
  var isValid = true
  blockChain.reduce(function(prevBlock, block) {
    if (hashBlock(prevBlock) != block.hashOfPreviousBlock) {
      isValid = false
    }
    return block
  })
  return isValid
}

// given a current chain and a new chain, returns the new chain
// if it's a (valid) longer continuation of the current chain
function chooseBetweenChains(currentChain, newChain) {
  // make sure new chain is longer than our current one
  if (currentChain.length >= newChain.length) {
    return currentChain
  }

  // make sure the new chain's hashes all match
  if (!isValidChain(newChain)) {
    return currentChain
  }

  // make sure the new chain is a continuation of our chain
  var firstNewBlock = newChain[currentChain.length]
  var lastCurrentBlock = currentChain[currentChain.length - 1]
  if (firstNewBlock.hashOfPreviousBlock != hashBlock(lastCurrentBlock)) {
    return currentChain
  }

  return newChain
}

// simple client for interacting with the above blockchain functions
function blockChainClient() {
  var currentBlockChain = generateBlockChain()
  return {
    write: function(content) {
      writeToChain(content, currentBlockChain)
      // here you would broadcast `this.serializeChain()` to your P2P network
    },
    read: function() {
      return readFromChain(currentBlockChain)
    },
    encounterNewChain: function(serializedNewChain) {
      var newChain = JSON.parse(serializedNewChain)
      currentBlockChain = chooseBetweenChains(currentBlockChain, newChain)
    },
    serializeChain: function() {
      return JSON.stringify(currentBlockChain)
    }
  }
}
