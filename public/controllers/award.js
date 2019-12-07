var addaward = document.getElementById('add-award');
addaward.addEventListener('submit', addAward);
user_id = document.getElementById('user_id').value;
function addAward(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('addAward');
    award_name = document.getElementById('award_name').value;
    date = document.getElementById('award_date').value;
    institute_name = document.getElementById('award_institute_name').value;
    description = document.getElementById('award_description').value;
    axios.post('/award/award/' + user_id, {
        award_name: award_name,
        date: date,
        institute_name: institute_name,
        description: description
    }).then((response)=> {
        console.log(response.data);
        $("#certification_block").load(window.location.href + "#certification_block");
        alertMessage(response.data.message,'success');
    }).catch(error => {
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

var awardId;
function fillEditAward(award_name,institute_name,award_id,description,date){

    edit_award_name = document.getElementById('eaward_name');
    edit_date = document.getElementById('eaward_date');
    edit_institute_name = document.getElementById('eaward_institute_name');
    edit_description = document.getElementById('eaward_description');
    awardId = award_id;

    let d = new Date(date);
    var dd_mm_yyyy = d.toLocaleDateString();
    // let d1 = new  Date(dd_mm_yyyy);
    edit_award_name.value = award_name;
    edit_institute_name.value = institute_name;
    edit_description.value = description;
    edit_date.value = dd_mm_yyyy;

    $('#editAward').modal('show');
}

var editaward = document.getElementById('edit-award');
editaward.addEventListener('submit', editAward);

function editAward(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('editAward');
    award_name = document.getElementById('eaward_name').value;
    date = document.getElementById('eaward_date').value;
    institute_name = document.getElementById('eaward_institute_name').value;
    description = document.getElementById('eaward_description').value;


    axios.put('/award/award/' + awardId, {
        award_name: award_name,
        date: date,
        institute_name: institute_name,
        description: description
    }).then((response)=> {
        console.log(response.data);
        $("#certification_block").load(window.location.href + "#certification_block");
        alertMessage(response.data.message,'success');
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message,'warning')
    });
    document.getElementById('eaward_name').value = '';
    document.getElementById('eaward_date').value = '';
    document.getElementById('eaward_institute_name').value = '';
    document.getElementById('eaward_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

// getAward()

// function getAward() {
//     axios.get('/award/award/' + user_id).then(function(response) {
//         var codeBlock = '';
//         for (let i = 0; i < response.data.data.length; i++) {

//             let start_date = new Date(response.data.data[i].date);
//             codeBlock += '<div class="row">' +
//                 '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">' +
//                 '<i class="fa fa-circle" aria-hidden="true"></i> ' + response.data.data[i].award_name +
//                 '<div class="modal-body">' +
//                 '<p><i class="fa fa-building" aria-hidden="true"></i> ' +
//                 response.data.data[i].institute_name +' </p>' +
//                 '<small>' + response.data.data[i].description + '</small>' +
//                 '</div>' +
//                 '</div>' +
//                 '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">' +
//                 '<div class="pull-right">' +
//                 '<i class="fa fa-calendar" aria-hidden="true"></i> ' +
//                 monthNames[start_date.getMonth()] + ' ' + start_date.getFullYear() +
//                 ' <a href="#" type="button" data-toggle="modal" data-target="#editOverview">' +
//                 '<i class="glyphicon glyphicon-pencil"></i></a>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div> '
//         }
//         document.getElementById("event_block").innerHTML = codeBlock;
//     }).catch(error => {
//         console.log(error);
//     });
// }

function alertMessage(title,icon) {
    Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 3000
    })
}