import struct
from struct import unpack
import random


def unpack_drawing(file_handle):
    key_id, = unpack('Q', file_handle.read(8))
    country_code, = unpack('2s', file_handle.read(2))
    recognized, = unpack('b', file_handle.read(1))
    timestamp, = unpack('I', file_handle.read(4))
    n_strokes, = unpack('H', file_handle.read(2))

    image = []
    for i in range(n_strokes):
        n_points, = unpack('H', file_handle.read(2))
        fmt = str(n_points) + 'B'
        x = unpack(fmt, file_handle.read(n_points))
        y = unpack(fmt, file_handle.read(n_points))
        image.append((x, y))

    return {
        'key_id': key_id,
        'country_code': country_code,
        'recognized': recognized,
        'timestamp': timestamp,
        'image': image
    }


def unpack_drawings(filename):
    with open(filename, 'rb') as f:
        i = 0
        end = random.randint(0,20000)
        while i < end:
            try:
                yield unpack_drawing(f)
                i += 1
            except struct.error:
                break


def load_doodles(word, path):
    doodles = []
    filepath = path + word + ".bin"
    for doodle in unpack_drawings(filepath):
        doodles.append(doodle)
    return doodles