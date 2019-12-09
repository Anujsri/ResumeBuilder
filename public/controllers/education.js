user_id = document.getElementById('user_id').value;

//function to add Education
var addeducation = document.getElementById('add-education');
addeducation.addEventListener('submit', addEducations);
function addEducations(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('addEducation');

    let degree = document.getElementById('degree').value;
    let start_date = document.getElementById('education_start_date').value;
    let end_date = document.getElementById('education_end_date').value;
    let institute_name = document.getElementById('institute_name').value;
    let education_location = document.getElementById('education_location').value;
    let description = document.getElementById('education_description').value;

    if (new Date(start_date) == "Invalid Date" || new Date(end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.post('/education/education/' + user_id, {
            degree: degree,
            start_date: start_date,
            end_date: end_date,
            location: education_location,
            description: description,
            institute_name: institute_name,
        }).then((response) => {
            console.log(response.data);
            $("#education_block").load(window.location.href + " #education_block");
            alertMessage(response.data.message, 'success');
        }).catch(error => {
            console.log(error.response);
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });
    }

    document.getElementById('degree').value = '';
    document.getElementById('education_start_date').value = '';
    document.getElementById('education_end_date').value = '';
    document.getElementById('institute_name').value = '';
    document.getElementById('education_location').value = '';
    document.getElementById('education_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

var educationId;

//function to fill the existing valus of fields when edit Education window pop up
function fillEditEducation(degree, institute_name, education_id, description, location, start_date, end_date, education_location) {
    let edit_degree = document.getElementById('edegree');
    let edit_start_date = document.getElementById('eeducation_start_date');
    let edit_end_date = document.getElementById('eeducation_end_date');
    let edit_institute_name = document.getElementById('einstitute_name');
    let eeducation_location = document.getElementById('eeducation_location');
    let edit_description = document.getElementById('eeducation_description');


    let d1 = new Date(start_date);
    let d2 = new Date(end_date);

    function pad(s) { return (s < 10) ? '0' + s : s; }
    let dd_mm_yyyy1 = [pad(d1.getMonth() + 1), pad(d1.getDate()), d1.getFullYear()].join('/');
    let dd_mm_yyyy2 = [pad(d2.getMonth() + 1), pad(d2.getDate()), d2.getFullYear()].join('/');

    edit_degree.value = degree;
    edit_institute_name.value = institute_name;
    edit_description.value = description;
    edit_start_date.value = dd_mm_yyyy1;
    edit_end_date.value = dd_mm_yyyy2;
    eeducation_location = education_location;

    educationId = education_id;

    $('#editEducation').modal('show');
}


//function to Edit the education
var editeducation = document.getElementById('edit-education');
editeducation.addEventListener('submit', editEducation);
function editEducation(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('editEducation');

    let degree = document.getElementById('edegree').value;
    let start_date = document.getElementById('eeducation_start_date').value;
    let end_date = document.getElementById('eeducation_end_date').value;
    let institute_name = document.getElementById('einstitute_name').value;
    let eeducation_location = document.getElementById('eeducation_location').value;
    let description = document.getElementById('eeducation_description').value;

    if (new Date(start_date) == "Invalid Date" || new Date(end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.put('/education/education/' + educationId, {
            degree: degree,
            start_date: start_date,
            end_date: end_date,
            location: eeducation_location,
            description: description,
            institute_name: institute_name,
        }).then((response) => {
            console.log(response.data);
            $("#education_block").load(window.location.href + " #education_block");
            alertMessage(response.data.message, 'success');
        }).catch(error => {
            console.log(error.response);
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });
    }

    document.getElementById('edegree').value = '';
    document.getElementById('eeducation_start_date').value = '';
    document.getElementById('eeducation_end_date').value = '';
    document.getElementById('einstitute_name').value = '';
    document.getElementById('eeducation_location').value = '';
    document.getElementById('eeducation_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}
