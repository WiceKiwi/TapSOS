from TapSOS.models.User import User

class UserService:
    @staticmethod
    def get_user_by_id(user_id):
        return User.objects.get(id=user_id)

    @staticmethod
    def create_user(name, age, gender, dob, address, blood_type, emergency_contact_number, emergency_contact_name):
        user = User(
            name=name,
            age=age,
            gender=gender,
            dob=dob,
            address=address,
            blood_type=blood_type,
            emergency_contact_number=emergency_contact_number,
            emergency_contact_name=emergency_contact_name
        )
        user.save()
        return user
