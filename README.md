# CardIQ

Smart flashcard generator from pasted text or PDFs.

## Folders
- `CardIQ-frontend`: React + Tailwind UI
- `CardIQ-backend`: Flask API (OpenAI + PDF parsing)

## Quick start

### Backend
```bash
cd CardIQ-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# .env must contain: OPENAI_API_KEY=your_key_here
python app.py