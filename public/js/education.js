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

    axios.post('/profile/education/' + user_id, {
        degree: degree,
        start_date: start_date,
        end_date: end_date,
        location: "Jabalpur",
        description: description,
        institute_name: institute_name,
    }).then((response)=> {
        console.log(response.data);
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

function alertMessage(title, icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}