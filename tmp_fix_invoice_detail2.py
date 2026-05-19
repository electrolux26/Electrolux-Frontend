from pathlib import Path
import re

path = Path(r'c:/Users/sshar169/LearningsCG/Electrolux-Frontend/src/pages/InvoiceDetail.tsx')
text = path.read_text(encoding='utf-8')
text = re.sub(r"field\.tab === tab\s*;\s*field\.userStatus", "field.tab === tab && field.userStatus", text)
text = re.sub(r">\s*0\s*;\s*\(", "> 0 && (", text)
text = re.sub(r"invoice\.archivingInformation\s*;\s*\(", "invoice.archivingInformation && (", text)
text = re.sub(r";\s*'N/A'", " || 'N/A'", text)
path.write_text(text, encoding='utf-8')
print('fixed')
