function getrandomValue(min, max) {
    // javascript funtion to calculate a random nummber between min and max(floor is for not having after comma nummbers)
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: 0,
            logMessages: [],
        }
    },

    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getrandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            // if attack monster attack back
            this.attackPlayer();
            this.currentRound++;
        },

        attackPlayer() {
            const playerValue = getrandomValue(8, 15);
            this.playerHealth -= playerValue;
            this.addLogMessage('monster', 'attack', playerValue);
        },

        specialattack() {
            const attackValue = getrandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer;
        },

        healPlayer() {
            this.currentRound++;
            const healValue = getrandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },

        reStartGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },

        surrender() {
            this.winner = 'monster';
        },

        addLogMessage(who, what, value) {
            // unshift methode is the same like push method but latest value is on top 
            this.logMessages.unshift({
                action: who,
                actionType: what,
                actionValue: value,
            });
        },

    },
    computed: {
        // is statement is for healthbar not goging under 0
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            } else {
                return { width: this.monsterHealth + '%' }
            }

        },
        playerBarStyles() {
            // is statement is for healthbar not goging under 0
            if (this.playerHealth < 0) {
                return { width: '0%' }
            } else {
                return { width: this.playerHealth + '%' }
            }

        },
        mayUseSpecialAttack() {
            // botton is enable every 3 rounds
            return this.currentRound % 3 !== 0;
        },

    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //player lost
                this.winner = 'monster';
            }
        },

        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                //draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //monster lost
                this.winner = 'player'
            }
        }
    },

});
app.mount('#game');