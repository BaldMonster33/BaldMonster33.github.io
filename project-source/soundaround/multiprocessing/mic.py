import usb.core
import usb.util
from tuning import Tuning
import time
import multiprocessing

def add_numbers(numbers, prevs):
    """Read the microphone array and update the shared memory."""
    dev = usb.core.find(idVendor=0x2886, idProduct=0x0018)
    while True:
        if dev:
            Mic_tuning = Tuning(dev)
            try:
                numbers.value = Mic_tuning.direction
                prevs[multiprocessing.current_process().name] = numbers.value
                time.sleep(0.1)
            except KeyboardInterrupt:
                return

def get_direction(numbers):
    """Return the current sound direction."""
    while True:
        direction = numbers.value
        print(f"Current direction: {direction}")
        time.sleep(0.1)
