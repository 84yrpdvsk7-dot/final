signal_type = 0

def on_forever():
    if signal_type == 0:
        basic.show_icon(IconNames.SMALL_HEART)
    elif signal_type == 1:
        music.play(music.tone_playable(392, music.beat(BeatFraction.DOUBLE)),
            music.PlaybackMode.UNTIL_DONE)
    elif signal_type == 2:
        basic.show_string("A")
basic.forever(on_forever)

def on_every_interval():
    global signal_type
    signal_type = randint(0, 2)
loops.every_interval(3000, on_every_interval)
