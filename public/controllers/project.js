var eid;

//function to open modal when add more project is clicked
function addMoreProject(experience_id) {
    eid = experience_id;
    $('#addProject').modal('show');
}

//function to add Projects
var addproject = document.getElementById('add-project');
addproject.addEventListener('submit', addProjects);
projectarr = [];

function addProjects(e) {

    // Prevent actual submit
    e.preventDefault();
    let project_name = document.getElementById('project_name').value;
    let skills = document.getElementById('skills').value;
    let app_link = document.getElementById('app_link').value;
    let project_start_date = document.getElementById('project_start_date').value;
    let project_end_date = document.getElementById('project_end_date').value;
    let project_description = document.getElementById('project_description').value;

    if (new Date(project_start_date) == "Invalid Date" || new Date(project_end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        obj = {}
        obj['project_name'] = project_name;
        obj['start_date'] = new Date(project_start_date);
        obj['end_date'] = new Date(project_end_date);
        obj['skills'] = skills;
        obj['app_link'] = app_link;
        obj['description'] = project_description;

        if (eid) {
            let experience_obj = {
                projects: obj
            }
            axios.put('/experience/experience/' + eid, experience_obj)
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
        } else {

            projectarr.push(obj)
            var codeBlock = '';
            for (let i = 0; i < projectarr.length; i++) {
                codeBlock += '<div class="col-md-3 col-sm-3 col-xs-6" id="enteredproject'+i+'"><div class="thumbnail cardshadow" style="padding : 20px">' +
                    '<h5>' + projectarr[i].project_name + '</h5>' +
                    '<p>' + projectarr[i].skills + ' | ' + projectarr[i].app_link + '</p>' +
                    '<p>' + projectarr[i].description + '</p>' +
                    '<div class="caption">' +
                    '<p><a href="#" class="btn btn-primary" role="button" >'+
                    '<i class="glyphicon glyphicon-pencil"></i> Edit</a> ' +
                    ' <a href="#" class="btn btn-danger" role="button" onclick="removeThisProject('+i+')">' +
                    '<i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></p>' +
                    '</div></div></div>'
            }
            if (document.getElementById("eaddedprojects")) {
                document.getElementById("eaddedprojects").innerHTML = codeBlock;
            }
            if (document.getElementById("addedprojects")) {
                document.getElementById("addedprojects").innerHTML = codeBlock;
            }
        }

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

//function to remove all project when we cancel the edit or add project modal
function removeProject() {
    projectarr = []
    if (document.getElementById("eaddedprojects")) {
        document.getElementById("eaddedprojects").innerHTML = '';
    }
    if (document.getElementById("addedprojects")) {
        document.getElementById("addedprojects").innerHTML = '';
    }
}

function removeThisProject(index) {
    projectarr.splice(index, 1);
    $('#enteredproject' + index).remove()
}



//function to fill the existing valus of fields when edit project window pop up
var projectId;

function fillEditProject(project_name, skills, description, project_id, start_date, end_date, app_link, experience_id) {
    let edit_project_name = document.getElementById('eproject_name');
    let edit_skills = document.getElementById('eskills');
    let edit_app_link = document.getElementById('eapp_link');
    let project_start_date = document.getElementById('eproject_start_date');
    let project_end_date = document.getElementById('eproject_end_date');
    let project_description = document.getElementById('eproject_description');

    projectId = project_id;
    let d1 = new Date(start_date);
    let d2 = new Date(end_date);

    function pad(s) { return (s < 10) ? '0' + s : s; }
    let dd_mm_yyyy1 = [pad(d1.getMonth() + 1), pad(d1.getDate()), d1.getFullYear()].join('/');
    let dd_mm_yyyy2 = [pad(d2.getMonth() + 1), pad(d2.getDate()), d2.getFullYear()].join('/');

    edit_project_name.value = project_name;
    edit_skills.value = skills;
    edit_app_link.value = app_link;
    project_start_date.value = dd_mm_yyyy1;
    project_end_date.value = dd_mm_yyyy2;
    project_description.value = description;
    experienceId = experience_id;
    $('#EditProject').modal('show');
}


//function to Edit the project
var editproject = document.getElementById('edit-project');
editproject.addEventListener('submit', editProject);

function editProject(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('EditProject');

    let edit_project_name = document.getElementById('eproject_name').value;
    let edit_skills = document.getElementById('eskills').value;
    let edit_app_link = document.getElementById('eapp_link').value;
    let project_start_date = new Date(document.getElementById('eproject_start_date').value);
    let project_end_date = new Date(document.getElementById('eproject_end_date').value);
    let project_description = document.getElementById('eproject_description').value;

    if (new Date(project_start_date) == "Invalid Date" || new Date(project_end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        var project_obj = {
            project_name: edit_project_name,
            skills: edit_skills,
            app_link: edit_app_link,
            start_date: project_start_date,
            end_date: project_end_date,
            description: project_description,
            projectId: projectId
        }

        axios.put('/experience/editproject/' + experienceId, project_obj)
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
    }


    document.getElementById('eproject_name').value = '';
    document.getElementById('eskills').value = '';
    document.getElementById('eapp_link').value = '';
    document.getElementById('eproject_start_date').value = '';
    document.getElementById('eproject_end_date').value = '';
    document.getElementById('eproject_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}