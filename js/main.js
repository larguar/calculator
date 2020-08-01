const row = $('#calculator .row');
const fill = $('#bar .fill');
let content = $('#content');

populateCalcContent();

function populateCalcContent() {
	content.html('// Regular Calculator Content');
}
function populateTipContent() {
	content.html('// Tip Calculator Content');
}

$('#calc').on('click', () => {
	row.removeClass('tip').addClass('calc');
	fill.animate({left: '0'}, 300);
	populateCalcContent();
});
$('#tip').on('click', () => {
	row.removeClass('calc').addClass('tip');
	fill.animate({left: '50%'}, 300);
	populateTipContent()
});