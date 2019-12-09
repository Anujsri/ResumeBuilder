user_id = document.getElementById('user_id').value;

//function to add award
var addaward = document.getElementById('add-award');
addaward.addEventListener('submit', addAward);
function addAward(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('addAward');
    let award_name = document.getElementById('award_name').value;
    let date = document.getElementById('award_date').value;
    let institute_name = document.getElementById('award_institute_name').value;
    let description = document.getElementById('award_description').value;
    if (new Date(date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.post('/award/award/' + user_id, {
            award_name: award_name,
            date: date,
            institute_name: institute_name,
            description: description
        }).then((response) => {
            console.log(response.data);
            $("#award_block").load(window.location.href + " #award_block");
            alertMessage(response.data.message, 'success')
        }).catch(error => {
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });
        document.getElementById('award_name').value = '';
        document.getElementById('award_date').value = '';
        document.getElementById('award_institute_name').value = '';
        document.getElementById('award_description').value = '';
        modal.click(function() {
            modal.modal('hide');
        });
    }
}

var awardId;

//function to fill the existing valus of fields when edit Award window pop up
function fillEditAward(award_name, institute_name, award_id, description, date) {

    let edit_award_name = document.getElementById('eaward_name');
    let edit_date = document.getElementById('eaward_date');
    let edit_institute_name = document.getElementById('eaward_institute_name');
    let edit_description = document.getElementById('eaward_description');
    awardId = award_id;

    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    let dd_mm_yyyy = [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
    edit_award_name.value = award_name;
    edit_institute_name.value = institute_name;
    edit_description.value = description;
    edit_date.value = dd_mm_yyyy;
    $('#editAward').modal('show');
}

//function to Edit the awards
var editaward = document.getElementById('edit-award');
editaward.addEventListener('submit', editAward);
function editAward(e) {
    // Prevent actual submit
    e.preventDefault();
    let modal = document.getElementById('editAward');
    let award_name = document.getElementById('eaward_name').value;
    let date = document.getElementById('eaward_date').value;
    let institute_name = document.getElementById('eaward_institute_name').value;
    let description = document.getElementById('eaward_description').value;

    if (new Date(date) == "Invalid Date") {
        alertMessage("<span style='color : #F26863'>Date is Invalid</span>", 'warning');
        return false;
    } else {
        axios.put('/award/award/' + awardId, {
            award_name: award_name,
            date: date,
            institute_name: institute_name,
            description: description
        }).then((response) => {
            console.log(response.data);
            $("#award_block").load(window.location.href + " #award_block");
            alertMessage(response.data.message, 'success');
        }).catch(error => {
            console.log(error.response);
            if (typeof error.response !== "undefined") {
                alertMessage(error.response.data.message, 'warning')
            }
        });
    }

    document.getElementById('eaward_name').value = '';
    document.getElementById('eaward_date').value = '';
    document.getElementById('eaward_institute_name').value = '';
    document.getElementById('eaward_description').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}