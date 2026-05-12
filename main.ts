function show_signal () {
    basic.clearScreen()
    if (signal_type == 0) {
        basic.showIcon(IconNames.SmallHeart)
    } else if (signal_type == 1) {
        basic.showIcon(IconNames.EighthNote)
        music.play(music.tonePlayable(392, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
    } else if (signal_type == 2) {
        basic.showIcon(IconNames.Diamond)
    }
}
function end_game () {
    game_over = true
    basic.clearScreen()
    basic.showString("Score")
    basic.showNumber(score)
}
function check_score () {
    // HEART -> Button A
    if (signal_type == 0) {
        if (input.buttonIsPressed(Button.A)) {
            score += 1
            basic.showNumber(score)
            basic.pause(300)
        } else if (input.buttonIsPressed(Button.B)) {
            end_game()
        }
    } else if (signal_type == 1) {
        // MUSIC -> Button B
        if (input.buttonIsPressed(Button.B)) {
            score += 1
            basic.showNumber(score)
            basic.pause(300)
        } else if (input.buttonIsPressed(Button.A)) {
            end_game()
        }
    } else if (signal_type == 2) {
        // DIAMOND -> SHAKE
        if (input.isGesture(Gesture.Shake)) {
            score += 1
            basic.showNumber(score)
            basic.pause(300)
        } else if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            end_game()
        }
    }
}
let new_signal = 0
let score = 0
let game_over = false
let signal_type = 0
let last_signal = -1
basic.forever(function () {
    if (!(game_over)) {
        // Only redraw if signal changed
        if (signal_type != last_signal) {
            show_signal()
            last_signal = signal_type
        }
        check_score()
    }
    basic.pause(50)
})
loops.everyInterval(3000, function () {
    if (!(game_over)) {
        new_signal = randint(0, 2)
        // Prevent same signal twice
        while (new_signal == signal_type) {
            new_signal = randint(0, 2)
        }
        signal_type = new_signal
    }
})
