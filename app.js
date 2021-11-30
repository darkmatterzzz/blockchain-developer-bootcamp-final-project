import "./css/tailwind.css";
import Alpine from "alpinejs";
import Web3 from 'web3';

window.accounts = null;
window.setAccounts = function(accounts){
    console.log( accounts );
    window.accounts = accounts;
}
window.setError = function(error){
    console.log( error );
}
window.connectWallet = async function() {
    if( window.ethereum ){
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                checkSupportedNetwork();
            } catch (error) {
                if (error.code === 4001) {
                    console.log('rejected');
                    document.getElementById('rejected').click();
                }
                window.setError(error);
            }
        }
    }
}

function checkSupportedNetwork(){
    if (web3.currentProvider.chainId == '0x1' || web3.currentProvider.chainId == '0x4' || web3.currentProvider.chainId == '0x539'){ // ETH chain, or rinkeby yeehaa :)
        document.getElementById('loadAccounts').click();
        return true;
    } else {
        document.getElementById( 'wrongNetwork').click();
        return false;
    }
}

function noWalletFound(){
    document.getElementById('noWallet').click();
}

window.addEventListener('load', function(){
    if( typeof window.ethereum == "undefined" ){
        noWalletFound();
    } else {
        // User is already connected
        window.web3 = new Web3(window.ethereum);
        if (web3.currentProvider.selectedAddress != null) {
            checkSupportedNetwork();
        }
    }
});

