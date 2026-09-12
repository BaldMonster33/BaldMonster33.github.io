import multiprocessing
import time
from rpi_ws281x import *
import numpy as np
from mic import add_numbers
from lights import LightsUp, controlLEDs


def configure_strip():
    """Configure the LED strip."""
    LED_COUNT = 17  # Number of LED pixels.
    LED_PIN = 18  # GPIO pin connected to the pixels (18 uses PWM!).
    LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
    LED_DMA = 10  # DMA channel to use for generating signal (try 10)
    LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
    LED_INVERT = False  # True to invert the signal (when using NPN transistor level shift)
    LED_CHANNEL = 0  # set to '1' for GPIOs 13, 19, 41, 45 or 53
    strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    strip.begin()
    return strip


def main():
    # Configure the LED strip
    strip = configure_strip()

    # Create a shared array to store the degree list
    numbers = multiprocessing.Value('i', 0)
    prevs = multiprocessing.Array('i', 10)
    prevs[:] = [361] * 10

    # Create two processes, one for adding numbers and the other for controlling LEDs
    add_process = multiprocessing.Process(target=add_numbers, args=(numbers, prevs))
    control_process = multiprocessing.Process(target=controlLEDs, args=(strip, numbers, prevs))

    # Start both processes
    add_process.start()
    control_process.start()

    # Wait for both processes to finish
    add_process.join()
    control_process.join()

    # Clean up on exit
    colorWipe(strip, Color(0, 0, 0))


if __name__ == '__main__':
    main()
