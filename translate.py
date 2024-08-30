from deep_translator import GoogleTranslator

class TranslationService:
    def __init__(self):
        self.translators = {
            'chinese': GoogleTranslator(source='en', target='zh-CN'),
            'malay': GoogleTranslator(source='en', target='ms'),
            'tamil': GoogleTranslator(source='en', target='ta')
        }

    def translate(self, sentence, target_language):
        # Get the correct translator based on the target language
        translator = self.translators.get(target_language.lower())
        
        if translator:
            translated = translator.translate(sentence)
            return translated
        else:
            raise ValueError(f"Translation for '{target_language}' is not supported.")

if __name__ == "__main__":
    service = TranslationService()

    sentence = "HELP! I NEED HELP! I AM MUTE!"

    try:
        chinese_translation = service.translate(sentence, "chinese")
        print(f"Translated to Chinese: {chinese_translation}")
        
        malay_translation = service.translate(sentence, "malay")
        print(f"Translated to Malay: {malay_translation}")
        
        tamil_translation = service.translate(sentence, "tamil")
        print(f"Translated to Tamil: {tamil_translation}")
        
    except ValueError as e:
        print(e)