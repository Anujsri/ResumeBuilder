const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

var addproject = document.getElementById('add-project');
addproject.addEventListener('submit', addProjects);
projectarr = [];
// addedprojects 
function addProjects(e) {
    // Prevent actual submit
    e.preventDefault();
    project_name = document.getElementById('project_name').value;
    skills = document.getElementById('skills').value;
    app_link = document.getElementById('app_link').value;
    project_start_date = document.getElementById('project_start_date').value;
    project_end_date = document.getElementById('project_end_date').value;
    project_description = document.getElementById('project_description').value;
    obj = {}
    obj['project_name'] = project_name;
    obj['start_date'] = project_start_date;
    obj['end_date'] = project_end_date;
    obj['skills'] = skills;
    obj['app_link'] = app_link;
    obj['description'] = project_description;
    projectarr.push(obj)
    var codeBlock = '';
    for (var i = 0; i < projectarr.length; i++) {
        codeBlock += '<div class="col-md-3 col-sm-3 col-xs-6"><div class="thumbnail cardshadow" style="padding : 20px">' +
            '<h5>' + projectarr[i].project_name + '</h5>' +
            '<p>' + projectarr[i].skills + ' | ' + projectarr[i].app_link + '</p>' +
            '<p>' + projectarr[i].description + '</p>' +
            '<div class="caption">' +
            '<p><a href="#" class="btn btn-primary" role="button"><i class="glyphicon glyphicon-pencil"></i> Edit</a> ' +
            ' <a href="#" class="btn btn-danger" role="button"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></p>' +
            '</div></div></div>'
    }
    if(document.getElementById("eaddedprojects")){
        document.getElementById("eaddedprojects").innerHTML = codeBlock;
    }
    if(document.getElementById("addedprojects")){
        document.getElementById("addedprojects").innerHTML = codeBlock;
    }

    document.getElementById('project_name').value = '';
    document.getElementById('skills').value = '';
    document.getElementById('app_link').value = '';
    document.getElementById('project_start_date').value = '';
    document.getElementById('project_end_date').value = '';
    document.getElementById('project_description').value = '';

    var modal = document.getElementById('addProject');
    modal.click(function() {
        modal.modal('hide');
    });
}

