// add-experience
var addexperience = document.getElementById('add-experience');
addexperience.addEventListener('submit', addExperiences);
user_id = document.getElementById('user_id').value;

function addExperiences(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('addExperience');

    job_title = document.getElementById('job_title').value;
    company_name = document.getElementById('company_name').value;
    start_date = document.getElementById('experience_start_date').value;
    end_date = document.getElementById('experience_end_date').value;
    // location = document.getElementById('experience_location').value;
    description = document.getElementById('experience_description').value;

    axios.post('/profile/experience/' + user_id, {
        job_title: job_title,
        company_name: company_name,
        start_date: start_date,
        end_date: end_date,
        location: "kanpur",
        description: description,
        projects: projectarr,
    }).then(function(response) {
        console.log(response.data);
        alertMessage(response.data.message, 'success');
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message, 'warning')
    });
    document.getElementById('job_title').value = '';
    document.getElementById('company_name').value = '';
    document.getElementById('experience_start_date').value = '';
    document.getElementById('experience_end_date').value = '';
    // document.getElementById('experience_location').value = '';
    document.getElementById('project_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

function getExperience() {
    console.log("User_id : " + user_id)
    axios.get('/profile/experience/' + user_id).then(function(response) {
        var codeBlock = '';
        console.log(response.data.data.job_title)
        var job_title = response.data.data.job_title;
        codeBlock = '<div class="row">'+
                    '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">'+
                    '<i class="fa fa-circle" aria-hidden="true"></i> '+ job_title +
                    '<div class="modal-body">'+
                    '<p><i class="fa fa-building" aria-hidden="true"></i> '+
                     response.data.data.company_name +' <i class="fa fa-building" aria-hidden="true"></i> '+
                      response.data.data.location +' </p>'+
                    '<small>' + response.data.data.description+'</small>'+
                    '</div>'+
                    '</div>'+
                    '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">'+
                    '<div class="pull-right">'+
                    '<i class="fa fa-calendar" aria-hidden="true"></i> '+
                    'start_date - start_date' +'<a href="#" type="button" data-toggle="modal" data-target="#editOverview">'+
                    '<i class="glyphicon glyphicon-pencil"></i></a>'+
                    '</div>'+
                    '</div>'+
                    '</div> '+
                    '<br>'+
                    '<div class="modal-body">'+
                    '<h4>' +'Projects'+
                    '<span class="pull-right">'+
                    '<a href="#" type="button" onclick="addAddress()"><i class="glyphicon glyphicon-plus"></i> Add more projects</a>'+
                    '</span>'+
                    '</h4>'+
                    '<br>'+
                    '</div>'
        
        document.getElementById("experience_block").innerHTML = codeBlock;
    }).catch(error => {
        console.log(error);
    });
}

getExperience()

function alertMessage(title, icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}