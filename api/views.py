from pyexpat import model
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task
import joblib
from requests import request

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/task-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def taskList(request):
	tasks = Task.objects.all().order_by('-id')
	serializer = TaskSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def taskDetail(request, pk):
	tasks = Task.objects.get(id=pk)
	serializer = TaskSerializer(tasks, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def taskCreate(request):
	model=joblib.load('finalized_model.sav')
	lis=[]
	lis.append(request.data['age'])
	lis.append(request.data['sex'])
	lis.append(request.data['chest_pain_type'])
	lis.append(request.data['resting_blood_pressure'])
	lis.append(request.data['cholesterol'])
	lis.append(request.data['fasting_blood_sugar'])
	lis.append(request.data['rest_ecg'])
	lis.append(request.data['max_heart_rate_achieve'])
	lis.append(request.data['exercise_induced_angina'])
	lis.append(request.data['st_depression'])
	lis.append(request.data['st_slope'])
	lis.append(request.data['num_major_vessels'])
	lis.append(request.data['thalassemia'])
	print(lis)
	ans=model.predict([lis])
	if ans[0]==1:
		request.data['predict'] ="a une maladie cardiaque"
	else:
		request.data['predict'] ="n'a pas une maladie cardiaque"
	
	print(request.data)
    #return render(context, 'result.html',{'ans':ans})
	serializer = TaskSerializer(data=request.data)
      
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request, pk):
	task = Task.objects.get(id=pk)
	serializer = TaskSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(request, pk):
	task = Task.objects.get(id=pk)
	task.delete()

	return Response('Item succsesfully delete!')

@api_view(['POST'])
def Ajouter(request):
	serializer = TaskSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)



