// var addproject = document.getElementById('add-project');
// addproject.addEventListener('submit', addProjects);
// projectarr = [];
// // addedprojects 
// function addProjects(e) {
//     // Prevent actual submit
//     e.preventDefault();
//     project_name = document.getElementById('project_name').value;
//     skills = document.getElementById('skills').value;
//     app_link = document.getElementById('app_link').value;
//     project_start_date = document.getElementById('project_start_date').value;
//     project_end_date = document.getElementById('project_end_date').value;
//     project_description = document.getElementById('project_description').value;
//     obj = {}
//     obj['project_name'] = project_name;
//     obj['start_date'] = project_start_date;
//     obj['end_date'] = project_end_date;
//     obj['skills'] = skills;
//     obj['app_link'] = app_link;
//     obj['description'] = project_description;
//     projectarr.push(obj)
//     var codeBlock = '';
//     for (var i = 0; i < projectarr.length; i++) {
//         codeBlock += '<div class="col-md-3 col-sm-3 col-xs-6"><div class="thumbnail cardshadow" style="padding : 20px">' +
//             '<h5>' + projectarr[i].project_name + '</h5>' +
//             '<p>' + projectarr[i].skills + ' | ' + projectarr[i].app_link + '</p>' +
//             '<p>' + projectarr[i].description + '</p>' +
//             '<div class="caption">'+
//             '<p><a href="#" class="btn btn-primary" role="button"><i class="glyphicon glyphicon-pencil"></i> Edit</a> '+
//             ' <a href="#" class="btn btn-danger" role="button"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</a></p>'+
//             '</div></div></div>'
//     }
//     document.getElementById("addedprojects").innerHTML = codeBlock;
//     document.getElementById('project_name').value = '';
//     document.getElementById('skills').value = '';
//     document.getElementById('app_link').value = '';
//     document.getElementById('project_start_date').value = '';
//     document.getElementById('project_end_date').value = '';
//     document.getElementById('project_description').value = '';

//     var modal = document.getElementById('addProject');
//     modal.click(function() {
//         modal.modal('hide');
//     });
// }