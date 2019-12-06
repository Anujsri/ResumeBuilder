$(function() {
    $('.datetimepicker1').datetimepicker({ format: 'DD/MM/YYYY' });
    $('.datetimepicker2').datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false //Important! See issue #1075
    });
    $(".datetimepicker1").on("dp.change", function(e) {
        $('.datetimepicker2').data("DateTimePicker").setMinDate(e.date);
    });
    $(".datetimepicker2").on("dp.change", function(e) {
        $('.datetimepicker1').data("DateTimePicker").setMaxDate(e.date);
    });
});


var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function(element, renderer) {
        return true;
    }
};

$('#cmd').click(function() {
    doc.fromHTML($('#content').html(), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
});