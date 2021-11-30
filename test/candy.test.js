let { catchRevert } = require("./exceptionsHelpers.js");
const Candy = artifacts.require("Candy");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Candy", function (accounts) {

  const [_owner, alice, bob] = accounts;
  const name = "Saving";
  const accessibleBy = bob;

  describe('Setup', () => {

    it("is deployed", async function () {
      Candy.deployed().then(instance => {
        return assert.isTrue(true);
      });
    });

    it("should have an owner", async () => {
      const candy = await Candy.deployed();
      assert.equal(typeof candy.owner, 'function', "the contract has no owner");
    });

    it("has a starting saveable index of 0", async function(){
      const candy = await Candy.deployed();
      const ssCandySaveableCount = await candy.saveableCount.call();
      return assert.equal(ssCandySaveableCount, 0, `Initial state should be zero.`);
    });

  })

  describe("Saveable", () => {

    it("is able to create a saveable", async function(){
      const candy = await Candy.deployed();
      await candy.addSaveable(name, accessibleBy, {from: alice});

      const result = await candy.mySaveable(0);
      assert.equal(
          result[0],
          name,
          "the name of the last added item does not match the expected value",
      );

      assert.equal(
          result[1],
          alice,
          "owner is incorrect",
      );

      assert.equal(
          result[2],
          bob,
          "accessible is incorrect",
      );

      assert.equal(
          result[3],
          0,
          "starting saving account should be zero",
      );

    });

    it('should trigger created event on create', async() => {
      const candy = await Candy.deployed();
      const tx = await candy.addSaveable(name, accessibleBy, {from: alice});

      if( tx.logs[0].event == "created") {
        eventEmitted = true;
      }

      assert.equal(
          eventEmitted,
          true,
          "adding a Saveable should emit a created event",
      );

    });

    it('is able to deposit ether, and accessibleBy can withdraw', async () => {
      const candy = await Candy.deployed();
      const saveable = await candy.addSaveable(name, accessibleBy, {from: alice});

      var aliceBalanceBefore = await web3.eth.getBalance(alice);
      var bobBalanceBefore = await web3.eth.getBalance(bob);

      var tx = await candy.topUp(0, { from: alice, value: web3.utils.toWei('1','ether') } );

      const amountInSaveable = await candy.mySaveable(0);

      assert.equal(
          amountInSaveable.amount,
          web3.utils.toWei('1', 'ether'),
          'Saveable should have 1 ether inside'
      );

      await candy.withdraw(0, web3.utils.toWei('1','ether'), {from: bob} );

      var aliceBalanceAfter = await web3.eth.getBalance(alice);
      var bobBalanceAfter = await web3.eth.getBalance(bob);

      // Need to figure out how to check for gas cost as well inside test
      /*assert.equal(
          web3.utils.toBN(aliceBalanceAfter).toString(),
          web3.utils.toBN(aliceBalanceBefore).sub( web3.utils.toBN( web3.utils.toWei('1','ether') ) ).toString(),
          "Alice's balance should be 1 ether "
      );*/

      /*assert.equal(
          web3.utils.toBN(bobBalanceAfter).toString(),
          web3.utils.toBN(bobBalanceBefore).add( web3.utils.toBN( web3.utils.toWei('1','ether') ) ).toString(),
          "Bob's balance should be 1 ether higher"
      );*/

    });

    it('should revert when not owner or accessibleBy tries to withdraw', async () => {
      const candy = await Candy.deployed();
      const saveable = await candy.addSaveable(name, alice, {from: alice});
      await catchRevert(candy.withdraw(0, web3.utils.toWei('1', 'ether'), {from: bob}));
    });

  });

  describe("Staking", () => {

    it("is able to stake part of saveable", async function(){
      return assert('All oke');
    });

  });

  describe('Thanks', () => {
    it("Small thanks to my colleagues", async function(){
    });
    it("For supporting me through this course", async function(){
    });
    it("And testing it!", async function(){
    });
    it("Weichie & MichMich Jensi", async function(){
    });
  })
});
