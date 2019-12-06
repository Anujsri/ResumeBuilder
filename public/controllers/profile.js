var editoverview = document.getElementById('edit-overview');
editoverview.addEventListener('submit', editOverview);
user_id = document.getElementById('user_id').value;

function editOverview(e) {
    // Prevent actual submit
    e.preventDefault();
    var modal = document.getElementById('editOverview');


    profile_overview = document.getElementById('profile_overview').value;

    axios.post('/profile/editprofile/' + user_id, {
        profile_overview: profile_overview
    }).then((response) => {
        console.log(response.data);
        alertMessage(response.data.message, 'success')
        $("#profile_overview_information").load(window.location.href + " #profile_overview_information");
    }).catch(error => {
        console.log(error.response);
        alertMessage(error.response.data.message, 'warning')
    });

    document.getElementById('profile_overview').value = '';
    modal.click(function() {
        modal.modal('hide');
    });
}

async function addAddress() {
    try {
        const { value: formValues } = await Swal.fire({
            title: 'Address',
            confirmButtonText: 'Submit',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            html: '<div class="modal-body">' +
                '<form method="post">' +
                '<div class="row">' +
                '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">' +
                '<div class="form-group">' +
                '<label>City</label>' +
                '<input type="text" class="form-control" id="swal-input1" required>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">' +
                '<div class="form-group">' +
                '<label>State</label>' +
                '<input type="text" class="form-control" id="swal-input2" required>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">' +
                '<div class="form-group">' +
                '<label>Pincode</label>' +
                '<input type="number" class="form-control" id="swal-input3" required>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
                '<div class="form-group">' +
                '<label>Country</label>' +
                '<input type="text" class="form-control" id="swal-input4" required>' +
                '</div>' +
                '</div>' +
                '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">' +
                '<div class="form-group">' +
                '<label>Address</label>' +
                '<textarea class="form-control" rows="2" id="swal-input5" required></textarea>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</form>' +
                '</div>',
            focusConfirm: true,
            preConfirm: () => {
                let count = 0;
                let arr = []
                arr.push({ input_name: document.getElementById('swal-input1'), id: "swal-input1" });
                arr.push({ input_name: document.getElementById('swal-input2'), id: "swal-input2" });
                arr.push({ input_name: document.getElementById('swal-input3'), id: "swal-input3" });
                arr.push({ input_name: document.getElementById('swal-input4'), id: "swal-input4" });
                arr.push({ input_name: document.getElementById('swal-input5'), id: "swal-input5" });
                for (let i = 0; i < arr.length; i++) {
                    if (checkValidaty(arr[i].input_name)) {
                        let err_message = arr[i].input_name.validationMessage;
                        if (arr[i].id == "swal-input5") {
                            $('textarea[id="' + arr[i].id + '"]').addClass('invalid').after('<div class="invalid-feedback">' + err_message + '</div>');
                        }
                        $('input[id="' + arr[i].id + '"]').addClass('invalid').after('<div class="invalid-feedback">' + err_message + '</div>');
                        count = count + 1;
                    }
                }
                if (count > 0) {
                    console.log("value is > 0" + count)
                    return false;
                } else {
                    console.log("value is 0 >" + count)
                    return [arr[0].input_name.value, arr[1].input_name.value, arr[2].input_name.value, arr[3].input_name.value, arr[4].input_name.value];
                }
            }
        })
        if (formValues) {
            axios.post('/profile/editprofile/' + user_id, {
                city: formValues[0],
                state: formValues[1],
                pincode: formValues[2],
                country: formValues[3],
                address: formValues[4]
            }).then((response) => {
                console.log(response.data);
                alertMessage(response.data.message, 'success');
                $("#basic_details").load(window.location.href + " #basic_details");
            }).catch(error => {
                console.log("error" + error.response);
                alertMessage(error.response.data.message, 'warning')
            });;
        }
    } catch (e) {
        console.log(e);
    }
}

function checkValidaty(input_name) {
    if (!input_name.checkValidity()) {
        return true;
    }
}

function alertMessage(title, icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: icon,
        title: title
    })
}