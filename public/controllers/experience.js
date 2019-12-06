const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];
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
getExperience()

function getExperience() {
    console.log("User_id : " + user_id)
    axios.get('/profile/experience/' + user_id).then(function(response) {
        var codeBlock = '';
        for (let i = 0; i < response.data.data.length; i++) {
            var codeBlock1 = '';

            let start_date = new Date(response.data.data[i].start_date);
            let end_date = new Date(response.data.data[i].end_date);

            for (let j = 0; j < response.data.data[i].projects.length; j++) {
                let project_start_date = new Date(response.data.data[i].projects[j].start_date);
                let project_end_date = new Date(response.data.data[i].projects[j].end_date);

                codeBlock1 += '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
                    '<i class="fa fa-circle" aria-hidden="true"></i> ' + response.data.data[i].projects[j].project_name +
                    '<div class="modal-body">' +
                    '<p>' + response.data.data[i].projects[j].skills + '</p>' +
                    '<small>' + response.data.data[i].projects[j].description + '</small>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
                    '<div class="pull-right">' +
                    '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
                    monthNames[project_start_date.getMonth()] + ' ' + project_start_date.getFullYear() + ' - ' +
                    monthNames[project_end_date.getMonth()] + ' ' + project_end_date.getFullYear() +
                    ' <a href="#" type="button" data-toggle="modal" data-target="#editOverview"><i class="glyphicon glyphicon-pencil"></i></a>' +
                    '</div>' +
                    '</div>'

            }
            codeBlock += '<div class="row">' +
                '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
                '<i class="fa fa-circle" aria-hidden="true"></i> ' +'<b style="color:#7f03fc">' +response.data.data[i].job_title+'</b>' +
                '<div class="modal-body">' +
                '<p><i class="fa fa-building" aria-hidden="true"></i> ' +
                response.data.data[i].company_name + ' <i class="fa fa-building" aria-hidden="true"></i> ' +
                response.data.data[i].location + ' </p>' +
                '<small>' + response.data.data[i].description + '</small>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
                '<div class="pull-right">' +
                '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
                monthNames[start_date.getMonth()] + ' ' + start_date.getFullYear() + ' - ' +
                monthNames[end_date.getMonth()] + ' ' + end_date.getFullYear() +
                ' <a href="#" type="button" data-toggle="modal" data-target="#editOverview">' +
                '<i class="glyphicon glyphicon-pencil"></i></a>' +
                '</div>' +
                '</div>' +
                '</div> ' +
                '<div class="modal-body">' +
                '<h5>' + 'Projects' +
                '<span class="pull-right">' +
                '<a href="#" type="button" onclick="addAddress()"><i class="glyphicon glyphicon-plus"></i> Add more projects</a>' +
                '</span>' +
                '</h5>' +
                '<div class="row">' + codeBlock1 + '</div>' +
                '</div>'
        }
        document.getElementById("experience_block").innerHTML = codeBlock;
    }).catch(error => {
        console.log(error);
    });
}

function alertMessage(title, icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}