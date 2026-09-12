import time
import numpy as np
from rpi_ws281x import *

def LightsUp(strip, degree, prevs):
    """Control the LED strip based on the microphone readings."""
    degree -= 7.5
    led_number = int(degree / 15) % 12 + 2
    deci = True
    for i in prevs[:]:
        if i != degree+7.5:
            deci = False

    if not deci:
        color = Color(255, 0, 0) if 0 <= degree < 180 else Color(0, 255, 0)
        strip.setPixelColor(12-led_number, color)
        strip.show()
        time.sleep(0.1)
        strip.setPixelColor(12-led_number, Color(0,0,0))
    else:
        colorWipe(strip, Color(0, 0, 0))


def controlLEDs(strip, numbers, prevs):
    """Flash the LEDs in response to sound direction."""
    while True:
        # Calculate the indices of the beads that cover the specified direction
        direction = numbers.value
        bead_indices = np.arange(12)[np.abs(np.arange(12) * 15 - direction) < 8]

        # Calculate the left and right flashing vectors
        left_flash = np.array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
        right_flash = np.array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1])

        # Calculate the flashing pattern for the specified direction
        pattern = np.zeros(12)
        if len(bead_indices) > 0:
            pattern[bead_indices[0]:bead_indices[-1] + 1] = 1
            pattern = np.convolve(pattern, left_flash + right_flash, mode='same')

        # Flash the LEDs with the pattern
        for i in range(10):  # Flash for 10 cycles
            for j in range(len(pattern)):
                if pattern[j]:
                    strip.setPixelColor(j, Color(255, 255, 255))
                else:
                    strip.setPixelColor(j, Color(0, 0, 0))
            strip.show()
            time.sleep(0.1)
            for j in range(len(pattern)):
                strip.setPixelColor(i, Color(0,0,0))
        # trip.setPixelColor(led_number, Color(0,0,0))
