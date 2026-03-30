import re
with open(r'c:\Users\biraj\sv-web\src\pages\home\HomePage.tsx', 'rb') as f:
    content = f.read()
    matches = re.finditer(b'<span>(.*?)</span>', content)
    for m in matches:
        start = max(0, m.start() - 20)
        end = min(len(content), m.end() + 20)
        print(f"Match raw: {m.group(1)} | Around: {content[start:end]}")