//remove project
function removeProject(){
    projectarr = []
    if(document.getElementById("eaddedprojects")){
        document.getElementById("eaddedprojects").innerHTML = '';
    }
    if(document.getElementById("addedprojects")){
        document.getElementById("addedprojects").innerHTML = '';
    }
}
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

    axios.post('/experience/experience/' + user_id, {
        job_title: job_title,
        company_name: company_name,
        start_date: start_date,
        end_date: end_date,
        location: "kanpur",
        description: description,
        projects: projectarr,
    }).then(function(response) {
        console.log(response.data);
        getExperience();
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

var experienceId;

function fillEditExperience(company_name, location, job_title, description, experience_id,start_date,end_date) {
    edit_job_title = document.getElementById('ejob_title');
    edit_company_name = document.getElementById('ecompany_name');
    edit_start_date = document.getElementById('eexperience_start_date');
    edit_end_date = document.getElementById('eexperience_end_date');
    // edit_location = document.getElementById('eexperience_location').value;
    edit_description = document.getElementById('eexperience_description');

    let d1 = new Date(start_date);
    var dd_mm_yyyy1 = d1.toLocaleDateString();
    let d2 = new Date(end_date);
    var dd_mm_yyyy2 = d2.toLocaleDateString();

    edit_job_title.value = job_title;
    edit_company_name.value = company_name;
    edit_description.value = description;
    edit_start_date.value = dd_mm_yyyy1;
    edit_end_date.value = dd_mm_yyyy2;

    experienceId = experience_id;
    $('#editExperience').modal('show');
}

var editexperience = document.getElementById('edit-experience');
editexperience.addEventListener('submit', editExperience);

function editExperience(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('editExperience');

    job_title = document.getElementById('ejob_title').value;
    company_name = document.getElementById('ecompany_name').value;
    start_date = document.getElementById('eexperience_start_date').value;
    end_date = document.getElementById('eexperience_end_date').value;
    // location = document.getElementById('eexperience_location').value;
    description = document.getElementById('eexperience_description').value;

    var experience_obj = {
        job_title: job_title,
        company_name: company_name,
        start_date: start_date,
        end_date: end_date,
        location: "kanpur",
        description: description
    }

    if (projectarr.length > 0) {
        experience_obj['projects'] = projectarr;
    }

    axios.put('/experience/experience/' + experienceId, experience_obj)
        .then(function(response) {
            console.log(response.data);
            $("#certification_block").load(window.location.href + "#certification_block");
            alertMessage(response.data.message, 'success');
        }).catch(error => {
            console.log(error.response);
            alertMessage(error.response.data.message, 'warning')
        });
    document.getElementById('ejob_title').value = '';
    document.getElementById('ecompany_name').value = '';
    document.getElementById('experience_start_date').value = '';
    document.getElementById('eexperience_end_date').value = '';
    // document.getElementById('eexperience_location').value = '';
    document.getElementById('eexperience_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

// getExperience()

// function getExperience() {
//     console.log("User_id : " + user_id)
//     axios.get('/experience/experience/' + user_id).then(function(response) {
//         var codeBlock = '';
//         for (let i = 0; i < response.data.data.length; i++) {
//             var codeBlock1 = '';

//             let start_date = new Date(response.data.data[i].start_date);
//             let end_date = new Date(response.data.data[i].end_date);

//             for (let j = 0; j < response.data.data[i].projects.length; j++) {
//                 let project_start_date = new Date(response.data.data[i].projects[j].start_date);
//                 let project_end_date = new Date(response.data.data[i].projects[j].end_date);

//                 codeBlock1 += '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
//                     '<i class="fa fa-circle" aria-hidden="true"></i> ' + response.data.data[i].projects[j].project_name +
//                     '<div class="modal-body">' +
//                     '<p>' + response.data.data[i].projects[j].skills + '</p>' +
//                     '<small>' + response.data.data[i].projects[j].description + '</small>' +
//                     '</div>' +
//                     '</div>' +
//                     '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
//                     '<div class="pull-right">' +
//                     '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
//                     monthNames[project_start_date.getMonth()] + ' ' + project_start_date.getFullYear() + ' - ' +
//                     monthNames[project_end_date.getMonth()] + ' ' + project_end_date.getFullYear() +
//                     ' <a href="#" type="button" data-toggle="modal" data-target="#editOverview"><i class="glyphicon glyphicon-pencil"></i></a>' +
//                     '</div>' +
//                     '</div>'

//             }
//             codeBlock += '<div class="row">' +
//                 '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
//                 '<i class="fa fa-circle" aria-hidden="true"></i> ' +'<b style="color:#7f03fc">' +response.data.data[i].job_title+'</b>' +
//                 '<div class="modal-body">' +
//                 '<p><i class="fa fa-building" aria-hidden="true"></i> ' +
//                 response.data.data[i].company_name + ' <i class="fa fa-building" aria-hidden="true"></i> ' +
//                 response.data.data[i].location + ' </p>' +
//                 '<small>' + response.data.data[i].description + '</small>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
//                 '<div class="pull-right">' +
//                 '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
//                 monthNames[start_date.getMonth()] + ' ' + start_date.getFullYear() + ' - ' +
//                 monthNames[end_date.getMonth()] + ' ' + end_date.getFullYear() +
//                 ' <a href="#" type="button" data-toggle="modal" data-target="#addExperience")>' +
//                 '<i class="glyphicon glyphicon-pencil"></i></a>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div> ' +
//                 '<div class="modal-body">' +
//                 '<h5>' + 'Projects' +
//                 '<span class="pull-right">' +
//                 '<a href="#" type="button" onclick="addAddress()"><i class="glyphicon glyphicon-plus"></i> Add more projects</a>' +
//                 '</span>' +
//                 '</h5>' +
//                 '<div class="row">' + codeBlock1 + '</div>' +
//                 '</div>'
//         }
//         document.getElementById("experience_block").innerHTML = codeBlock;
//     }).catch(error => {
//         console.log(error);
//     });
// }


function alertMessage(title, icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}