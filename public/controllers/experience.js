user_id = document.getElementById('user_id').value;


//function to add experience
var addexperience = document.getElementById('add-experience');
addexperience.addEventListener('submit', addExperiences);
function addExperiences(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('addExperience');

    let job_title = document.getElementById('job_title').value;
    let company_name = document.getElementById('company_name').value;
    let start_date = new Date(document.getElementById('experience_start_date').value);
    let end_date = new Date(document.getElementById('experience_end_date').value);
    let experience_location = document.getElementById('experience_location').value;
    let description = document.getElementById('experience_description').value;

    if (new Date(start_date) == "Invalid Date" || new Date(end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.post('/experience/experience/' + user_id, {
            job_title: job_title,
            company_name: company_name,
            start_date: start_date,
            end_date: end_date,
            location: experience_location,
            description: description,
            projects: projectarr,
        }).then(function(response) {
            $("#experience_block").load(window.location.href + " #experience_block");
            alertMessage(response.data.message, 'success');
        }).catch(error => {
            console.log(error.response);
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });
    }
    projectarr = [];
    document.getElementById('job_title').value = '';
    document.getElementById('company_name').value = '';
    document.getElementById('experience_start_date').value = '';
    document.getElementById('experience_end_date').value = '';
    document.getElementById('experience_location').value = '';
    document.getElementById('project_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

var experienceId;


//function to fill the existing valus of fields when edit experience window pop up
function fillEditExperience(company_name, location, job_title, description, experience_id, start_date, end_date,experience_location) {
    let edit_job_title = document.getElementById('ejob_title');
    let edit_company_name = document.getElementById('ecompany_name');
    let edit_start_date = document.getElementById('eexperience_start_date');
    let edit_end_date = document.getElementById('eexperience_end_date');
    let eexperience_location = document.getElementById('eexperience_location');
    let edit_description = document.getElementById('eexperience_description');

    let d1 = new Date(start_date);
    let d2 = new Date(end_date);

    function pad(s) { return (s < 10) ? '0' + s : s; }
    let dd_mm_yyyy1 = [pad(d1.getMonth() + 1), pad(d1.getDate()), d1.getFullYear()].join('/');
    let dd_mm_yyyy2 = [pad(d2.getMonth() + 1), pad(d2.getDate()), d2.getFullYear()].join('/');

    edit_job_title.value = job_title;
    edit_company_name.value = company_name;
    edit_description.value = description;
    edit_start_date.value = dd_mm_yyyy1;
    edit_end_date.value = dd_mm_yyyy2;
    experienceId = experience_id;
    eexperience_location = experience_location;

    $('#editExperience').modal('show');
}


//function to Edit the experience
var editexperience = document.getElementById('edit-experience');
editexperience.addEventListener('submit', editExperience);
function editExperience(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('editExperience');

    let job_title = document.getElementById('ejob_title').value;
    let company_name = document.getElementById('ecompany_name').value;
    let start_date = document.getElementById('eexperience_start_date').value;
    let end_date = document.getElementById('eexperience_end_date').value;
    let eexperience_location = document.getElementById('eexperience_location').value;
    let description = document.getElementById('eexperience_description').value;

    var experience_obj = {
        job_title: job_title,
        company_name: company_name,
        start_date: start_date,
        end_date: end_date,
        location: eexperience_location,
        description: description
    }

    if (projectarr.length > 0) {
        experience_obj['projects'] = projectarr;
    }
    if (new Date(start_date) == "Invalid Date" || new Date(end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.put('/experience/experience/' + experienceId, experience_obj)
            .then(function(response) {
                console.log(response.data);
                $("#experience_block").load(window.location.href + " #experience_block");
                alertMessage(response.data.message, 'success');
            }).catch(error => {
                console.log(error.response);
                if (typeof error.response !== "undefined") {
                    alertMessage(error.response.data.message, 'warning')
                }
            });
        document.getElementById('ejob_title').value = '';
        document.getElementById('ecompany_name').value = '';
        document.getElementById('experience_start_date').value = '';
        document.getElementById('eexperience_end_date').value = '';
        document.getElementById('eexperience_location').value = '';
        document.getElementById('eexperience_description').value = '';
        modal.click(function() {
            modal.modal('hide');
        });
    }
}
