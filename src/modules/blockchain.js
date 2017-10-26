import Block from "./block";
import CryptoJS from 'crypto-js'

export default class BlockChain {
    constructor() {
        this.init = false
    }

    GenesisBlock() {
        if (!this.init) {
            this.init = true;
            return new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7")
        }
    }

    save(block) {
        sessionStorage.setItem(block.index, JSON.stringify(block))
    }

    addBlock(newBlock) {
        if (this.isValidNewBlock(newBlock, this.getLatestBlock())) {
            this.save(newBlock)
        }
    }

    isValidNewBlock(newBlock, previousBlock) {
        return ((previousBlock.index + 1 === newBlock.index) && (previousBlock.hash === newBlock.previousHash) && (this.calculateHashForBlock(newBlock) === newBlock.hash))
    }

    calculateHashForBlock(block) {
        return this.calculateHash(block.index, block.previousHash, block.timestamp, block.data)
    }

    getLatestBlock() {
        return JSON.parse(sessionStorage.getItem(sessionStorage.length - 1))
    }

    calculateHash(index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
    }

    generateNextBlock(blockData) {
        const previousBlock = this.getLatestBlock()
        const nextIndex = previousBlock.index + 1
        const nextTimestamp = new Date().getTime() / 1000
        const nextHash = this.calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);

        return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash)
    }

    displayBlockChain() {
        console.table(sessionStorage)
    }
}
