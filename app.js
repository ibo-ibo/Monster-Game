"use strict";

const generateAttackVal = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      attackCounter: 0,
      healNum: 3,
      healRecords: [],
      isSurrender: false,
      attacks: [],
      gameEnd: false,
      winner: "",
      loser: "",
    };
  },
  computed: {
    playerHealthBarStyle() {
      return {
        width:
          this.playerHealth <= 0
            ? "0%"
            : this.playerHealth > 100
            ? "100%"
            : this.playerHealth + "%",
      };
    },

    monsterHealthBarStyle() {
      return {
        width:
          this.monsterHealth <= 0
            ? "0%"
            : this.monsterHealth > 100
            ? "100%"
            : this.monsterHealth + "%",
      };
    },
  },

  methods: {
    attackMonster() {
      this.attackCounter++;
      const attackVal = generateAttackVal(5, 12);
      this.monsterHealth -= attackVal;
      this.specialAttackChecker();
      this.attackPlayer();
      this.isGameEnd();
      this.attacks.push(
        this.generateAttack("Player", attackVal, this.playerHealth, "Normal")
      );
    },

    attackPlayer() {
      const attackVal = generateAttackVal(8, 14);
      this.playerHealth -= attackVal;
      this.attacks.push(
        this.generateAttack("Monster", attackVal, this.monsterHealth, "Normal")
      );
    },

    specialAttackMonster() {
      this.attackCounter++;
      const attackVal = generateAttackVal(10, 25);
      this.monsterHealth -= attackVal;
      this.attackPlayer();
      this.attacks.push(
        this.generateAttack("Player", attackVal, this.playerHealth, "Special")
      );
    },

    specialAttackChecker() {
      return this.attackCounter > 0 && this.attackCounter % 3 === 0;
    },

    heal() {
      if (this.healNum > 0) {
        this.playerHealth += 10;
        this.healNum--;
      }
    },

    healAvailable() {
      return this.healNum <= 0 ? true : false;
    },

    surrender() {
      this.winner = "Monster";
      this.loser = "Player";
      this.playerHealth = 0;
      this.isSurrender = true;
      this.gameEnd = true;
    },

    isGameEnd() {
      if (this.playerHealth <= 0) {
        this.gameEnd = true;
        this.winner = "Monster";
        this.loser = "Player";
      }
      if (this.monsterHealth <= 0) {
        this.gameEnd = true;
        this.winner = "Player";
        this.loser = "Monster";
      }
    },

    resetGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.healNum = 3;
      this.attackCounter = 0;
      this.isSurrender = false;
      this.attacks = [];
      this.winner = "";
      this.loser = "";
      this.gameEnd = false;
    },

    generateAttack(attckr, val, health, type) {
      return {
        attacker: attckr,
        attackValue: val,
        attackerHealth: health,
        attackType: type,
      };
    },
  },
});
app.mount("#game");
