pins.onPulsed(DigitalPin.P1, PulseValue.Low, function () {
    Fente += 1
})
input.onButtonPressed(Button.A, function () {
    go = true
    if (go == true) {
        To = input.runningTime()
        Fente = 0
        angle = 0
        basic.showIcon(IconNames.Yes)
    } else {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    go = false
    basic.showIcon(IconNames.No)
})
/**
 * Identification du véhicule et le groupe doivent être identique
 */
let acc = 0
let dist_fente = 0
let Distance = 0
let Temps = 0
let To = 0
let angle = 0
let Fente = 0
let go = false
let ID = 1
radio.setGroup(1)
SENMPU6050.initMPU6050()
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
go = false
Fente = 0
angle = 0
Rangefinder.init()
/**
 * Facteur multiplicatif afin de calibrer l'accéléromètre à 9,8 m/sec2 lorsque le véhicule est en position verticale.
 */
basic.forever(function () {
    Temps = input.runningTime() - To
    Distance = Rangefinder.distance()
    dist_fente = Math.round(Fente * 4.76)
    angle = Math.round(pins.analogReadPin(AnalogPin.P10) * 0.344 - 2.53)
    acc = input.acceleration(Dimension.Y) * 0.0094
    radio.sendString("" + Temps + ";" + ("" + dist_fente) + ";" + ("" + acc) + ";" + ("" + angle))
    led.toggle(4, 4)
})
basic.forever(function () {
    if (go == true) {
        basic.showNumber(ID)
    } else {
        basic.showArrow(ArrowNames.West)
    }
})
