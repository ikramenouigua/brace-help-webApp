from django.shortcuts import render
#import joblib
#from requests import request

def hello(context):
    return render(context, 'index.html')

def result(context):
    print("sdmlkfjsmldkjf")