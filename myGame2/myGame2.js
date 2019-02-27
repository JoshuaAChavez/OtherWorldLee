/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}

game_state.main = function() {};
game_state.main.prototype = {

        preload: function() {
            game.load.spritesheet('lee', 'assets/lee.png', 96, 96);
            game.load.spritesheet('boss', 'assets/boss.png', 96, 96);
            game.load.spritesheet('group', 'assets/group.png', 96, 96);
            game.load.spritesheet('office', 'assetes/office.png', 800, 600);
        },
        create: function() {

            // Creates the background
            this.officeBackground = game.add.sprite(0, 0, 'office');

            // Creates the lee sprite
            this.lee = game.add.sprite(340, 285, "lee");
            this.lee.visible = false;

            //Creates the boss' sprite
            this.boss = game.add.sprite(340, 400, "boss");
            this.boss.animations.add("talk", [0, 1], 10, true);
            // creates lee's negative choices
            this.negativeText = game.add.text(140, 55, '', { fontSize: '32px', fill: '#000' });
            this.negativeText.visible = false;

            // creates lee's positive choices
            this.positiveText = game.add.text(440, 55, '', { fontSize: '32px', fill: '#000' });
            this.positiveText.visible = false;

            // creates the boss' dialogue
            this.bossText = game.add.text(140, 300, '', { fontSize: '32px', fill: 'FF0000' });
            this.bossText.visible = false;
            //Creates the boss' sprite
            this.boss = game.add.sprite(340, 400, "boss");
            this.boss.animations.add("talk", [0, 1], 10, true);
            // Starts animation and game
            this.boss.animations.play("talk");
            this.bossTalk = game.add.tween(this.boss).to({ y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);
            this.bossTalk.onComplete.add(function() {
                // Sets lee and text to visible
                this.lee.visible = true;
                this.positiveText.visible = true;
                this.negativeText.visible = true;
                this.bossText.visible = true;

                // Stops the boss from talking
                this.boss.animations.stop();
                // Starts the dialog
                this.checkDialogue();
            }, this);
            // Variable for tracking progress of dialogue
            this.currentDialogueNode = 0;
            checkDialogue: function(userKey) {

                },
                updateDialogue: function(newPos, newNeg, newBoss, newNode) {

                }, {
                    updateDialogue: function(newPos, newNeg, newBoss, newNode) {
                        this.positiveText.text = newPos;
                        this.negativeText.text = newNeg;
                        this.bossText.text = newBoss;
                        this.currentDialogueNode = newNode;
                    }

                }
            checkDialogue: function(userKey) {
                // Dialogue
                var negDialogue = [""];
                var posDialogue = [""];
                var bossDialogue = [
                    ""
                ];
            }
            // Starting Dialogue
            if (this.currentDialogueNode === 0) {
                this.updateDialogue(posDialogue[0], negDialogue[0], bossDialogue[0], 1)
            }
            // Checking First Node
            else if (this.currentDialogueNode === 1) {
                // Tells Boss to go away
                if (userKey === "a") {
                    this.updateDialogue(posDialogue[1], negDialogue[1], bossDialogue[1], 2)
                }
                //Allows Boss in
                else {
                    this.updateDialogue("", "", bossDialogue[4], 2)
                    this.officeBackground.frame = 1;
                }
            }
            // Checking second Node
            else if (this.currentDialogueNode === 2) {
                // Tells Boss to go away
                if (userKey === "a") {
                    this.updateDialogue(posDialogue[2], negDialogue[2], bossDialogue[2], 3)
                }
                // Allows Boss in
                else {
                    this.updateDialogue("", "", bossDialogue[4], 2)
                    this.officeBackground.frame = 1;
                }
            }
            // Checking third node
            else if (this.currentDialogueNode === 3) {
                // Tells Boss to go away
                if (userKey === "a") {
                    this.updateDialogue(posDialogue[3], negDialogue[3], bossDialogue[3], 4)
                }
                // Allows Boss in
                else {
                    this.updateDialogue("", "", bossDialogue[4], 2)
                    this.officeBackground.frame = 1;
                }
            }
            else if (this.currentDialogueNode === 4) {
                // Tells Boss to go away
                if (userKey === "a") {
                    this.updateDialogue("", "", "", 2)
                    this.officeBackground.frame = 1;
                    this.lee.visible = false;
                }
                // Allows Boss in
                else {
                    this.updateDialogue("", "", bossDialogue[4], 2)
                    this.officeBackground.frame = 1;
                }
            }
            // Turns on A key
            akey = game.input.keyboard.addKey(Phaser.Keyboard.A);

            // Allows the A key to update dialogue
            akey.onDown.add(function() {
                this.checkDialogue("a")
            }, this);

            // Turns on the D key
            dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);

            // Allows the D key to update dialogue
            dKey.onDown.add(function() {
                this.checkDialogue("d")
            }, this);
            update: function() {},

        }
        game.state.add('main', game_state.main);
        game.state.start('main');
