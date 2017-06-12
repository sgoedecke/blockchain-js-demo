# Blockchain Javascript Demo

The simplest blockchain client possible, written in Javascript. It should stand by itself, but for more information see my intro to the blockchain [here](https://sgoedecke.github.io/blockchain-for-beginners/).

## Does it work?

Yes. You can create a blockchain, add blocks to it, and accept valid blocks from peer blockchains. However, many 'core' features of the blockchain have not been implemented for simplicity's sake. On the practical side, there is no P2P implementation at all: to send your blocks to others, you need to copy the serialized chain and (e.g.) email it to your peers, who can then paste it into the text field of their own blockchain client. On the theoretical side, many helpful features of the block header have been omitted: indexes, timestamps, and a hash of the block content. The consensus algorithm is also just "longest valid chain wins" - i.e. there is no proof of work or proof of stake.

## What's the point?

To help people understand what a blockchain is, with an absolute minimum of distractions. You shouldn't have to wrap your head around the networking or proof-of-work implementation in order to get the core concept.

## Isn't a blockchain without proof-of-work just a linked list?

No, it isn't. At the very least it's a hash list or a Merkle list, which is much more interesting than a linked list because it prevents undetectable tampering with history. I think that this no-tampering feature, combined with the "longest valid chain wins" strategy, is enough to make this a (simplest possible) blockchain.

## Why don't you include (indexes|timestamps|nonces)?

Because you don't strictly need them to implement the core concept of a blockchain. Indexes and timestamps help preserve the ordering of the blocks in the chain, but the ordering is already determined by the fact that each block contains the hash of the previous block. Other than that, indexes/timestamps can help when there are blocks floating around the P2P network, but since there's no P2P network in this implementation we don't need them here. As for nonces, see above for why I didn't include proof of work.

## Other implementations

For a more fleshed-out javascript one, see [Naivechain](https://github.com/lhartikk/naivechain). For a Haskell one, see [Legion](https://github.com/aviaviavi/legion). Both implement some kind of P2P communication and include indexes/timestamps in their blocks, but neither includes proof-of-work or proof-of-stake. I couldn't find any really good _simple_ examples of that.
