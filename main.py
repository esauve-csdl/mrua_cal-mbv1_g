def on_pulsed_p1_low():
    global Fente
    Fente += 1
pins.on_pulsed(DigitalPin.P1, PulseValue.LOW, on_pulsed_p1_low)

def on_button_pressed_a():
    global go, To, Fente
    go = not (go)
    if go:
        To = input.running_time_micros()
        Fente = 0
        basic.show_icon(IconNames.YES)
    else:
        basic.clear_screen()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global go
    go = False
    basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.B, on_button_pressed_b)

Distance = 0
To = 0
Fente = 0
go = False
SENMPU6050.init_mpu6050()
serial.redirect_to_usb()
pins.set_pull(DigitalPin.P1, PinPullMode.PULL_UP)
go = False
Fente = 0
Temps = 0
acc = 0
somme = 0
moyenne = 0
f2 = 0
f1 = 0
Rangefinder.init()

def on_forever():
    global Distance, acc
    Distance = Rangefinder.distance()
    acc = SENMPU6050.axis_acceleration(axisXYZ.Z, accelSen.RANGE_2_G)
    serial.write_line("" + str(Temps) + " ; " + str(Distance) + " ; " + str(Fente) + " ; " + str(acc))
basic.forever(on_forever)

def on_forever2():
    if go:
        basic.show_icon(IconNames.YES)
    else:
        basic.show_arrow(ArrowNames.WEST)
basic.forever(on_forever2)

def on_forever3():
    global Temps
    while go:
        Temps = input.running_time_micros() - To
basic.forever(on_forever3)
