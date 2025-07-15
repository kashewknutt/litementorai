# /agents/rubric.py
from utils.llm import call_llm_with_fallback

rubric_prompt_template = '''
You are an academic evaluator.

Evaluate the student's answer according to the selected **regional grading rubric**: "{rubric}".

Rubric details:
{rubric_details}

---

Evaluate this answer:

Question:
"{question}"

Student Answer:
"{answer}"

Respond in JSON only:
{{ 
  "feedback": "...",
  "suggestions": [
    {{"title": "...", "description": "..."}},
    {{"title": "...", "description": "..."}},
    {{"title": "...", "description": "..."}}
  ],
  "score": {{
    "clarity": X,
    "logic": Y,
    "completeness": Z,
    "difficulty": "Easy" | "Medium" | "Hard"
  }}
}}
'''.strip()


def get_rubric_details(location: str) -> str:
    prompt = f"You're an education expert. Briefly describe what grading priorities and answer formats are expected in '{location}' board or school system."
    return call_llm_with_fallback(prompt)
