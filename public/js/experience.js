// add-experience
var addexperience = document.getElementById('add-experience');
addexperience.addEventListener('submit', addExperiences);
user_id = document.getElementById('user_id').value;
console.log("type : "+ typeof user_id)
function addExperiences(e) {
    // Prevent actual submit
    e.preventDefault();
    job_title = document.getElementById('job_title').value;
    company_name = document.getElementById('company_name').value;
    start_date = document.getElementById('experience_start_date').value;
    end_date = document.getElementById('experience_end_date').value;
    // location = document.getElementById('experience_location').value;
    description = document.getElementById('experience_description').value;

    axios.post('/profile/experience/'+user_id, {
        job_title: job_title,
        company_name: company_name,
        start_date: start_date,
        end_date: end_date,
        location: "kanpur",
        description: description,
        projects: projectarr,
    }).then(function(response) {
        console.log(response.data);
        var modal = document.getElementById('addExperience');
        modal.click(function() {
            modal.modal('hide');
        });

        document.getElementById('job_title').value = '';
        document.getElementById('company_name').value = '';
        document.getElementById('experience_start_date').value = '';
        document.getElementById('experience_end_date').value = '';
        // document.getElementById('experience_location').value = '';
        document.getElementById('project_description').value = '';
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your password has been updated',
            showConfirmButton: false,
            timer: 2000
        })
    });
}