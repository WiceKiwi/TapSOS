from TapSOS.models.EmergencyCard import EmergencyCard

class EmergencyCardService:
    @staticmethod
    def get_emergency_card_by_id(card_id):
        return EmergencyCard.objects.get(id=card_id)

    @staticmethod
    def create_emergency_card(user, title, content, source):
        card = EmergencyCard(
            user=user,
            title=title,
            content=content,
            source=source
        )
        card.save()
        return card
