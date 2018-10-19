
var dataset = [];
d3.csv("../Data/NationalBabyNames/cities.csv", function (data) {
    data.forEach(function (d) {
        console.log(d);
        console.log(d['land area']);
        dataset.push(parseInt(d['land area']));
    });
    var svgWidth = 800, svgHeight = 300, barPadding = 10, shiftRight = 0, shiftUp = 0; // 'shiftRight' shifts the axis, bars, and text right. 'shiftUp' shift the axis, bars, and text up. 'barWidth' makes the bars more narrow.
    // , barWidth = 4

    var barWidth = ((svgWidth / dataset.length)+(barPadding/2));

    var svg = d3.select('svg')
    // .attr("transform", "translate(" + 0 +", -" + 10  + ")")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("display", "block");

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, svgHeight - 0]);
        // .attr("transform", "translate(" + 0 +", " + 10  + ")"); // -40 brings the top of the bars down.

    // The bar chart
    var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            // return svgHeight - d;
            return svgHeight - yScale(d);
        })
        .attr("height", function (d) {
            // return d;
            return yScale(d);
        })
        // .attr("width", barWidth)
        .attr("width", barWidth - (barPadding/2))
        .attr("transform", function (d, i) {
            var translate = [(barWidth * i)  + shiftRight - 0, - shiftUp]; // 'shiftRight' moves the bars right. 
            // var translate = [((barWidth * i) + (barPadding) / 2) + shiftRight - 0, - shiftUp]; // 'shiftRight' moves the bars right. 'shiftUp' brings the bars up.
            return "translate(" + translate + ")";
        });

        // *** Bar height text ***
        var text = svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .text(function (d) {
                return d;
            })
            .attr('y', function (d, i) {
                // return svgHeight - d;
                return svgHeight - yScale(d) - shiftUp - 5; // -shiftUp shifts the text up.
            })
            .attr('x', function (d, i) {
                return ((barWidth * i) ) + shiftRight - 0; // 'shiftRight' shifts the text right.
                // return ((barWidth * i) + (barWidth - barPadding) / 2) + shiftRight - 0; // 'shiftRight' shifts the text right.
            })
            .attr("fill", "#A64C38");

    // *** The Axes ***
    var xScaleAxis = d3.scaleLinear()
        // var xScale = d3.scaleLinear() // not used
        // .domain([0, d3.max(data)]) // not used
        .domain([0, d3.max(dataset)])
        .range([0, svgWidth]);

    var yScaleAxis = d3.scaleLinear()
        // var yScale = d3.scaleLinear() // not used
        // .domain([0, d3.max(data)]) // not used
        .domain([0, d3.max(dataset)])
        .range([svgHeight, 0]);

    // var x_axis = d3.axisBottom() // .axisBottom returns a function which we chain with another function, .scale
        // .scale(xScaleAxis); // We then pass xScale through our function, .scale.
    // .scale(xScale); // not used

    var y_axis = d3.axisLeft()
        .scale(yScaleAxis);

    svg.append("g") // "g" for group element.
        .attr("transform", "translate(" + shiftRight +", -" + shiftUp +")") // 'shiftRight' moves the y-axis right. 'shiftUp' shifts the y-axis up.
        .call(y_axis);

    var xAxisTranslate = svgHeight - shiftUp; // 'shiftUp' moves the x-axis down. 'xAxisTranslate' brings the x-axis down from the top of the svg.

    // svg.append("g")
        // .attr("transform", "translate(" + shiftRight + "," + xAxisTranslate + ")") // 'shiftRight' moves the x-axis right. 'xAxisTranslate' shifts the x-axis in.
        // .call(x_axis);

});