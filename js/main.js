const header = $('header');
const fill = $('#bar .fill');
let content = $('#content');

populateCalcContent();

function populateCalcContent() {
	content.html(`<div class="summary">
	<div id="pre">Calculator</div>
	<div id="numbers">0</div>
</div>
<div class="controls">
	<form class="calc-container">
		<button class="clear light-gray corner1">AC</button>	
		<button class="clear light-gray">+/–</button>
		<button class="operator light-gray">^</button>
		<button class="operator orange corner2">÷</button>
		<button class="number gray">7</button>	
		<button class="number gray">8</button>
		<button class="number gray">9</button>
		<button class="operator orange">×</button>  
		<button class="number gray">4</button>	
		<button class="number gray">5</button>
		<button class="number gray">6</button>
		<button class="operator orange">–</button>  
		<button class="number gray">1</button>	
		<button class="number gray">2</button>
		<button class="number gray">3</button>
		<button class="operator orange">+</button>  
		<button class="number wide gray corner3">0</button>
		<button class="decimal gray">.</button>
		<button class="equal orange corner4">=</button>			
	</form>	
</div>`);
}

function populateTipContent() {
	content.html(`<div class="summary">
	<div id="pre">Total Per Person</div>
	<div id="numbers">$0.00</div>
</div>
<div class="controls">
	<form class="tip-container">
		<div class="form-field">				
			<label>Bill Amount</label>
			<input class="bill-input" type="number">
		</div>
		<label>Tip</label>
		<div class="form-field padded">
			<input class="slider" type="range" id="percent" value="20" min="0" max="30" />
			<div id="percent-number">20%</div>
		</div>
		<div class="form-field padded">
			<input type="range" id="people" value="1" min="1" max="20" />
			<div id="people-number">1</div>
		</div>		        			
	</form>	
	<p class="results">Tip Amount: <span>$0.00</span></p>
	<p class="results">Total With Tip: <span>$0.00</span></p>
</div>`);
	adjustRange();
	$('#percent').on('input', () => {
		let percent = $('#percent').val();
		$('#percent-number').html(percent + '%');
	});
	
	$('#people').on('input', () => {
		let people = $('#people').val();
		$('#people-number').html(people);
	});
}

$('#calc').on('click', () => {
	header.removeClass('tip').addClass('calc');
	fill.animate({left: '0'}, 300);
	populateCalcContent();
});

$('#tip').on('click', () => {
	header.removeClass('calc').addClass('tip');
	fill.animate({left: '50%'}, 300);
	populateTipContent()
});

function adjustRange() {
	$('input[type=range]').on('input', function(e) {
	  var min = e.target.min,
	      max = e.target.max,
	      val = e.target.value;
	  
	  $(e.target).css({
	    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
	  });
	}).trigger('input');	
}