google.charts.load('current', { 'packages': ['sankey', 'corechart', 'bar', 'calendar'] });
google.charts.setOnLoadCallback(drawCharts);

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1C4pZaeBMuOaJKPHC2fIvFUznHN-bF8RfSo6HoWaPAxM/edit?usp=sharing';

function getData() {
  // Utiliza el método "google.visualization.query" para obtener los datos de la hoja de cálculo
  var query = new google.visualization.Query(publicSpreadsheetUrl);

  // Define la función de respuesta para procesar los datos obtenidos
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
      console.error('Error en la consulta: ' + response.getMessage());
      return;
    }

    // Obtiene una tabla de datos de la respuesta
    var data = response.getDataTable();
    // Llama a la función "drawChartP1" y pasa los datos para dibujar el gráfico
    drawChartP1(data);
	drawChartP2(data);
	drawChartP3(data);
	drawChartP5(data);
  }
  

function drawCharts() {
  getData(); // Llama a la función para obtener los datos de la hoja de cálculo
  drawChartP2();
  drawChartP3();
  drawChartP4();
  drawChartP5();
}

function drawChartP2(data) {
	var chartData = new google.visualization.DataTable();
	chartData.addColumn('string', 'Transacción');
	chartData.addColumn('number', 'Cantidad');
  
	// Obtener la cantidad de transacciones por combinación de "transaction_status" y "transaction_type"
	var transactionData = {};
  
	var numRows = data.getNumberOfRows();
	for (var i = 0; i < numRows; i++) {
	  var transaction_status = data.getValue(i, 4);
	  var transaction_type = data.getValue(i, 6);
	  var key = transaction_status + ' - ' + transaction_type;
  
	  if (transactionData[key] === undefined) {
		transactionData[key] = 1;
	  } else {
		transactionData[key]++;
	  }
	}
  
	// Agregar las combinaciones de "transaction_status" y "transaction_type" al gráfico de pastel
	for (var key in transactionData) {
	  chartData.addRow([key, transactionData[key]]);
	}
  
	var options = {
	  width: 300,
	  height: 200,
	  pieHole: 0.2,
	  slices: {  3: {offset: 0.2},
                                   
          }
	};
	var chart = new google.visualization.PieChart(document.getElementById('p2Chart'));
	chart.draw(chartData, options);
  }
  
  function drawChartP1(data) {
	var chartData = new google.visualization.DataTable();
	chartData.addColumn('string', 'Tipo de Transacción');
	chartData.addColumn('number', 'Número de Meses');
  
	// Obtener la cantidad de transacciones para cada tipo de transacción y número de meses
	var transactionData = {};
  
	var numRows = data.getNumberOfRows();
	for (var i = 0; i < numRows; i++) {
	  var number_of_months = parseInt(data.getValue(i, 7));
	  var transaction_type = data.getValue(i, 6);
  
	  var key = transaction_type + ' - ' + number_of_months + ' meses';
  
	  if (transactionData[key] === undefined) {
		transactionData[key] = 1;
	  } else {
		transactionData[key]++;
	  }
	}
  
	// Agregar los datos de "transaction_type" y "number_of_months" al gráfico de columnas agrupadas
	for (var key in transactionData) {
	  chartData.addRow([key, transactionData[key]]);
	}
  
	var options = {
	  width: 700,
	  height: 400,
	  legend: 'none', // Deshabilitar la leyenda
	  hAxis: { title: 'Tipo de Transacción y Número de Meses' },
	  vAxis: { title: 'Cantidad de Transacciones' }
	};
  
	  
		var chart = new google.visualization.ScatterChart(document.getElementById('p1Chart'));
		chart.draw(chartData, options);
	  }
	

	  function drawChartP3(data) {
		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Brand');
		chartData.addColumn('number', 'Cantidad de Transacciones');
		chartData.addColumn({ type: 'string', role: 'style' }); 
		chartData.addColumn({ type: 'string', role: 'annotation' }); 
	  
		// Obtener la cantidad de transacciones por brand
		var numRows = data.getNumberOfRows();
		var brandData = {}; 
		for (var i = 0; i < numRows; i++) {
		  var brand = data.getValue(i, 5); // Columna 'brand'
		  var transaction_type = data.getValue(i, 6); // Columna 'transaction_type'
		  var quantity = 1; 
	  
		  var color = transaction_type === 'SALE' ? 'blue' : 'green';
		  var legend = transaction_type === 'SALE' ? 'SALE' : 'DEFFERED';
	  
		  if (!brandData[brand]) {
			brandData[brand] = { quantity: quantity, color: color, legend: legend };
		  } else {
			brandData[brand].quantity += quantity;
		  }
		}
	  
		// Agregar los datos al DataTable con los estilos y la leyenda del color para cada barra
		for (var brand in brandData) {
		  if (brandData.hasOwnProperty(brand)) {
			chartData.addRow([brand, brandData[brand].quantity, 'color: ' + brandData[brand].color, brandData[brand].legend]);
		  }
		}
	  
		var options = {
		  width: 500,
		  height: 300,
		  hAxis: { title: 'Cantidad de Transacciones' },
		  vAxis: { title: 'Brand' },
		  legend: { position: 'top', maxLines: 2 }, 
		  bars: 'horizontal' 
		};
	  
		var chart = new google.visualization.BarChart(document.getElementById('p3Chart'));
		chart.draw(chartData, options);
	  }
		

function drawChartP4() {
	var data = google.visualization.arrayToDataTable([
		  ['Task', 'Hours per Day'],
		  ['Work',     11],
		  ['Eat',      2],
		  ['Commute',  2],
		  ['Watch TV', 2],
		  ['Sleep',    7]
		]);

	var chart = new google.visualization.PieChart(document.getElementById('p4Chart'));
	chart.draw(data, {
		backgroundColor:'transparent',
		legend: 'bottom'
		});
	}

	function drawChartP5(data) {
		var chartData = new google.visualization.DataTable();
		chartData.addColumn('string', 'Processor Name');
		chartData.addColumn('number', 'Cantidad de Procesos');
		chartData.addColumn('number', 'Cantidad de Transacciones');
	  
		var numRows = data.getNumberOfRows();
		var processorData = {};
		for (var i = 0; i < numRows; i++) {
		  var processor_name = data.getValue(i, 8); // Columna 'processor_name'
		  var transaction_type = data.getValue(i, 5); // Columna 'transaction_type'
		  var quantity = 1; // Se cuenta cada fila como un proceso
	  
		  if (!processorData[processor_name]) {
			processorData[processor_name] = { procesos: 1, SALE: 0, DEFFERED: 0 };
		  } else {
			processorData[processor_name].procesos += quantity;
		  }
	  
		  processorData[processor_name][transaction_type]++;
		}
	  
		for (var processor_name in processorData) {
		  if (processorData.hasOwnProperty(processor_name)) {
			chartData.addRow([
			  processor_name,
			  processorData[processor_name].procesos,
			  processorData[processor_name].SALE + processorData[processor_name].DEFFERED // Sumar las cantidades de transacciones SALE y DEFFERED
			]);
		  }
		}
	  
		var options = {
		  width: 800,
		  height: 600,
		  hAxis: { title: 'Cantidad de Procesos' },
		  vAxis: { title: 'Cantidad de Transacciones' },
		  legend: { position: 'top', maxLines: 2 },
		  bubble: { textStyle: { fontSize: 11 } } // Configuración para el Bubble Chart
		};
	  
		var chart = new google.visualization.BubbleChart(document.getElementById('p5Chart'));
		chart.draw(chartData, options);
	  }
	  