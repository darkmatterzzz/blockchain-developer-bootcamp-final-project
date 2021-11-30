// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";

library SaveableStruct {
    struct Saveable {
        string name;
        address payable owner; // Parent
        address payable accessibleBy; // Child's wallet
        uint256 amount;
        bool locked;
    }
}

/// @title Candy, teach kids to save with crypto.
/// @author Darkmatterzzz
/// @notice A small contract to store/save Ethereum.
/// @dev I think I got all final project requirements in here, but need to learn WAY more solidity... :)
/// @custom:thanks Thank you Consensys for this amazing course!
contract Candy is Ownable {

    /// @notice Store our saveable count index
    uint public saveableCount;

    mapping (uint => SaveableStruct.Saveable) public saveables;
    mapping (address => uint[]) public saveablesRef;
    mapping (address => uint[]) public accessibleRef;

    /// @notice Trigger created
    /// @param saveableCount Current saveeable index
    event created(uint saveableCount);
    /// @notice Trigger saved
    /// @param saveableCount Current saveeable index
    /// @param amount The amount that's been withdrawn
    event saved(uint saveableCount, uint256 amount);
    /// @notice Trigger withdrawn
    /// @param saveableCount Current saveeable index
    /// @param amount The amount hat's been withdrawn
    event withdrawn(uint saveableCount, uint256 amount);
    /// @notice Trigger liquidated
    /// @param saveableCount Current saveeable index
    event liquidated(uint saveableCount);

    /// @notice Check if saveable is owned by creator, or is accessible by other address
    modifier isOwnerOrAccessible(address _address, address _accessibleBy){
        require(msg.sender == _address || msg.sender == _accessibleBy);
        _;
    }

    /// @notice Check if saveable is owned by creator
    modifier isOwner(address _address){
        require(msg.sender == _address);
        _;
    }

    /// @notice Check if saveable is not locked for withdrawal / liquidation
    modifier isNotLocked(bool _isLocked){
        require(_isLocked != true,
        "Owner has to unlock saveable first!");
        _;
    }

    constructor() {
        saveableCount = 0;
    }

    /// @notice Stores a Saveable
    /// @param name A name to give the Saveable
    /// @param _accessibleBy An address that can access the saveable
    function addSaveable(string memory name, address _accessibleBy) external payable returns(uint) {

        saveables[saveableCount] = SaveableStruct.Saveable({
        name: name,
        owner: payable(msg.sender),
        accessibleBy: payable(_accessibleBy),
        amount: msg.value,
        locked: false
        });

        emit created(saveableCount);

        saveablesRef[ msg.sender ].push( saveableCount );
        accessibleRef[ _accessibleBy ].push( saveableCount );

        saveableCount = saveableCount + 1;

        return saveableCount;
    }

    /// @notice Stores value inside of a Saveable bigger then 0.01 ether
    /// @param _saveableCount Saveable index
    function topUp(uint _saveableCount) external payable
    {
        require( msg.value > 0.01 ether );

        saveables[_saveableCount].amount = saveables[_saveableCount].amount + msg.value;

        emit saved(_saveableCount, msg.value);
    }

    /// @notice Withdraw value inside of a Saveable
    /// @param _saveableCount Saveable index
    /// @param amount Amount to withdraw
    function withdraw(uint _saveableCount, uint256 amount) external payable
    isOwnerOrAccessible(saveables[_saveableCount].owner, saveables[_saveableCount].accessibleBy)
    isNotLocked(saveables[_saveableCount].locked)
    {
        require(saveables[_saveableCount].amount >= amount);

        saveables[_saveableCount].amount = saveables[_saveableCount].amount - amount;

        // Pay to requester
        payable(msg.sender).transfer(amount);

        emit withdrawn(_saveableCount, amount);
    }

    /// @notice Liquidate a Saveable and remove it from store
    /// @param _saveableCount Saveable index
    function liquidate(uint _saveableCount) external payable
    isOwnerOrAccessible(saveables[_saveableCount].owner, saveables[_saveableCount].accessibleBy)
    isNotLocked(saveables[_saveableCount].locked)
    {
        require(_saveableCount < saveableCount);

        // Pay to requester
        payable(msg.sender).transfer(saveables[_saveableCount].amount);

        delete saveables[_saveableCount];

        for(uint i = 0; i< saveablesRef[msg.sender].length; i++){
            if( saveablesRef[msg.sender][i] == _saveableCount ){
                saveablesRef[msg.sender][i] = saveablesRef[msg.sender][ saveablesRef[msg.sender].length-1 ];
                saveablesRef[msg.sender].pop();
            }
        }

        for(uint i = 0; i<accessibleRef[msg.sender].length; i++){
            if( accessibleRef[msg.sender][i] == _saveableCount ){
                accessibleRef[msg.sender][i] = accessibleRef[msg.sender][ accessibleRef[msg.sender].length-1 ];
                accessibleRef[msg.sender].pop();
            }
        }

        emit liquidated(_saveableCount);
    }

    /// @notice View a saveable, only viewable by owner/accessiblyBy
    /// @param _saveableCount Saveable index
    function mySaveable(uint _saveableCount)
    //isOwnerOrAccessible(saveables[_saveableCount].owner, saveables[_saveableCount].accessibleBy)
    public view returns(SaveableStruct.Saveable memory saveable){
        return saveables[_saveableCount];
    }

    /// @notice Returns all saveables where you have access (accessible) to
    function myAccessibles()
    public view returns(uint[] memory){
        return accessibleRef[ msg.sender ];
    }

    /// @notice Returns all saveables of the current sender
    function mySaveables()
    public view returns(uint[] memory) {
        return saveablesRef[ msg.sender ];
    }

    /// @notice Enable external contract to lock a saveable
    function lock(uint _saveableCount)
    isOwner(saveables[_saveableCount].owner)
    public {
        saveables[_saveableCount].locked = true;
    }

    /// @notice Enable external contract to unlock a saveable
    function unlock(uint _saveableCount)
    isOwner(saveables[_saveableCount].owner)
    public {
        saveables[_saveableCount].locked = false;
    }
}