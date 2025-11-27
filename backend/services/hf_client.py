import requests
import time
import os

class HFClient:
    def __init__(self):
        self.token = os.getenv("HF_TOKEN")
        self.models = {
            "fr-en": "Helsinki-NLP/opus-mt-fr-en",
            "en-fr": "Helsinki-NLP/opus-mt-en-fr"
        }

    def translate(self, text: str, direction: str = "fr-en") -> dict:
        if direction not in self.models:
            raise ValueError("Invalid translation direction. Use 'fr-en' or 'en-fr'.")
        
        model_id = self.models[direction]
        
        # Determine API URL from env or default
        if direction == "en-fr":
            api_url = os.getenv("MODEL_URL_EN_FR")
        else:
            api_url = os.getenv("MODEL_URL_FR_EN")

        # Fallback to default construction if env var is missing or empty
        if not api_url:
            api_url = f"https://api-inference.huggingface.co/models/{model_id}"
            
        headers = {"Authorization": f"Bearer {self.token}"}
        
        start_time = time.time()
        try:
            response = requests.post(api_url, headers=headers, json={"inputs": text}, timeout=10)
            response.raise_for_status()
            result = response.json()
            
            # Hugging Face API returns a list of dicts, e.g. [{'translation_text': '...'}]
            translated_text = result[0]['translation_text'] if isinstance(result, list) and len(result) > 0 else ""
            
            processing_time = time.time() - start_time
            
            return {
                "translated_text": translated_text,
                "model_used": model_id,
                "processing_time": round(processing_time, 4)
            }
        except requests.exceptions.RequestException as e:
            # Handle API errors (timeout, 503, etc.)
            print(f"Error calling Hugging Face API: {e}")
            return {
                "error": str(e),
                "model_used": model_id,
                "processing_time": round(time.time() - start_time, 4)
            }
