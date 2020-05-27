from django.http import HttpResponseRedirect
from django.shortcuts import render

from django.views.decorators.csrf import csrf_protect
from .forms import UserCreationForm
from django.template import RequestContext

# Create your views here.
def submitData(request):
    print("adasdadad")
    return render(request, 'index.html', {})

def inputPage(request):
    form = UserCreationForm()
    return render(request, 'input.html', {'form': form})

def openIndex(request):
    return render(request, 'index.html', {})

@csrf_protect
def submitInput(request):
    final_array = request.POST.get('final_array')
    print(final_array)
    #TODO CALL ALGORITHM
    return render(request, 'index.html', {})

# TODO: Stay on same page when form submits
def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = UserCreationForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            name = form.cleaned_data['your_name']
            print(name)
            return HttpResponseRedirect('/thanks/')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = UserCreationForm()

    return render(request, 'name.html', {'form': form})




