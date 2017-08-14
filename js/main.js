var tickTackToeModule = (function () {

    // save the basic templates
    var $startGameTemplate = $('.start-game-template'),
        $initializePlayerTemplate = $('.initialize-player-template'),
        $playGameTemplate = $('.play-game-template');

    // control the start-game template
    var startGame = function () {
        var $startGameButton = $('.start-game-button');
        $startGameButton.click(function () {
            $startGameTemplate.removeClass('app-template_active');
            $initializePlayerTemplate.addClass('app-template_active');
        });
    };

    // control the initialize players template
    var initializeThePlayer = function () {
        var $firstPlayerInput = $('.first-player__name-input'),
            $secondPlayerInput = $('.second-player__name-input'),
            $firstPlayerImage = $('.first-player__image'),
            $secondPlayerImage = $('.second-player__image'),
            $firstPlayerName = $('.first-player__name'),
            $secondPlayerName = $('.second-player__name'),
            $letsStartButton = $('.lets-game-button');

        var isFirstPlayerInit = false,
            isSecondPlayerInit = false;

        $firstPlayerInput.change(function () {
            $firstPlayerName.text( $(this).val() );
            $firstPlayerImage.attr('src', 'https://robohash.org/' + $(this).val() + '?size=200x200');
            isFirstPlayerInit = true;
            if (isFirstPlayerInit && isSecondPlayerInit) {
                $letsStartButton.css('display', 'block');
            }
        });

        $secondPlayerInput.change(function () {
            $secondPlayerName.text( $(this).val() );
            $secondPlayerImage.attr('src', 'https://robohash.org/' + $(this).val() + '?size=200x200');
            isSecondPlayerInit = true;
            if (isFirstPlayerInit && isSecondPlayerInit) {
                $letsStartButton.css('display', 'block');
            }
        });

        $letsStartButton.click(function () {
            $initializePlayerTemplate.removeClass('app-template_active');
            $playGameTemplate.addClass('app-template_active');
        });
    };

    // control the core of playing process
    var playGame = function () {
        var $firstPlayerImageWrapper = $('.first-player__image-wrapper'),
            $secondPlayerImageWrapper = $('.second-player__image-wrapper'),
            $playAreaCells = $('.play-area__cell'),
            activePlayer = 'first',
            possibleWinCombinations = ['048', '246'];

        // add remaining win combinations to array
        for (var i = 0; i < 3; i++) {
            var availableRowCombination = '' + i * 3 + (i * 3 + 1) + (i * 3 + 2),
                availableColumnCombination = '' + i + (i + 3) + (i + 6);
            possibleWinCombinations.push(availableColumnCombination, availableRowCombination);
        }

        // switch players turn after click fill certain cell with X or 0 and verify is any player winner
        $playAreaCells.one('click', function () {

            if (activePlayer === 'first') {
                $(this).html('&#215;');
                activePlayer = 'second';

                verifyTheWinCombination('x');
            } else {
                $(this).html('&#9898;');
                activePlayer = 'first';

                verifyTheWinCombination('y');
            }

            $firstPlayerImageWrapper.toggleClass('active_player');
            $secondPlayerImageWrapper.toggleClass('active_player');
        });

        // check does win combination occur on the table
        var verifyTheWinCombination = function (side) {

            var winnerSide = false;

            // make arrays of values for the each possible win combination and check are they same
            possibleWinCombinations.forEach(function (combination) {

                // array for values
                var combinationValues = [];

                // fill array with values
                for (var i = 0; i < combination.length; i++) {
                    combinationValues.push( $('[data-cell-coordinate="' + combination[i] + '"]').html() );
                }

                // check is one of player winner
                if (combinationValues[0] === combinationValues[1] && combinationValues[1] === combinationValues[2]) {
                    winnerSide = combinationValues[0] !== '' ? side : false;
                }

                // if one player are winner return that payer side
                if (winnerSide) {
                    finishTheGame(winnerSide);
                }
            });
        };

        // show the winner and finish the game
        var finishTheGame = function(winnerSide) {
            $playAreaCells.off('click');
            if (winnerSide === 'x') {
                $firstPlayerImageWrapper.addClass('winner_player');
                $secondPlayerImageWrapper.addClass('lose_player');
            } else {
                $secondPlayerImageWrapper.addClass('winner_player');
                $firstPlayerImageWrapper.addClass('lose_player');
            }
        };
    };

    // control all application
    var controller = function () {
        startGame();
        initializeThePlayer();
        playGame();
    };

    return {
      initTickTackToe: controller
    };

})();

tickTackToeModule.initTickTackToe();
