from django.db import models

# Create your models here.

class Task(models.Model):
  age = models.IntegerField(default=0)
  title = models.CharField(max_length=200)
  sex = models.IntegerField(default=0)
  chest_pain_type = models.IntegerField(default=0)
  resting_blood_pressure = models.IntegerField(default=0)
  cholesterol = models.IntegerField(default=0)
  fasting_blood_sugar = models.IntegerField(default=0)
  rest_ecg = models.IntegerField(default=0)
  max_heart_rate_achieve = models.IntegerField(default=0)
  exercise_induced_angina = models.IntegerField(default=0)
  st_depression = models.IntegerField(default=0)
  st_slope = models.IntegerField(default=0)
  num_major_vessels = models.IntegerField(default=0)
  thalassemia = models.IntegerField(default=0)
  predict = models.CharField(max_length=200, null=True)
  completed = models.BooleanField(default=False, blank=True, null=True)

  def __str__(self):
    return self.title