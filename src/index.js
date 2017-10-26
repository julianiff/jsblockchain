import BlockChainUtil from './modules/blockchain'
import Block from "./modules/block";


const BlockChain = new BlockChainUtil();
const genesis = BlockChain.GenesisBlock()

BlockChain.save(genesis)

const newBlock = BlockChain.generateNextBlock("This is the next block")
BlockChain.addBlock(newBlock)

BlockChain.displayBlockChain()

