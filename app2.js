require("./app2.css");
var $agohw$alpinejs = require("alpinejs");
var $agohw$web3 = require("web3");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}



window.accounts = null;
window.setAccounts = function(accounts) {
    console.log(accounts);
    window.accounts = accounts;
};
window.setError = function(error) {
    console.log(error);
};
window.connectWallet = async function() {
    if (window.ethereum) {
        if (window.ethereum) try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            $e6df37ad67f48183$var$checkSupportedNetwork();
        } catch (error) {
            if (error.code === 4001) {
                console.log('rejected');
                document.getElementById('rejected').click();
            }
            window.setError(error);
        }
    }
};
function $e6df37ad67f48183$var$checkSupportedNetwork() {
    if (web3.currentProvider.chainId == '0x1' || web3.currentProvider.chainId == '0x4' || web3.currentProvider.chainId == '0x539') {
        document.getElementById('loadAccounts').click();
        return true;
    } else {
        document.getElementById('wrongNetwork').click();
        return false;
    }
}
function $e6df37ad67f48183$var$noWalletFound() {
    document.getElementById('noWallet').click();
}
window.addEventListener('load', function() {
    if (typeof window.ethereum == "undefined") $e6df37ad67f48183$var$noWalletFound();
    else {
        // User is already connected
        window.web3 = new ($parcel$interopDefault($agohw$web3))(window.ethereum);
        if (web3.currentProvider.selectedAddress != null) $e6df37ad67f48183$var$checkSupportedNetwork();
    }
});
document.addEventListener("alpine:init", ()=>{
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
        scCandy: '0x91c6E17Cf5427751de95467674265a7745993C4e',
        mySaveables: [],
        mySaveablesData: [],
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
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
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
                            }
                        ],
                        "internalType": "struct Candy.Saveable",
                        "name": "saveable",
                        "type": "tuple"
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
            }
        ],
        Candy: null,
        candy () {
            if (!this.Candy) this.Candy = new web3.eth.Contract(this.abiCandy, this.scCandy);
            return this.Candy;
        },
        bootApp () {
            this.connecting = true;
            let accounts = new Promise(()=>{
                connectWallet();
            });
        },
        reset () {
            this.amount = 0;
            this.txPending = false;
        },
        async loadSaveables () {
            this.reset();
            this.refreshAccountBalance();
            var _this = this;
            console.log(this.Candy);
            _this.mySaveablesData = []; // Clear our data so indexes are reset
            await this.candy().methods.mySaveables().call().then((result)=>{
                result.forEach(function(i, d) {
                    _this.candy().methods.mySaveable(i).call().then((saveable)=>{
                        console.log(saveable);
                        _this.mySaveablesData.push(saveable);
                    });
                });
                this.mySaveables = result;
            });
        },
        createSaveable () {
            if (this.account_label.length != 0 && this.second_wallet.length != 0) {
                console.log('add saveable started...');
                this.txPending = true;
                var _this = this;
                this.addSaveable(this.account_label, this.second_wallet).on('receipt', function(receipt) {
                    console.log(receipt);
                    console.log('cleared');
                    // New saveable was created, so we should
                    // refresh current saving accounts
                    _this.loadSaveables();
                    // Clear fields
                    _this.account_label = '';
                    _this.second_wallet = '';
                }).on('error', function(error) {
                    console.log('got error ');
                    if (error.code === 4001) {
                        console.log('rejected');
                        this.txPending = false;
                    }
                });
            }
        },
        topUpSaveable: function(saveableCount) {
            if (this.amount > 0) {
                console.log('topup started...');
                this.txPending = true;
                var _this = this;
                this.topUp(saveableCount, this.amount).on('receipt', (receipt)=>{
                    console.log(receipt);
                    _this.loadSaveables();
                    _this.txPending = false;
                }).on('error', (error)=>{
                    console.log(error);
                    _this.txPending = false;
                });
            }
        },
        withdrawSaveable: function(saveableCount) {
            if (this.amount > 0) {
                console.log('widthdraw started...');
                this.txPending = true;
                var _this = this;
                this.withdraw(saveableCount, this.amount).on('receipt', (receipt)=>{
                    console.log(receipt);
                    _this.loadSaveables();
                    _this.txPending = false;
                }).on('error', (error)=>{
                    console.log(error);
                    _this.txPending = false;
                });
            }
        },
        liquidateSaveable: function(saveableCount) {
            if (this.amount > 0) {
                console.log('liquidate started...');
                this.txPending = true;
                var _this = this;
                this.withdraw(saveableCount, this.amount).on('receipt', (receipt)=>{
                    console.log(receipt);
                    _this.loadSaveables();
                    _this.txPending = false;
                }).on('error', (error)=>{
                    console.log(error);
                    _this.txPending = false;
                });
            }
        },
        addSaveable (name, secondWallet) {
            return this.candy().methods.addSaveable(name, secondWallet).send({
                from: window.accounts
            });
        },
        topUp (_saveableCount, _value) {
            return this.candy().methods.topUp(_saveableCount).send({
                value: web3.utils.toWei(_value, "ether"),
                from: window.accounts
            });
        },
        withdraw (_saveableCount, _value) {
            return this.candy().methods.withdraw(_saveableCount, web3.utils.toWei(_value, "ether")).send({
                from: window.accounts
            });
        },
        liquidate (_saveableCount, _value) {
            return this.candy().methods.liquidate(_saveableCount).send({
                from: window.accounts
            });
        },
        refreshAccountBalance () {
            web3.eth.getBalance(web3.currentProvider.selectedAddress).then((balance)=>{
                this.balance = web3.utils.fromWei(balance, 'ether');
            });
        },
        loadAccounts () {
            this.connected = true;
            this.connecting = false;
            this.unsupportedNetwork = false;
            this.walletDetected = true;
            window.accounts = web3.currentProvider.selectedAddress;
            this.account = window.accounts;
            this.refreshAccountBalance();
            this.loadSaveables();
        },
        rejected () {
            this.connecting = false;
            console.log('user rejected');
        },
        wrongNetwork () {
            this.unsupportedNetwork = true;
            this.connecting = false;
            this.walletDetected = true;
        }
    };
    ($parcel$interopDefault($agohw$alpinejs)).data("app", ()=>window.globalApp
    );
});
($parcel$interopDefault($agohw$alpinejs)).start();


//# sourceMappingURL=app2.js.map
