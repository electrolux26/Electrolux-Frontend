from pathlib import Path
import re

path = Path(r'c:/Users/sshar169/LearningsCG/Electrolux-Frontend/src/pages/InvoiceDetail.tsx')
text = path.read_text(encoding='utf-8')
new_text = re.sub(r"\?\.([a-zA-Z0-9_]+)\s*;\s*'N/A'", r"?.\1 || 'N/A'", text)
path.write_text(new_text, encoding='utf-8')
print('fixed')
