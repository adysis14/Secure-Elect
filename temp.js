const Web3 = require("web3")

async function main() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  )
  const abi = JSON.parse(
    '[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}] '
  )

  const VotingContract = web3.eth.contract(abi)
  const contractInstance = VotingContract.at(
    "0x8E29E77Da460cb2d03B2913E0D8812bC82132ED1"
  )

  //   const accounts = await web3.eth.getAccounts()

  const candidateName = "Akshay"

  const numberOfVotes = await contractInstance.totalVotesFor
    .call(candidateName)
    .toLocaleString()

  console.log(`Voting count for ${candidateName} are ${numberOfVotes}`)
}

main()
