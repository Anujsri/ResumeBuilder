var addcertificate = document.getElementById('add-certificate');
addcertificate.addEventListener('submit', addCertificate);
user_id = document.getElementById('user_id').value;

function addCertificate(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('addCertificate');


    certificate_name = document.getElementById('certificate_name').value;
    start_date = document.getElementById('certificate_start_date').value;
    end_date = document.getElementById('certificate_end_date').value;
    institute_name = document.getElementById('certificate_institute_name').value;
    // location = document.getElementById('education_location').value;
    description = document.getElementById('certificate_description').value;

    axios.post('/profile/certificate/' + user_id, {
        certificate_name: certificate_name,
        start_date: start_date,
        end_date: end_date,
        location: "Jabalpur",
        description: description,
        institute_name: institute_name,
    }).then((response) => {
        console.log(response.data);
        getCertificate();
        alertMessage(response.data.message, 'success')
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message, 'warning')
    });

    document.getElementById('certificate_name').value = '';
    document.getElementById('certificate_start_date').value = '';
    document.getElementById('certificate_end_date').value = '';
    document.getElementById('certificate_institute_name').value = '';
    // document.getElementById('education_location').value = '';
    document.getElementById('certificate_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

getCertificate()

function getCertificate() {
    console.log("User_id : " + user_id)
    axios.get('/profile/certificate/' + user_id).then(function(response) {
        var codeBlock = '';
        for (let i = 0; i < response.data.data.length; i++) {

            let start_date = new Date(response.data.data[i].start_date);
            let end_date = new Date(response.data.data[i].end_date);
            codeBlock += '<div class="row">' +
                '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
                '<i class="fa fa-circle" aria-hidden="true"></i> ' + response.data.data[i].certificate_name +
                '<div class="modal-body">' +
                '<p><i class="fa fa-building" aria-hidden="true"></i> ' +
                response.data.data[i].institute_name + ' <i class="fa fa-building" aria-hidden="true"></i> ' +
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
                '</div> '
        }
        document.getElementById("certification_block").innerHTML = codeBlock;
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