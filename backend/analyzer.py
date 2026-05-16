from groq import Groq
import base64
import json
import os

from datetime import datetime

# =========================================
# GROQ CLIENT
# =========================================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================================
# SYSTEM PROMPT
# =========================================

ANALYSIS_SYSTEM_PROMPT = """
You are an advanced recycling facility AI analyst.

Your task is to carefully analyze recycling bottle images.

IMPORTANT RULES:
- Count EVERY visible bottle carefully.
- Pay attention to partially visible bottles.
- Do not ignore transparent bottles.
- Use careful visual estimation.
- Prioritize accurate bottle counting.

VERY IMPORTANT:
- Return ONLY valid JSON.
- Do not return explanations.
- Do not return markdown.
- Do not wrap JSON in triple backticks.
- Response must start with {
- Response must end with }

Return this exact JSON structure:

{
  "bottle_count": 0,

  "pet_percentage": 0,

  "non_pet_percentage": 0,

  "color_distribution": {
    "clear": 0,
    "green": 0,
    "blue": 0,
    "brown_amber": 0,
    "other": 0
  },

  "quality_score": 0,

  "contamination_risk": "low",

  "contamination_details": "",

  "confidence_score": 0,

  "human_review_flag": false,

  "human_review_reason": "",

  "batch_grade": "A",

  "estimated_value_per_kg": 0,

  "estimated_value_range": {
    "low": 0,
    "high": 0
  },

  "key_observations": [],

  "processing_recommendation": ""
}
"""

# =========================================
# ENCODE IMAGE
# =========================================

def encode_image(image_path):

    with open(image_path, "rb") as f:

        return base64.b64encode(
            f.read()
        ).decode("utf-8")

# =========================================
# ANALYZE IMAGE
# =========================================

def analyze_image(
    image_path,
    batch_id=None
):

    # GENERATE BATCH ID

    if batch_id is None:

        batch_id = (
            f"BATCH-"
            f"{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        )

    # CONVERT IMAGE

    image_base64 = encode_image(
        image_path
    )

    # CALL GROQ API

    completion = client.chat.completions.create(

        model=
        "meta-llama/llama-4-scout-17b-16e-instruct",

        messages=[

            {
                "role": "system",

                "content":
                ANALYSIS_SYSTEM_PROMPT,
            },

            {
                "role": "user",

                "content": [

                    {
                        "type": "text",

                        "text":
                        """
Carefully analyze this recycling bottle image.

Count every visible bottle precisely.

Estimate:
- bottle count
- PET composition
- contamination
- quality
- recycling value
"""
                    },

                    {
                        "type": "image_url",

                        "image_url": {
                            "url":
                            f"data:image/jpeg;base64,{image_base64}"
                        },
                    },
                ],
            },
        ],

        temperature=0.1,
    )

    # RAW RESPONSE

    result = (
        completion
        .choices[0]
        .message.content
    )

    print("\nRAW AI RESPONSE:\n")
    print(result)

    # CLEAN RESPONSE

    result = (
        result
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    # SAFE JSON EXTRACTION

    try:

        json_start = result.find("{")

        json_end = (
            result.rfind("}") + 1
        )

        cleaned_json = result[
            json_start:json_end
        ]

        analysis = json.loads(
            cleaned_json
        )

    except Exception as e:

        print("\nJSON PARSE ERROR\n")
        print(result)

        raise Exception(
            f"Invalid JSON response: {str(e)}"
        )

    # FINAL RESPONSE

    return {

        "batch_id":
        batch_id,

        "analysis_timestamp":
        datetime.now().isoformat(),

        "model_used":
        "llama-4-scout",

        **analysis,
    }

# =========================================
# SAVE REPORT
# =========================================

def save_report(
    result,
    output_path
):

    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    with open(
        output_path,
        "w"
    ) as f:

        json.dump(
            result,
            f,
            indent=2
        )

    return output_path