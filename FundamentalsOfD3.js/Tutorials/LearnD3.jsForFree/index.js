// ******** Second video *********
// Dom selection and manipulation.
// *******************************

// // select dom elements using css selectors or the name of the element itself
// d3.select(); // returns first element meeting the criteria.
// d3.selectAll(); // returns all element meeting the criteria.

// d3.select('h1'); // if no h1 tag is in the dom then it will return an empty selection.

// // d3 allows up to update their style, values, or bind data with them.
// d3.select('h1')
//     .style('color', 'blue')
//     .attr('class', 'heading')
//     .text('We can update the text with our .text() method.');

// d3.select('body')
//     .append('p')
//     .text('First Paragraph');

// d3.select('body')
//     .append('p')
//     .text('Second Paragraph');

// d3.select('body')
//     .append('p')
//     .text('Third Paragraph');

// d3.selectAll('p')
//     .style('color', 'red');


// *********** Third Video ************
// Mapping data into dom elements. 
// Meaning we can append, update, 
// display elements using our data set.
// ************************************

// // Task: create paragraph tags for each item in our dataset array.
// var dataset = [1, 2, 3, 4, 5];

// d3.select('body') // The body is selected.
//     .selectAll('p') // All paragraph tags are selected. There are none, so an empty selection is returned.
//     .data(dataset) // .data() method is called. dataset is passed as the argument. This method will put data in the waiting state for further processing.
//     .enter() // .enter() method is called. Will take data items one by one and perform further operations on them.
//     .append('p') // For each data item we're appending a paragraph tag,
//     // .text('D3 is awesome!!'); // and binding some text inside it.
//     .text(function (d) { return d; }); // Thie function will get teh value of data item, d and return it.


// *********** Forth Video ************
// ****** Creating a bar chart. *******
// ************************************


// var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];


// var svgHeight = 300, barPadding = 5;
// // var svgWidth = 500 + barPadding;
// var svgWidth = 500;
// var barWidth = (svgWidth / dataset.length);


// var svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

// var barChart = svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("y", function (d) {
//         return svgHeight - d;
//     })
//     .attr("height", function (d) {
//         return d;
//     })
//     .attr("width", barWidth - barPadding)
//     .attr("transform", function (d, i) {
//         var translate = [(barWidth * i)+(barPadding)/2, 0];
//         return "translate(" + translate + ")";
//     });


// *********** Fifth Video ************
// ****** Creating a bar chart. *******
// ************************************

// var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];


// var svgHeight = 300, barPadding = 5;
// // var svgWidth = 500 + barPadding;
// var svgWidth = 500;
// var barWidth = (svgWidth / dataset.length);


// var svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

// var barChart = svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("y", function (d) {
//         return svgHeight - d;
//     })
//     .attr("height", function (d) {
//         return d;
//     })
//     .attr("width", barWidth - barPadding)
//     .attr("transform", function (d, i) {
//         var translate = [(barWidth * i) + (barPadding) / 2, 0];
//         return "translate(" + translate + ")";
//     });

// var text = svg.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .text(function (d) {
//         return d;
//     })
//     .attr('y', function (d, i) {
//         return svgHeight - d - 4;
//     })
//     .attr('x', function (d, i) {
//         return (barWidth * i)+ (barWidth - barPadding)/2 - 8;
//     })
//     .attr("fill", "#A64C38");


// *********** Sixth Video ************
// ****** Scaling the bar chart. *******
// ************************************

//var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var dataset = [1, 2, 3, 4, 5];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHeight]);

var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function (d) {
        return svgHeight - yScale(d);
    })
    .attr("height", function (d) {
        return yScale(d);
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
    });

// Come back to this...
// Not in the tutorial.
var text = svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function (d) {
        return d;
    })
    .attr('y', function (d, i) {
        return svgHeight - d - 4;
    })
    .attr('x', function (d, i) {
        return (barWidth * i) + (barWidth - barPadding) / 2 - 8;
    })
    .attr("fill", "#A64C38");


// *********** Seventh Video ************
// *********** Creating axes. ***********
// **************************************

// d3.axisTop()
// d3.axisRight()
// d3.axisBottom()
// d3.axisLeft()

var data = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([svgHeight, 0]);

var x_axis = d3.axisBottom() // .axisBottom returns a function which we chain with another function, .scale
    .scale(xScale); // We then pass xScale through our function, .scale.

var y_axis = d3.axisLeft()
    .scale(yScale);

svg.append("g") // "g" for group element.
    .attr("transform", "translate(50, 10)")
    .call(y_axis);

var xAxisTranslate = svgHeight - 20;

svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate + ")")
    .call(x_axis);


    // ******** Eigth Video *********
    // *** Creating svg elements. ***
    // ******************************

    