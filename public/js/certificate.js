var addcertificate = document.getElementById('add-certificate');
addcertificate.addEventListener('submit', addCertificate);
user_id = document.getElementById('user_id').value;

function addCertificate(e) {
    // Prevent actual submit
    e.preventDefault();
    certificate_name = document.getElementById('certificate_name').value;
    start_date = document.getElementById('certificate_start_date').value;
    end_date = document.getElementById('certificate_end_date').value;
    institute_name = document.getElementById('certificate_institute_name').value;
    // location = document.getElementById('education_location').value;
    description = document.getElementById('certificate_description').value;

    axios.post('/profile/certificate/'+user_id, {
        certificate_name: certificate_name,
        start_date: start_date,
        end_date: end_date,
        location: "Jabalpur",
        description: description,
        institute_name: institute_name,
    }).then(function(response) {
        console.log(response.data);
        var modal = document.getElementById('addCertificate');
        modal.click(function() {
            modal.modal('hide');
        });

        document.getElementById('certificate_name').value = '';
        document.getElementById('certificate_start_date').value = '';
        document.getElementById('certificate_end_date').value = '';
        document.getElementById('certificate_institute_name').value = '';
        // document.getElementById('education_location').value = '';
        document.getElementById('certificate_description').value = '';
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your password has been updated',
            showConfirmButton: false,
            timer: 2000
        })
    });
}