from flask import Flask, request
import requests
import json
import openai
#import config

dept_definition_dict={'Anesthesiology': "Anesthesiology is a medical specialty that helps people stay comfortable and safe during surgery. It uses medicines to make sure people don't feel pain or remember the surgery. Anesthesiologists are doctors who specialize in this field.", 'Cardiology': 'Cardiology is a branch of medicine that deals with the heart and how it works. It looks at how to keep the heart healthy and how to treat any problems with it. Cardiologists are doctors who specialize in this area.', 'Dermatology': 'Dermatology is the study of skin, hair, and nails. It helps doctors diagnose and treat diseases that affect these parts of the body. Dermatologists can also help people with skin problems like acne or rashes.', 'Endocrinology': 'Endocrinology is the study of hormones and how they affect the body. Hormones are chemicals that help control how different parts of the body work. Endocrinologists are doctors who specialize in understanding and treating problems with hormones.', 'Gastroenterology': 'Gastroenterology is a medical field that studies the digestive system. It looks at how food moves through the body and how it is digested. It also looks at diseases and problems related to the digestive system.', 'Hematology': 'Hematology is the study of blood and the diseases related to it. It looks at how blood works in the body and how it can be affected by different illnesses. Doctors who specialize in hematology are called hematologists.', 'Infectious disease': 'Infectious diseases are illnesses caused by germs like bacteria and viruses. These germs can spread from person to person or from animals to people. They can make you feel sick and sometimes even cause death.', 'Internal medicine': 'Internal medicine is a type of doctor that helps people stay healthy. They diagnose and treat illnesses, and help people manage chronic conditions. They also give advice on how to stay healthy and prevent diseases.', 'Nephrology': 'Nephrology is a branch of medicine that focuses on the kidneys. It helps people with diseases and problems related to the kidneys, like kidney stones or kidney failure. Doctors who specialize in nephrology are called nephrologists.', 'Neurology': 'Neurology is a branch of medicine that studies the brain and nervous system. It helps doctors understand how the brain works and how to treat diseases that affect it. Neurologists are doctors who specialize in this field.', 'Obstetrics': 'Obstetrics is a medical specialty that focuses on the care of pregnant women and their babies. It includes taking care of the mother before, during, and after pregnancy. It also includes helping to deliver the baby safely.', 'Gynecology': "Gynecology is a branch of medicine that focuses on the health of women's reproductive systems. It includes things like checking for diseases, giving advice about contraception, and helping women have healthy pregnancies. Gynecologists help women stay healthy and take care of their bodies.", 'Oncology': 'Oncology is the study of cancer. It looks at how cancer starts, how it grows and spreads, and how to treat it. Oncologists are doctors who specialize in treating cancer.', 'Ophthalmology': 'Ophthalmology is a medical specialty that focuses on the eyes. It involves diagnosing and treating eye diseases, injuries, and other conditions. Ophthalmologists are doctors who specialize in eye care.', 'Orthopedics': 'Orthopedics is a medical specialty that focuses on the bones, joints, muscles, and ligaments in your body. It helps to diagnose and treat problems with these parts of your body. Orthopedic doctors can help you move better and stay healthy.', 'Otolaryngology': 'Otolaryngology is a medical specialty that focuses on the ears, nose, and throat. It helps people with problems in these areas, like hearing loss or a sore throat. Doctors who specialize in otolaryngology are called ENTs.', 'Pathology': "Pathology is the study of diseases. It looks at how diseases affect the body and how to diagnose and treat them. Pathologists use tests to find out what is causing a person's illness.", 'Pediatrics': 'Pediatrics is a type of medicine that focuses on taking care of children. Doctors who specialize in pediatrics help kids stay healthy and treat any illnesses or injuries they may have. They also provide advice to parents about how to keep their children healthy.', 'Physical medicine and rehabilitation': 'Physical medicine and rehabilitation is a type of medical care that helps people with injuries or illnesses to get better. It uses different treatments like exercise, medicines, and special equipment to help people recover. It helps people get back to doing the things they love.', 'Plastic surgery': 'Plastic surgery is a type of medical procedure that changes the way a person looks. It can involve changing the shape of body parts, like noses or ears, or fixing scars or marks on the skin. It can also be used to help people who have been hurt in accidents.', 'Psychiatry': 'Psychiatry is a type of medicine that helps people with mental health problems. It uses talking and medicines to help people feel better and understand their thoughts and feelings. Psychiatrists are doctors who specialize in this type of medicine.', 'Radiology': 'Radiology is a type of medical science that uses special machines to take pictures of the inside of your body. These pictures help doctors to diagnose and treat illnesses. Radiologists are doctors who specialize in using these machines.', 'Rheumatology': 'Rheumatology is a medical specialty that focuses on diagnosing and treating diseases of the joints, muscles, and bones. It helps people with arthritis, lupus, and other conditions that cause pain and swelling. Rheumatologists are doctors who specialize in this area.', 'Surgery': 'Surgery is a medical procedure where doctors use special tools to fix or remove parts of the body. It can be used to treat illnesses, injuries, or to improve how a person looks. Surgery is done in a hospital or clinic by specially trained doctors.', 'Urology': 'Urology is a medical specialty that focuses on the urinary system and male reproductive organs. It helps diagnose and treat problems with the bladder, kidneys, prostate, and other parts of the body. Urologists help people stay healthy by preventing and treating diseases.'}

