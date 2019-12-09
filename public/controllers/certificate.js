user_id = document.getElementById('user_id').value;

//function to add certificate
var addcertificate = document.getElementById('add-certificate');
addcertificate.addEventListener('submit', addCertificate);
function addCertificate(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('addCertificate');
    let certificate_name = document.getElementById('certificate_name').value;
    let start_date = document.getElementById('certificate_start_date').value;
    let end_date = document.getElementById('certificate_end_date').value;
    let institute_name = document.getElementById('certificate_institute_name').value;
    let certificate_location = document.getElementById('certificate_location').value;
    let description = document.getElementById('certificate_description').value;

    if (new Date(start_date) == "Invalid Date" || new Date(end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.post('/certificate/certificate/' + user_id, {
            certificate_name: certificate_name,
            start_date: start_date,
            end_date: end_date,
            location: certificate_location,
            description: description,
            institute_name: institute_name,
        }).then((response) => {
            console.log(response.data);
            $("#certificate_block").load(window.location.href + " #certificate_block");
            alertMessage(response.data.message, 'success')
        }).catch(error => {
            console.log(error.response);
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });

    }
    document.getElementById('certificate_name').value = '';
    document.getElementById('certificate_start_date').value = '';
    document.getElementById('certificate_end_date').value = '';
    document.getElementById('certificate_institute_name').value = '';
    document.getElementById('certificate_location').value = '';
    document.getElementById('certificate_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

var certificateid;

//function to fill the existing valus of fields when edit certificate window pop up
function fillEditCertificate(institute_name, certificate_name, certificate_id, description, start_date, end_date, certificate_location) {
    let certificate = document.getElementById('ecertificate_name');
    let certificate_start_date = document.getElementById('ecertificate_start_date');
    let certificate_end_date = document.getElementById('ecertificate_end_date');
    let certificate_institute_name = document.getElementById('ecertificate_institute_name');
    let ecertificate_location = document.getElementById('ecertificate_location');
    let certificatedescription = document.getElementById('ecertificate_description');

    let d1 = new Date(start_date);

    function pad(s) { return (s < 10) ? '0' + s : s; }
    let dd_mm_yyyy1 = [pad(d1.getMonth() + 1), pad(d1.getDate()), d1.getFullYear()].join('/');

    let d2 = new Date(end_date);
    var dd_mm_yyyy2 = [pad(d2.getMonth() + 1), pad(d2.getDate()), d2.getFullYear()].join('/');


    certificateid = certificate_id;
    certificate.value = certificate_name;
    certificate_institute_name.value = institute_name;
    certificatedescription.value = description;
    certificate_start_date.value = dd_mm_yyyy1;
    certificate_end_date.value = dd_mm_yyyy2;
    ecertificate_location.value = certificate_location;
    $('#editCertificate').modal('show');
}

//function to Edit the certificate
var editcertificate = document.getElementById('edit-certificate');
editcertificate.addEventListener('submit', editCertificate);
function editCertificate(e) {
    // Prevent actual submit
    e.preventDefault();

    let modal = document.getElementById('editCertificate');
    let certificate_name = document.getElementById('ecertificate_name').value;
    let start_date = document.getElementById('ecertificate_start_date').value;
    let end_date = document.getElementById('ecertificate_end_date').value;
    let institute_name = document.getElementById('ecertificate_institute_name').value;
    let ecertificate_location = document.getElementById('ecertificate_location').value;
    let description = document.getElementById('ecertificate_description').value;

    if (new Date(start_date) == "Invalid Date" || new Date(end_date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.put('/certificate/certificate/' + certificateid, {
            certificate_name: certificate_name,
            start_date: start_date,
            end_date: end_date,
            location: ecertificate_location,
            description: description,
            institute_name: institute_name,
        }).then((response) => {
            console.log(response.data);
            $("#certificate_block").load(window.location.href + " #certificate_block");
            alertMessage(response.data.message, 'success')
        }).catch(error => {
            console.log(error.response);
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });
    }
    document.getElementById('ecertificate_name').value = '';
    document.getElementById('ecertificate_start_date').value = '';
    document.getElementById('ecertificate_end_date').value = '';
    document.getElementById('ecertificate_institute_name').value = '';
    document.getElementById('ecertificate_location').value = '';
    document.getElementById('ecertificate_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}
