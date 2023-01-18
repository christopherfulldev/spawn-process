import sys
import json
from urllib.request import Request,urlopen

def main():
    item = json.loads(sys.argv[1])
    url = item.get('url')
    filePath = item.get('filePath')
    data = open(filePath, 'rb').read()
    req = Request(url, data=data, method='POST')
    response = urlopen(req).read().decode('utf-8')
    print(response)


if __name__ == '__main__':
    main()