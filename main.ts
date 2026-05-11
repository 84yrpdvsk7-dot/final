let signal_type = 0
let Score = 0
basic.forever(function () {
    if (signal_type == 0) {
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(1000)
        basic.clearScreen()
        if (signal_type == 0 && input.buttonIsPressed(Button.A)) {
            Score += 1
        }
    } else if (signal_type == 1) {
        music.play(music.tonePlayable(392, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        if (signal_type == 1 && input.buttonIsPressed(Button.B)) {
            Score += 1
        }
    } else if (signal_type == 2) {
        basic.showString("A")
        basic.pause(1000)
        basic.clearScreen()
        if (signal_type == 2 && input.isGesture(Gesture.Shake)) {
            Score += 1
        }
    }
    basic.clearScreen()
})
loops.everyInterval(3000, function () {
    signal_type = randint(0, 2)
})
