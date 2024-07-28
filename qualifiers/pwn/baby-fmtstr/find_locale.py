import babel
from babel.dates import format_date, format_time
from datetime import datetime
import locale

with open("locales.txt") as f:
    now = datetime.now()
    id = f.readline()
    counter = 0
    while True:
        counter += 1
        id = f.readline()
        if not id:
            break 
        if counter % 3 != 0:
            continue
        try:
            # locale.setlocale(2, id)
            # formatted = now.strftime("%x")
            # print(formatted)
            formatted = format_date(now, "MMMM", locale = id) 
            if 'n' == formatted[-1]:
                print(formatted)
                print(id)
        except Exception as e:
            continue
    print("completed")