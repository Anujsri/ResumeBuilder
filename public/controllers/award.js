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
    }).then((response)=> {
        console.log(response.data);
        getAward()
        alertMessage(response.data.message,'success');
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message,'warning')
    });
    document.getElementById('award_name').value = '';
    document.getElementById('award_date').value = '';
    document.getElementById('award_institute_name').value = '';
    document.getElementById('award_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}


getAward()

function getAward() {
    axios.get('/profile/award/' + user_id).then(function(response) {
        var codeBlock = '';
        for (let i = 0; i < response.data.data.length; i++) {

            let start_date = new Date(response.data.data[i].date);
            codeBlock += '<div class="row">' +
                '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
                '<i class="fa fa-circle" aria-hidden="true"></i> ' + response.data.data[i].award_name +
                '<div class="modal-body">' +
                '<p><i class="fa fa-building" aria-hidden="true"></i> ' +
                response.data.data[i].institute_name +' </p>' +
                '<small>' + response.data.data[i].description + '</small>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
                '<div class="pull-right">' +
                '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
                monthNames[start_date.getMonth()] + ' ' + start_date.getFullYear() +
                ' <a href="#" type="button" data-toggle="modal" data-target="#editOverview">' +
                '<i class="glyphicon glyphicon-pencil"></i></a>' +
                '</div>' +
                '</div>' +
                '</div> '
        }
        document.getElementById("event_block").innerHTML = codeBlock;
    }).catch(error => {
        console.log(error);
    });
}

function alertMessage(title,icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}