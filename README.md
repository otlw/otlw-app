About
========

An Ethereum based solution for peer assessment based on a participatory token economy. You get tokens through assessment, you pay them to get assessed. This system is an abstracted assessment framework capable of assessing anything that can be defined through a hierarchical ontology.
For more documentation see our [whitepaper](http://fathom.network/whitepaper/).

Concept Structure
============

To define an assessment we use a hierarchical structure from most general to most specific. For example, if you wanted to be assessed in creating a Hello World program in Python you would create that assessment on the Hello World concept, which would be a child of the Python concept, which would be a child of the Programming concept, et cetera. This allows us to pull assessors accurately, and group similar tasks together. 

Contract Structure
==============

The system is based upon a data store and management contract:
`conceptRegistry`, which can be used to create new Concepts. Concepts manage the
creation and storage of `assessments`. Assessments are paid for in the native
token of the network, defined in `FathomToken`.


Dependencies
========

Install all dependencies by running 

> npm i

This will install 
- [ganache-cli](https://github.com/trufflesuite/ganache-cli) (formerly named testrpc), to run your private testnet,
- [truffle-hd-walletprovider](https://github.com/trufflesuite/truffle-hdwallet-provider) to manage keys when deploying to rinkeby and
- [ethjs-abi](https://github.com/ethjs/ethjs-abi) and [ethereumjs-abi](https://github.com/ethereumjs/ethereumjs-abi), to be able to run all our tests.

Deployment
========

Deploying a fathom-network-instance will lead the following contracts being on-chain:

- ConceptRegistry.sol, to manage creation of new concepts
- FathomToken.sol, to manage payments
- One instance of Concept.sol, being the root of the concept-tree (the _MEW-concept_)
- Math.sol, a library to do scoring and clustering

### To a private testnet

Next, open a console and run your private testnet:
> ganache-cli

In another console, run the migration: 
>'truffle migrate'

_NOTE: If you have deployed to rinkeby before, make sure to remove/rename the
`initialMembers.json` file. Otherwise signing transactions on the testnet will
not work and all tests will fail._

### To rinkeby-testnet

As you want to deploy to a real testnet, you need to have
[Metamask](https://metamask.io/) installed and some rinkeby-ether on its first
account. To generate your keys, create a file `secrets.json` in the uppermost
project folder ('./'), where you save the seed-phrase that underlies the account
that pays for the deployment. (Metamask -> Settings -> Reveal Seed Words) 

Your secrets.json-file should look like this: 
>'{"seed": "baseball poet vague session shrimp humus embrace glare monkey donkey balony bread"}'

#### 1) Specify the initial AHA-Owner

You need to provide at least one address to which all the initial tokens will be
distributed. 
To do so, create a file `./intitialMembers.json` in the root-folder of the
project.

Its content should look like this:
>'{"accounts": ["0xaccount1...", "0xaccount2...", ... ]}'

It must hold at least one account, which will the one that will receive all the
AHA-tokens. To modify the amount, open `/migrations/2_deploy_contracts.js` and
set the variable `initialAmount` to the desired value.

#### 2) Specify an initial set of users and distribute tokens to them

_*NOTE*: If you *DON'T* want to the MEW-concept to have any initial members nor
distribute tokens to them, remove the third and fourth migration-file and
continue at step 3). (Be aware that this you'll have to manually call the
distributor and add the first member to the MEW-concept before any assessment
can be run in your system.)_

If you *DO* want to seed the network with some initial users in the mew-concept
add them to the list of initial accounts.

_OPTIONAL_: If you want to be able to add more members than specified in the
list, adjust the `nInitialMewMembers`-variable in `/migrations/2_deploy_contracts.js`
to that end.

#### 3) Configure token & member distribution

By default, all tokens will be distributed amongst all addresses in the
initial-member list and all addresses will be added to MEW. If you want to
change that play around with the parameters in `/migrations/3_fund_users.js` and
`/migrations/4_add_members_to_mew.js` respectively.

#### 4) Deploy

Lastly, run 
>'truffle migrate --network rinkeby'


#### 5) Troubleshooting

- If you encounter an error-message saying 'Unknown number of arguments to
  solidity-function' it sometimes helps to recompile everything: 
  > rm -rf ./build

- If you get any other issues feel free to open an issue or add to an existing
one.

Contributing
=========
Feel free to submit a pull request or send an email at <contact@fathom.network> if you would like to get in contact.
