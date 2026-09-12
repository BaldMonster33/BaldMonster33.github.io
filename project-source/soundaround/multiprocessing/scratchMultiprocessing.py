import multiprocessing
import time
import random
from rpi_ws281x import *
import numpy as np
from tuning import Tuning
import usb.core
import usb.util
import time

# LED strip configuration
LED_COUNT = 17  # Number of LED pixels.
LED_PIN = 18  # GPIO pin connected to the pixels (18 uses PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA = 10  # DMA channel to use for generating signal (try 10)
LED_BRIGHTNESS = 255  # Set to 0 for darkest and 255 for brightest
LED_INVERT = False  # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL = 0  # set to '1' for GPIOs 13, 19, 41, 45 or 53
# LED_STRIP = ws.SK6812W_STRIP

# Create NeoPixel object with appropriate configuration.
strip = PixelStrip(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
# Initialize the library (must be called once before other functions).
strip.begin()


# Define functions which animate LEDs in various ways.
def colorWipe(strip, color, wait_ms=50):
	"""Wipe color across display a pixel at a time."""
	for i in range(strip.numPixels()):
		strip.setPixelColor(i, color)
		strip.show()
		time.sleep(wait_ms / 1000.0)

i = 0




def add_numbers(numbers, prevs):
	global i
	dev = usb.core.find(idVendor=0x2886, idProduct=0x0018)
	while True:
		# print(prevs)
		# numbers.value = i % 360
		i += 1
		i %= 10
		# print(i)
		# time.sleep(0.1)
		if dev:
			Mic_tuning = Tuning(dev)
			try:
				# print(Mic_tuning.direction)
				numbers.value = Mic_tuning.direction
				# prevs.append(numbers.value)
				prevs[i] = numbers.value
				# print(prevs[:])
				# prev_prev_direction = prev_direction
				# prev_direction = Mic_tuning.direction
				time.sleep(0.1)
				# print(Mic_tuning.direction, prev_direction, prev_prev_direction)
			except KeyboardInterrupt:
				return
	# i = 0
	# while i < 20:
	# 	i = i + 1
	# 	new_numbers = [random.randint(0, 360) for _ in range(20)]
	# 	numbers[:] = new_numbers
	# 	time.sleep(0.5)

def LightsUp(strip, degree, prevs):
	# print(prevs)
	degree -= 7.5
	# Map degree to LED bead number (0-11)
	led_number = int(degree / 15) % 12 + 2
	deci = True
	for i in prevs[:]:
		if i != degree+7.5:
			deci = False

	if not deci:
		print("Not same")

	# if not deci
	# print("Not same")
	# print(prevs)
	# Set color based on degree range (0-180 for red, 180-360 for green)
		if 0 <= degree < 180:
			color = Color(255, 0, 0)
			strip.setPixelColor(12-led_number, color)
			strip.show()
			time.sleep(0.1)
			strip.setPixelColor(12-led_number, Color(0,0,0))
		elif 180 <= degree <= 360:
			color = Color(0, 255, 0)
			strip.setPixelColor(led_number, color)
			strip.show()
			time.sleep(0.1)
			strip.setPixelColor(led_number, Color(0,0,0))
	else:
		print("Same")
		colorWipe(strip, Color(0, 0, 0))


	# Set the color of the corresponding LED bead
	
# def LightsOffAroundOn(strip, degree):
# 	degree -= 7.5
# 	# Map degree to LED bead number (0-11)
# 	led_number = int(degree / 15) % 12 + 2

# 	# Set color based on degree range (0-180 for red, 180-360 for green)
# 	if 0 <= degree < 180:
# 		color = Color(255, 0, 0)
# 		strip.setPixelColor(12-led_number, color)
# 		strip.show()
# 		time.sleep(0.1)
# 		strip.setPixelColor(led_number, Color(0,0,0))
# 	elif 180 <= degree <= 360:
# 		color = Color(0, 255, 0)
# 		strip.setPixelColor(led_number, color)
# 		strip.show()
# 		time.sleep(0.1)
# 		strip.setPixelColor(led_number, Color(0,0,0))


# def stripRemainingSetColor(strip, led_number, color):
# 	num_list = list(range(12))
# 	# num_list.remove(led_number)
# 	pairs = []
# 	while num_list:
# 		# print(num_list)
# 		i = num_list[0]
# 		j = num_list[-1]
# 		if i != led_number and j != led_number:
# 			pairs.append([i,j])
# 			num_list.pop(0)
# 			num_list.pop()
# 		else:
# 			pairs.extend([i] for i in num_list if i != led_number)
# 			num_list = None

# 	for pair in pairs:
# 		if len(pair) == 1:
# 			strip.setPixelColor(pair, 2)

# 	return pairs


def controlLEDs(numbers, prevs):
	while True:
		# Get the last 20 numbers from the list
		degree = numbers.value
		# Control LEDs based on degree input
		# for degree in degree_list:
		# print(degree)
		LightsUp(strip, degree, prevs)
		  # Add a slight delay between each LED control
#
def controlLEDs2(direction):
	while True:
		# Calculate the indices of the beads that cover the specified direction
		bead_indices = np.arange(12)[np.abs(np.arange(12) * 15 - direction.value) < 8]

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
				strip.setPixelColor(i, 0)
		# trip.setPixelColor(led_number, Color(0,0,0))


if __name__ == '__main__':
	# Create a shared array to store the degree list
	numbers = multiprocessing.Value('i', 0)
	prevs = multiprocessing.Array('i', 10)
	prevs[:] = [361] * 10


	# Create two processes, one for adding numbers and the other for controlling LEDs
	add_process = multiprocessing.Process(target=add_numbers, args=(numbers,prevs))
	control_process = multiprocessing.Process(target=controlLEDs, args=(numbers, prevs,))
	# control_process = multiprocessing.Process(target=controlLEDs2, args=(numbers,))

	# Start both processes
	add_process.start()
	control_process.start()

	# Wait for both processes to finish
	add_process.join()
	control_process.join()

	# Clean up on exit
	colorWipe(strip, Color(0, 0, 0))
	# color = Color(255, 0, 0)
	# led_number = 0
	# while True:
	# 	led_number += 1
	# 	led_number %= 12
	# 	print(led_number)
	# 	stripRemainingSetColor(strip, led_number, color)
	# 	time.sleep(0.5)

