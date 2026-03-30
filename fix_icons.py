import os
import re

file_path = r"c:\Users\biraj\sv-web\src\pages\home\HomePage.tsx"
with open(file_path, 'rb') as f:
    content = f.read()

# Fix Edit Profile
content = re.sub(b'<span>[^<]*?</span>\s*Edit Profile', b'<UserRoundPen size={18} /> Edit Profile', content)
# Fix Preferences
content = re.sub(b'<span>[^<]*?</span>\s*Preferences', b'<Settings size={18} /> Preferences', content)

with open(file_path, 'wb') as f:
    f.write(content)

print("Icon byte-level fix complete.")
