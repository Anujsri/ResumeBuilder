var addeducation = document.getElementById('add-education');
addeducation.addEventListener('submit', addEducations);
user_id = document.getElementById('user_id').value;

function addEducations(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('addEducation');

    degree = document.getElementById('degree').value;
    start_date = document.getElementById('education_start_date').value;
    end_date = document.getElementById('education_end_date').value;
    institute_name = document.getElementById('institute_name').value;
    // location = document.getElementById('education_location').value;
    description = document.getElementById('education_description').value;

    axios.post('/education/education/' + user_id, {
        degree: degree,
        start_date: start_date,
        end_date: end_date,
        location: "Jabalpur",
        description: description,
        institute_name: institute_name,
    }).then((response) => {
        console.log(response.data);
        getEducation();
        alertMessage(response.data.message, 'success');
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message, 'warning')
    });
    document.getElementById('degree').value = '';
    document.getElementById('education_start_date').value = '';
    document.getElementById('education_end_date').value = '';
    document.getElementById('institute_name').value = '';
    // document.getElementById('education_location').value = '';
    document.getElementById('education_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

var educationId;
function fillEditEducation(degree,institute_name,education_id,description,location,start_date,end_date) {
    edit_degree = document.getElementById('edegree');
    edit_start_date = document.getElementById('eeducation_start_date');
    edit_end_date = document.getElementById('eeducation_end_date');
    edit_institute_name = document.getElementById('einstitute_name');
    // edit_location = document.getElementById('eeducation_location');
    edit_description = document.getElementById('eeducation_description');


    let d1 = new Date(start_date);
    var dd_mm_yyyy1 = d1.toLocaleDateString();
    let d2 = new Date(end_date);
    var dd_mm_yyyy2 = d2.toLocaleDateString();

    edit_degree.value = degree;
    edit_institute_name.value = institute_name;
    edit_description.value = description;
    edit_start_date.value = dd_mm_yyyy1;
    edit_end_date.value = dd_mm_yyyy2;

    educationId = education_id;
    $('#editEducation').modal('show');
}

var editeducation = document.getElementById('edit-education');
editeducation.addEventListener('submit', editEducation);

function editEducation(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('editEducation');

    degree = document.getElementById('edegree').value;
    start_date = document.getElementById('eeducation_start_date').value;
    end_date = document.getElementById('eeducation_end_date').value;
    institute_name = document.getElementById('einstitute_name').value;
    // location = document.getElementById('eeducation_location').value;
    description = document.getElementById('eeducation_description').value;

    axios.put('/education/education/' + educationId, {
        degree: degree,
        start_date: start_date,
        end_date: end_date,
        location: "Jabalpur",
        description: description,
        institute_name: institute_name,
    }).then((response) => {
        console.log(response.data);
        $("#certification_block").load(window.location.href + "#certification_block");
        alertMessage(response.data.message, 'success');
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message, 'warning')
    });
    document.getElementById('edegree').value = '';
    document.getElementById('eeducation_start_date').value = '';
    document.getElementById('eeducation_end_date').value = '';
    document.getElementById('einstitute_name').value = '';
    // document.getElementById('eeducation_location').value = '';
    document.getElementById('eeducation_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}
// getEducation()

// function getEducation() {
//     console.log("User_id : " + user_id)
//     axios.get('/education/education/' + user_id).then(function(response) {
//         var codeBlock = '';
//         for (let i = 0; i < response.data.data.length; i++) {

//             let start_date = new Date(response.data.data[i].start_date);
//             let end_date = new Date(response.data.data[i].end_date);
//             codeBlock += '<div class="row">' +
//                 '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
//                 '<i class="fa fa-circle" aria-hidden="true"></i> ' + response.data.data[i].degree +
//                 '<div class="modal-body">' +
//                 '<p><i class="fa fa-building" aria-hidden="true"></i> ' +
//                 response.data.data[i].institute_name + ' <i class="fa fa-building" aria-hidden="true"></i> ' +
//                 response.data.data[i].location + ' </p>' +
//                 '<small>' + response.data.data[i].description + '</small>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
//                 '<div class="pull-right">' +
//                 '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
//                 monthNames[start_date.getMonth()] + ' ' + start_date.getFullYear() + ' - ' +
//                 monthNames[end_date.getMonth()] + ' ' + end_date.getFullYear() +
//                 ' <a href="#" type="button" data-toggle="modal" data-target="#editOverview">' +
//                 '<i class="glyphicon glyphicon-pencil"></i></a>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div> '
//         }
//         document.getElementById("education_block").innerHTML = codeBlock;
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