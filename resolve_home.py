
import os

file_path = 'pages/Home.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_head = False
in_incoming = False

for line in lines:
    if line.startswith('<<<<<<< HEAD'):
        in_head = True
        continue
    elif line.startswith('======='):
        in_head = False
        in_incoming = True
        continue
    elif line.startswith('>>>>>>>'):
        in_incoming = False
        continue
    
    if in_head or (not in_head and not in_incoming):
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Resolved conflicts in Home.tsx")
