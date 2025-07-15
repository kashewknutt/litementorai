# backend/main.py
import json
import re
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
from utils.llm import call_llm_with_fallback
from agents.rubric import rubric_prompt_template

load_dotenv(dotenv_path=".env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EvaluationRequest(BaseModel):
    question: str
    answer: str

class RubricRequest(BaseModel):
    location: str

class RubricEvalRequest(BaseModel):
    question: str
    answer: str
    rubric: str
    rubric_details: str

class EvaluationResponse(BaseModel):
    feedback: str
    suggestions: list[dict]
    score: dict

@app.post("/evaluate")
def evaluate(data: EvaluationRequest):
    print("Received Evaluation Request: ", data, flush=True)
    prompt = f'''
You are an academic evaluator. Evaluate this student's answer.

Question: {data.question}

Student Answer: {data.answer}

Provide the following JSON response:
{{
  "feedback": "A short paragraph on clarity, logic, and completeness",
  "suggestions": [
    {{"title": "...", "description": "..."}},
    {{"title": "...", "description": "..."}},
    {{"title": "...", "description": "..."}}
  ],
  "score": {{
    "clarity": X,
    "logic": Y,
    "completeness": Z,
    "difficulty": "Easy/Medium/Hard"
  }}
}}'''.strip()

    raw_text = call_llm_with_fallback(prompt)
    raw_text = raw_text.replace('```json', '').replace('```', '').strip()

    try:
        final_response = EvaluationResponse.model_validate_json(raw_text)
        print("Parsed JSON Directly", flush=True)
        return final_response
    except:
        print("Trying to extract JSON fallback...", flush=True)
        match = re.search(r'{.*}', raw_text, re.DOTALL)
        if match:
            try:
                extracted = json.loads(match.group())
                final_response = EvaluationResponse.model_validate(extracted)
                print("Extracted JSON Response", flush=True)
                return final_response
            except Exception as inner_e:
                print("Failed to parse extracted JSON", inner_e, flush=True)
        else:
            print("No JSON block found in response", flush=True)

    return {"error": "All providers failed."}

@app.post("/rubric-info")
def rubric_info(data: RubricRequest):
    print("Fetching rubric for:", data.location, flush=True)
    user_prompt = f"You're an education expert. Briefly describe what grading priorities and answer formats are expected in '{data.location}' board or school system."
    return {"rubric": call_llm_with_fallback(user_prompt)}

@app.post("/evaluate-rubric")
def evaluate_rubric(data: RubricEvalRequest):
    print("Rubric Evaluation for:", data.rubric, "| Location Info Injected", flush=True)
    prompt = rubric_prompt_template.format(
        rubric=data.rubric,
        rubric_details=data.rubric_details,
        question=data.question,
        answer=data.answer
    )
    raw_text = call_llm_with_fallback(prompt)
    raw_text = raw_text.replace('```json', '').replace('```', '').strip()

    try:
        final_response = EvaluationResponse.model_validate_json(raw_text)
        print("Parsed JSON Directly", flush=True)
        return final_response
    except:
        print("Trying to extract JSON fallback...", flush=True)
        match = re.search(r'{.*}', raw_text, re.DOTALL)
        if match:
            try:
                extracted = json.loads(match.group())
                final_response = EvaluationResponse.model_validate(extracted)
                print("Extracted JSON Response", flush=True)
                return final_response
            except Exception as inner_e:
                print("Failed to parse extracted JSON", inner_e, flush=True)
        else:
            print("No JSON block found in response", flush=True)

    return {"error": "All rubric-based providers failed."}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
