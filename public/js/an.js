$(function() {
    $('.datetimepicker1').datetimepicker({ format: 'MM/DD/YYYY' });
    $('.datetimepicker2').datetimepicker({
        format: 'MM/DD/YYYY',
        useCurrent: false //Important! See issue #1075
    });
    $(".datetimepicker1").on("dp.change", function(e) {
        $('.datetimepicker2').data("DateTimePicker").setMinDate(e.date);
    });
    $(".datetimepicker2").on("dp.change", function(e) {
        $('.datetimepicker1').data("DateTimePicker").setMaxDate(e.date);
    });
});