document.addEventListener("alpine:init", () => {

    window.globalApp = {
        connected: false,
        connecting: false,
        txPending: false,
        unsupportedNetwork: false,
        account: '',
        balance: '0',
        amount: 0,
        account_label: '',
        second_wallet: '',
        accessible: 0,
        //scCandy: '0x2B7D99765D985b45a89a361d4A7895C1746e6592',//'0x91c6E17Cf5427751de95467674265a7745993C4e',
        scCandy: '0xc3A3A29d0Bdd4c6A73eA51092CA2aCc50E381390', // Rinkeby contract address
        mySaveables: [],
        mySaveablesData: [],
        myAccessibles: [],
        myAccessiblesData: [],
        abiCandy: [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "created",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "liquidated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "saveableCount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "saved",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "saveableCount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdrawn",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "accessibleRef",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "saveableCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "saveables",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "accessibleBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "locked",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "saveablesRef",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "_accessibleBy",
                        "type": "address"
                    }
                ],
                "name": "addSaveable",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "topUp",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_saveableCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "liquidate",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "mySaveable",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "internalType": "address payable",
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "internalType": "address payable",
                                "name": "accessibleBy",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "locked",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct SaveableStruct.Saveable",
                        "name": "saveable",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "myAccessibles",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "mySaveables",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "lock",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_saveableCount",
                        "type": "uint256"
                    }
                ],
                "name": "unlock",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        Candy: null,
        error: false,
        errorMessage: '',
        candy() {
            if( !this.Candy ){
                this.Candy = new web3.eth.Contract(this.abiCandy, this.scCandy);
            }

            return this.Candy;
        },
        bootApp() {
            this.connecting = true;
            let accounts = new Promise(() => {
                connectWallet();
            });
        },
        reset() {
            this.amount = 0;
            this.txPending = false;
            this.error = false;
        },
        async loadSaveables() {
            this.reset();
            this.refreshAccountBalance();
            var _this = this;
            console.log( this.Candy );
            _this.mySaveablesData = []; // Clear our data so indexes are reset
            _this.myAccessiblesData = []; // Clear our data so indexes are reset

            await this.candy().methods.mySaveables().call({from:window.accounts}).then((result) => {

                console.log( result );

                result.forEach(function(i,d){
                    _this.candy().methods.mySaveable(i).call().then((saveable) => {
                        console.log( saveable )
                        _this.mySaveablesData[i] = saveable;
                    });
                });

                console.log( this.mySaveablesData );
                this.mySaveables = result;

                console.log( result );
            });

            await this.candy().methods.myAccessibles().call({from:window.accounts}).then((result) => {

                console.log( result );

                result.forEach(function(i,d){
                    _this.candy().methods.mySaveable(i).call().then((saveable) => {
                        console.log( saveable )
                        _this.myAccessiblesData[i] = saveable;
                    });
                });

                console.log( this.myAccessiblesData );
                this.myAccessibles = result;

                console.log( result );
            });
        },
        createSaveable(){
            if( this.account_label.length != 0 ){
                console.log( 'add saveable started...');

                if( !this.accessible ){
                    this.second_wallet = window.accounts;
                }

                this.txPending = true;
                    var _this = this;
                    try {
                        this.addSaveable(this.account_label, this.second_wallet)
                            .on('receipt', function (receipt) {
                                console.log(receipt);
                                console.log('cleared');
                                // New saveable was created, so we should
                                // refresh current saving accounts
                                _this.loadSaveables();

                                // Clear fields
                                _this.account_label = '';
                                _this.second_wallet = '';
                            })
                            .on('error', function (error) {
                                console.log('got error ');
                                if (error.code === 4001) {
                                    console.log('rejected');
                                    _this.txPending = false;
                                }
                            });
                    } catch (e){

                        this.error = true;
                        this.errorMessage = 'Make sure you fill in a label and valid address!';

                        this.txPending = false;
                    }
            }
        },
        topUpSaveable: function (saveableCount) {
            if (this.amount > 0) {
                console.log('topup started...');
                this.txPending = true;
                var _this = this;
                this.topUp(saveableCount, this.amount)
                    .on('receipt', (receipt) => {
                        console.log( receipt );
                        _this.loadSaveables();
                        _this.txPending = false;
                    })
                    .on('error', (error) => {
                        console.log( error );
                        _this.txPending = false;
                    })
            }
        },
        withdrawSaveable: function(saveableCount, locked=null) {

            if( locked ){
                this.error = true;
                this.errorMessage = 'The owner has locked this saveable.';
                this.clearError();
            } else {

                if (this.amount > 0) {
                    console.log('widthdraw started...');
                    this.txPending = true;
                    var _this = this;
                    this.withdraw(saveableCount, this.amount)
                        .on('receipt', (receipt) => {
                            console.log(receipt);
                            _this.loadSaveables();
                            _this.txPending = false;
                        })
                        .on('error', (error) => {
                            console.log(error);
                            _this.txPending = false;
                        })
                }
            }
        },
        liquidateSaveable: function(saveableCount){
                console.log('liquidate started...');
                this.txPending = true;
                var _this = this;
                this.liquidate(saveableCount)
                    .on('receipt', (receipt) => {
                        console.log( receipt );
                        _this.loadSaveables();
                        _this.txPending = false;
                    })
                    .on('error', (error) => {
                        console.log( error );
                        _this.txPending = false;
                    })
        },
        lockSaveable: function(saveableCount){
            console.log('lock started...');
            this.txPending = true;
            var _this = this;
            this.lock(saveableCount)
                .on('receipt', (receipt) => {
                    console.log( receipt );
                    _this.loadSaveables();
                    _this.txPending = false;
                })
                .on('error', (error) => {
                    console.log( error );
                    _this.txPending = false;
                })
        },
        unlockSaveable: function(saveableCount){
            console.log('unlock started...');
            this.txPending = true;
            var _this = this;
            this.unlock(saveableCount)
                .on('receipt', (receipt) => {
                    console.log( receipt );
                    _this.loadSaveables();
                    _this.txPending = false;
                })
                .on('error', (error) => {
                    console.log( error );
                    _this.txPending = false;
                })
        },
        addSaveable(name, secondWallet){
            return this.candy().methods.addSaveable(name, secondWallet).send({from: window.accounts});
        },
        topUp(_saveableCount, _value){
            return this.candy().methods.topUp(_saveableCount).send({value: web3.utils.toWei(_value, "ether"), from: window.accounts});
        },
        withdraw(_saveableCount, _value){
            return this.candy().methods.withdraw(_saveableCount, web3.utils.toWei(_value, "ether")).send({from: window.accounts});
        },
        liquidate(_saveableCount){
            return this.candy().methods.liquidate(_saveableCount).send({from: window.accounts});
        },
        lock(_saveableCount){
            return this.candy().methods.lock(_saveableCount).send({from: window.accounts});
        },
        unlock(_saveableCount){
            return this.candy().methods.unlock(_saveableCount).send({from: window.accounts});
        },
        refreshAccountBalance(){
            web3.eth.getBalance(web3.currentProvider.selectedAddress).then((balance)=>{
                this.balance = web3.utils.fromWei( balance, 'ether' );
            });
        },
        loadAccounts(){
            this.connected = true;
            this.connecting = false;
            this.unsupportedNetwork = false;
            this.walletDetected = true;

            window.accounts = web3.currentProvider.selectedAddress;

            this.account = window.accounts;
            this.refreshAccountBalance();

            this.loadSaveables();
        },
        rejected(){
            this.connecting = false;
            console.log('user rejected');
        },
        wrongNetwork(){
            this.unsupportedNetwork = true;
            this.connecting = false;
            this.walletDetected = true;
        },
        clearError(){
            var _this = this;
            setTimeout(function(){
                _this.error = false;
            }, 3000);
        }
    };
    Alpine.data("app", () => (window.globalApp));
});

Alpine.start();