import time
from rpi_ws281x import Color, PixelStrip, ws

# LED strip configuration:
LED_COUNT = 40  # Number of LED pixels.
LED_PIN = 18  # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10  # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False  # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0
LED_STRIP = ws.SK6812_STRIP_RGBW

def create_strip():
    """Create and return NeoPixel object with appropriate configuration."""
    strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)
    strip.begin()
    return strip

def control_LED(strip, led_number, color):
    """Set the color of the corresponding LED bead."""
    strip.setPixelColor(led_number, color)
    strip.show()

def get_degree_list_from_file(filename):
    """Read degree input from file and return a list of degrees."""
    with open(filename, 'r') as f:
        degree_list = [int(degree) for degree in f.read().splitlines()]
    return degree_list

def control_LEDs_based_on_degree(strip, degree_list):
    """Control LEDs based on degree input."""
    for degree in degree_list:
        # Map degree to LED bead number (0-11)
        led_number = int(degree / 15) % 12

        # Set color based on degree range (0-180 for red, 180-360 for green)
        if 0 <= degree < 180:
            color = Color(255, 0, 0)
        elif 180 <= degree <= 360:
            color = Color(0, 255, 0)

        control_LED(strip, led_number, color)
        time.sleep(0.05)  # Add a slight delay between each LED control

def clean_up(strip):
    """Clean up the strip when the program is interrupted."""
    colorWipe(strip, Color(0, 0, 0))

def main():
    strip = create_strip()

    print('Press Ctrl-C to quit.')
    while True:
        try:
            degree_list = get_degree_list_from_file('degree_input.txt')
            control_LEDs_based_on_degree(strip, degree_list)
        except KeyboardInterrupt:
            # Clean up on Ctrl-C
            clean_up(strip)
            break

if __name__ == '__main__':
    main()
