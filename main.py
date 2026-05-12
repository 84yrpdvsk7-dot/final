def show_signal():
    basic.clear_screen()
    if signal_type == 0:
        basic.show_icon(IconNames.SMALL_HEART)
    elif signal_type == 1:
        basic.show_icon(IconNames.EIGHTH_NOTE)
        music.play(music.tone_playable(392, music.beat(BeatFraction.HALF)),
            music.PlaybackMode.IN_BACKGROUND)
    elif signal_type == 2:
        basic.show_icon(IconNames.DIAMOND)
def end_game():
    global game_over
    game_over = True
    basic.clear_screen()
    basic.show_string("Score")
    basic.show_number(score)
def check_score():
    global score
    # HEART -> Button A
    if signal_type == 0:
        if input.button_is_pressed(Button.A):
            score += 1
            basic.show_number(score)
            basic.pause(300)
        elif input.button_is_pressed(Button.B):
            end_game()
    elif signal_type == 1:
        # MUSIC -> Button B
        if input.button_is_pressed(Button.B):
            score += 1
            basic.show_number(score)
            basic.pause(300)
        elif input.button_is_pressed(Button.A):
            end_game()
    elif signal_type == 2:
        # DIAMOND -> SHAKE
        if input.is_gesture(Gesture.SHAKE):
            score += 1
            basic.show_number(score)
            basic.pause(300)
        elif input.button_is_pressed(Button.A) or input.button_is_pressed(Button.B):
            end_game()
score = 0
game_over = False
signal_type = 0
last_signal = -1

def on_forever():
    global last_signal
    if not (game_over):
        # Only redraw if signal changed
        if signal_type != last_signal:
            show_signal()
            last_signal = signal_type
        check_score()
    basic.pause(50)
basic.forever(on_forever)

def on_every_interval():
    global signal_type
    if not (game_over):
        new_signal = randint(0, 2)
        # Prevent same signal twice
        while new_signal == signal_type:
            new_signal = randint(0, 2)
        signal_type = new_signal
loops.every_interval(3000, on_every_interval)