app = Flask(__name__)

openai.api_key = "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"

@app.route('/yelp-doctors')
def test():
    searchTerm = request.args.get("searchTerm")
    location = request.args.get("location")
    url = "https://api.yelp.com/v3/businesses/search?term={}&location={}".format(searchTerm, location)
    params = {}
    headers = {
        'Authorization': 'Bearer {}'.format("7-ZL3Ahz1NT54QYBs-ttyU8vw3zJ83k8JeNxQDI_2xNG1D3CoczNnlIAeRUoKdJ_bPi55Awa_F-LkQs5xoSLQuSIn-hhmPB6_ryqgPLHGdM4V0kzwv-ny0FJLzDxY3Yx")
    }
    response = requests.get(url, headers=headers, params=params)
    print(response.text)
    return response.json()

def get_dept_name(symptoms):
    #symptoms="pain in the big toe"
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"ONLY give a list of departments of medicine/ types of doctor for the following: A patient has the following symptoms:{symptoms}. Only answer in a maximum of 10 words. Give your answer as a comma separated list",
    temperature=0,
    max_tokens=60,
    top_p=1,
    frequency_penalty=0.5,
    presence_penalty=0
    )
    dept_str_ret=response["choices"][0]["text"]
    return dept_str_ret

def get_dept_list(symptoms):
    dept_str=get_dept_name(symptoms)[2:]
    dept_list=[]
    s=''
    for i in range(len(dept_str)):
        ch=dept_str[i]
        if ch==',':
            dept_list.append(s)
            s=''
        elif ch==' ':
            continue
        else:
            s+=ch
    dept_list.append(s)
    return dept_list

def get_def_dict(symptoms):
    dept_list=get_dept_list(symptoms)
    dept_def_dict=dept_definition_dict
    dept_def_ret={}
    for dept in dept_list:
        if dept in dept_def_dict:
            definition=dept_def_dict[dept]
        else:
            definition_response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"give me a simple definition of {dept} in no more than 3 sentences so that even a 10 year old can understand it",
            temperature=0,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0.5,
            presence_penalty=0
            )
            definition=definition_response['choices'][0]['text'][2:]
        #try/except?
        dept_def_ret[dept]=definition
    return dept_def_ret

def get_questions(symptoms):
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"give a list of 3 questions for the patient to ask the doctor, very specific to their symptoms to ask the doctor when the patient goes to meet the doctor. Only give a list of questions. Do not number the list, and separate the questions using underscores, remove any new line(\n) tabs. The symptoms of the patient are as follows: {symptoms}. Do not let any incomplete sentences through",
    temperature=0,
    max_tokens=60,
    top_p=1,
    frequency_penalty=0.5,
    presence_penalty=0
    )
    questions_str=response["choices"][0]["text"][2:]
    ques_list=[]
    q=""
    for ch in questions_str:
        if ch=='_':
            ques_list.append(q)
            q=""
            continue
        else:
            q+=ch
    ques_list.append(q)
    return(ques_list)

@app.route('/departments')
def departments():
    symptoms_broken_str=request.args.get("symptoms")
    symptoms=""
    for ch in symptoms_broken_str:
        if ch=='_':
            symptoms+=' '
        else:
            symptoms+=ch

    dept_list=get_dept_list(symptoms)
    print(dept_list)
    dept_def_return=get_def_dict(symptoms)
    questions=get_questions(symptoms)
    return json.dumps({
        'departments':dept_list,
        'definitions':dept_def_return,
        'questions': questions
    }
)