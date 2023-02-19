symptoms_broken_str="I_have_a_pain_in_my_stomach"
symptoms=""
for ch in symptoms_broken_str:
        if ch=='_':
            symptoms+=' '
        else:
            symptoms+=ch
print(symptoms)