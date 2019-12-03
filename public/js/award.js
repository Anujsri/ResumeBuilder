var addaward = document.getElementById('add-award');
addaward.addEventListener('submit', addAward);
user_id = document.getElementById('user_id').value;

function addAward(e) {
    // Prevent actual submit
    e.preventDefault();
    console.log("addAward");
    var modal = document.getElementById('addAward');
    award_name = document.getElementById('award_name').value;
    date = document.getElementById('award_date').value;
    institute_name = document.getElementById('award_institute_name').value;
    description = document.getElementById('award_description').value;

    axios.post('/profile/award/' + user_id, {
        award_name: award_name,
        date: date,
        institute_name: institute_name,
        description: description
    }).then(function(response) {
        console.log(response.data);
        
        document.getElementById('award_name').value = '';
        document.getElementById('award_date').value = '';
        document.getElementById('award_institute_name').value = '';
        document.getElementById('award_description').value = '';
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your password has been updated',
            showConfirmButton: false,
            timer: 2000
        })
    }).catch(error => {
        console.log(error.response.data);
        modal.click(function() {
            modal.modal('hide');
        });
    });
}