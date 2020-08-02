$(document).ready(function() {

	// populate content dynamically
	const header = $('header');
	const fill = $('#bar .fill');
	let content = $('#content');

	populateCalcContent();

	function populateCalcContent() {
		content.html(`<div class="summary">
	<div id="pre">Calculator</div>
	<div id="result">0</div>
</div>
<div class="controls">
	<form class="calc-container">
		<button class="clear light-gray corner1">AC</button>	
		<button class="negative light-gray">+/-</button>
		<button class="operator light-gray">^</button>
		<button class="operator orange corner2">÷</button>
		<button class="number gray" value="7">7</button>	
		<button class="number gray" value="8">8</button>
		<button class="number gray" value="9">9</button>
		<button class="operator orange">×</button>  
		<button class="number gray" value="4">4</button>	
		<button class="number gray" value="5">5</button>
		<button class="number gray" value="6">6</button>
		<button class="operator orange">–</button>  
		<button class="number gray" value="1">1</button>	
		<button class="number gray" value="2">2</button>
		<button class="number gray" value="3">3</button>
		<button class="operator orange">+</button>  
		<button class="number wide gray corner3" value="0">0</button>
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
			<div class="symbol">$</div>
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
		
		// output value while you adjust the input range 
		$('#percent').on('input', () => {
			let percent = $('#percent').val();
			$('#percent-number').html(percent + '%');
		});	
		
		$('#people').on('input', () => {
			let people = $('#people').val();
			$('#people-number').html(people);
		});
	}

	// toggle nav
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

	// live update width of yellow bar in input range
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
		
	// regular calculator
	let first = '';
	let second = '';
	let operator = '';
	let result = '';
	let isOperatorChosen = false;
	let isCalculated = false;
	let firstIsNegative = false;
	let secondIsNegative = false;
	let firstHasDecimal = false;
	let secondHasDecimal = false;
	
	function reset() {		
		first = '';
		second = '';
		operator = '';
		result = '';
		isOperatorChosen = false;
		isCalculated = false;
		firstIsNegative = false;
		secondIsNegative = false;
		firstHasDecimal = false;
		secondHasDecimal = false;
		$('#result').attr('style', 'font-size: 56px; line-height: 56px;');
		$('#pre').text('Calculator');
		$('#result').text(0);
	}
	
	$('.number').on('click', function(e) {
		e.preventDefault();
		if (isCalculated) {
			return false;
		}
		if (isOperatorChosen) {
			second += $(this).val();
			$('#second-number').text(second);
		} else {
			$('#pre').html('<span id="first-number"></span><span id="operator"></span><span id="second-number"></span>');
			first += $(this).val();
			$('#first-number').text(first);
		}	
	});
	
	$('.operator').on('click', function(e) {
		e.preventDefault();		
		if (!first || isCalculated) {
			return false;
		}
		isOperatorChosen = true;
		operator = $(this).text(); 
		$('#operator').text(' ' + operator + ' ');		
	});
	
	$('.negative').on('click', function(e) {
		e.preventDefault();
		if (!first || isCalculated) {
			return false;
		}
		if (isOperatorChosen && secondIsNegative) {
			secondIsNegative = false;
			second = second.substring(1);
			$('#second-number').text(second);
		} else if (isOperatorChosen) {
			secondIsNegative = true;
			second = '-' + second;
			$('#second-number').text(second);
		} else if (isOperatorChosen === false && firstIsNegative) {
			firstIsNegative = false;
			first = first.substring(1);
			$('#first-number').text(first);
		} else {
			firstIsNegative = true;
			first = '-' + first;
			$('#first-number').text(first);
		}
	});
	
	$('.decimal').on('click', function(e) {
		e.preventDefault();
		if (isCalculated) {
			return false;
		}
		if (isOperatorChosen && !secondHasDecimal) {
			second += '.';
			secondHasDecimal = true;
			$('#second-number').text(second);
		} else if (!firstHasDecimal) {
			first += '.';
			firstHasDecimal = true;
			$('#first-number').text(first);
		}		
	});
	
	function math(first, second) {
		let math;
		first = parseFloat(first);
		second = parseFloat(second);
		if (operator === '+') {
			math = first + second;
		} else if (operator === '–') {
			math = first - second;
		} else if (operator === '×') {
			math = first * second;
		} else if (operator === '÷') {
			math = first / second;
		} else if (operator === '^') {
			math = Math.pow(first, second);
		}
		$('#result').text(math);
		
		// make text smaller based on character length
		math = math.toString().split('');		
		if (math.length > 8 && math.length <= 10) {
			$('#result').attr('style', 'font-size: 46px; line-height: 56px;');
		} else if (math.length > 10 && math.length <= 12) {
			$('#result').attr('style', 'font-size: 36px; line-height: 56px;');
		} else if (math.length > 12 && math.length <= 16) {
			$('#result').attr('style', 'font-size: 26px; line-height: 56px;');
		} else if (math.length > 16 && math.length <= 20) {
			$('#result').attr('style', 'font-size: 22px; line-height: 56px;');
		} else if (math.length > 20) {
			// pull scientific notation to add to the end
			let sci = math.slice(math.length - 4, math.length).join('');
			math = math.slice(0, 10).join('');
			$('#result').text(math + sci);
			$('#result').attr('style', 'font-size: 30px; line-height: 56px;');
		}
		
	}
	
	$('.equal').on('click', function(e) {
		e.preventDefault();
		if (isCalculated) {
			return false;
		}
		isCalculated = true;
		math(first, second);
	});
	
	$('.clear').on('click', function(e) {
		e.preventDefault();
		reset();
	});

});