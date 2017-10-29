function PowerUpList(specialFunc,game) {
    this.mSpecialFunc = specialFunc;
    this.mGame = game;

    var MAX_ELEMENTS = 3;
    var curAmount = 0;

    var WIDTH_SCREEN_SCALE = 1/7;
    var MARGIN_TOP_SCALE = 1/10;

    this.mElements = [];

    this.init();

    this.init = function () {
        game.load.image('powerup_e', 'assets/powerup_empty.png');
        game.load.image('powerup_f', 'assets/powerup_fill.png');

        var y = MARGIN_TOP_SCALE;

        for (var i=0;i<MAX_ELEMENTS;i++) {

            var gameWidth = this.mGame.camera.width;

            var listWidth = this.mGame.camera.width * WIDTH_SCREEN_SCALE;
            var eachWidth = listWidth / MAX_ELEMENTS;



            var x = gameWidth - listWidth + (eachWidth*i);

            var sprite = game.add.sprite(x, y, 'powerup_e');

            var scale = sprite.body.width/eachWidth;
            sprite.scale.setTo(scale,scale);

            sprite.fixedToCamera = true;
            sprite.cameraOffset.setTo(200, 500);

            this.mElements.add(sprite);
        }



    };



    this.addLoad = function() {
        if (curAmount<MAX_ELEMENTS) {
            //fill next powerup
            var empty_sprite = this.mElements.get(curAmount);
            var x = empty_sprite.body.x;
            var y = empty_sprite.body.y;

            var filled_sprite = game.add.sprite(x, y, 'powerup_f');

            var cur_width = filled_sprite.body.width;
            var scale = cur_width/empty_sprite.body.width;
            filled_sprite.scale.setTo(scale,scale);

            curAmount++;
            if (curAmount===MAX_ELEMENTS) {
                this.mSpecialFunc();
            }
        }
    };

    this.clear = function() {
        curAmount = 0;
        //reset all sprides to empty
    };
}