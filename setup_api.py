__author__ = 'Sanix darker'


import sys
from glob import glob # glob will help us search for files based on their extension or filename.
from distutils.core import setup # distutils sends the data py2exe uses to know which file compile
import py2exe

data_files = []
setup(
    name='FlashIt',
    console=['./api/main.py'], # 'windows' means it's a GUI, 'console' It's a console program, 'service' a Windows' service, 'com_server' is for a COM server
    # You can add more and py2exe will compile them separately.
    options={ # This is the list of options each module has, for example py2exe, but for example, PyQt or django could also contain specific options
        'py2exe': {
            'packages':['jinja2'],
            'dist_dir': 'dist', # The output folder
            'compressed': True, # If you want the program to be compressed to be as small as possible
            'includes':['bs4', 'requests','hashlib', 'datetime', 'flask'], # All the modules you need to be included,  because py2exe guesses which modules are being used by the file we want to compile, but not the imports
        }
    },
    data_files=data_files # Finally, pass the
)