# /utils/llm.py
import httpx
import os
import json

HEADERS = {"Content-Type": "application/json"}

# Try all providers until one works

def call_llm_with_fallback(content: str):
    messages = [{"role": "user", "content": content}]

    providers = [
        {
            "name": "OpenRouter",
            "url": "https://openrouter.ai/api/v1/chat/completions",
            "headers": {
                **HEADERS,
                "Authorization": f"Bearer {os.environ['OPENROUTER_KEY']}"
            },
            "model": "google/gemma-3n-e2b-it:free"
        },
        {
            "name": "Together",
            "url": "https://api.together.xyz/v1/chat/completions",
            "headers": {
                **HEADERS,
                "Authorization": f"Bearer {os.environ['TOGETHER_KEY']}"
            },
            "model": "meta-llama/Meta-Llama-3-70B-Instruct-Turbo"
        }
    ]

    for provider in providers:
        try:
            print(f"Calling provider: {provider['name']}", flush=True)
            response = httpx.post(
                provider['url'],
                headers=provider['headers'],
                json={
                    "model": provider['model'],
                    "messages": messages
                },
                timeout=30
            )
            print(f"{provider['name']} Response Text:", response.text[:300], flush=True)
            data = response.json()
            return data['choices'][0]['message']['content'].strip()
        except Exception as e:
            print(f"{provider['name']} Error:", e, flush=True)
            continue

    return "Could not retrieve any LLM response."