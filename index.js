const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index,timeStamp,data,previousHash = ''){
      this.index = index
      this.timeStamp = timeStamp
      this.data = data
      this.previousHash = previousHash
      this.hash = this.calculateHash()
    }

    calculateHash(){
        return SHA256(
          this.index + this.timeStamp +  this.previousHash + JSON.stringify(this.data).toString() )
    }
}

class BlockChain {
  constructor(){
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock(){
    return new Block(0,Date.now.toString(),'Genesis Block','05454545')
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    this.chain.push(newBlock)
  }
}

const genCoin = new BlockChain()

genCoin.addBlock(new Block(genCoin.getLatestBlock().index + 1,new Date().toLocaleString(),{
  name:'Jetigen',
  from:'Zhanarbek'
},))
genCoin.addBlock(new Block(genCoin.getLatestBlock().index + 1,new Date().toLocaleString(),{
  name:'Jetigen',
  from:'Zhanarbek'
},))
genCoin.addBlock(new Block(genCoin.getLatestBlock().index + 1,new Date().toLocaleString(),{
  name:'Jetigen',
  from:'Zhanarbek'
},))

console.table(JSON.stringify(genCoin,null,4))
