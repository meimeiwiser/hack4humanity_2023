#Testing open AI API functionality and working w data

import os
import openai
import config
import department_def

openai.api_key = config.api_key
symptoms="pain in eye" #sample to make sure this runs 
'''
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

def get_def_dict():
    dept_list=get_dept_list(symptoms)
    dept_def_dict=department_def.dept_definition_dict
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

'''
symptoms= "pain in the left chest"
def get_questions(symptoms):
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt=f"give a list of 3 questions for the patient to ask the doctor, very specific to their symptoms to ask the doctor when the patient goes to meet the doctor. Only give a list of questions. Do not number the list, and separate the questions using underscores, remove any new line(\n) tabs. My symptoms are as follows: {symptoms}. Do not let any incomplete sentences through",
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


    
get_questions(symptoms)





