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
        alertMessage(response.data.message,'success');
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message,'warning')
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

function alertMessage(title,icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}