
var dataset = [];
d3.csv("../Data/NationalBabyNames/cities.csv", function (data) {
    data.forEach(function (d) {
        console.log(d['land area']);
        dataset.push(parseInt(d['land area']));
    });
    var svgWidth = 500, svgHeight = 300, barPadding = 5, shiftRight = 25, shiftUp = 15; // Shift the axis, bars, and text right. Shift the axis and bars up.

    var barWidth = ((svgWidth / dataset.length) - 3); // - 3 makes the bars more narrow.

    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, svgHeight - 40]); // -40 brings the top of the bars down.

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
        .attr("width", barWidth - barPadding)
        .attr("transform", function (d, i) {
            var translate = [shiftRight + (barWidth * i) + (barPadding) / 2, - shiftUp]; // shiftRight moves the bars right. -shiftUp brings the bars up.
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
                return ((barWidth * i) + (barWidth - barPadding) / 2) + shiftRight; // shiftRight shifts the text right.
            })
            .attr("fill", "#A64C38");

    // *** The Axes ***
    var xScaleAxis = d3.scaleLinear()
        // var xScale = d3.scaleLinear()
        // .domain([0, d3.max(data)])
        .domain([0, d3.max(dataset)])
        .range([0, svgWidth]);

    var yScaleAxis = d3.scaleLinear()
        // var yScale = d3.scaleLinear()
        // .domain([0, d3.max(data)])
        .domain([0, d3.max(dataset)])
        .range([svgHeight, 0]);

    var x_axis = d3.axisBottom() // .axisBottom returns a function which we chain with another function, .scale
        .scale(xScaleAxis); // We then pass xScale through our function, .scale.
    // .scale(xScale);

    var y_axis = d3.axisLeft()
        .scale(yScaleAxis);

    svg.append("g") // "g" for group element.
        .attr("transform", "translate(" + shiftRight + ", -" + shiftUp + ")") // shiftRight moves the y axis right. shiftUp shifts the y axis up.
        .call(y_axis);

    var xAxisTranslate = svgHeight - shiftUp; // -shiftUp moves the x Axis down. xAxisTranslate brings the axes down from the top of the svg.

    svg.append("g")
        .attr("transform", "translate(" + shiftRight + "," + xAxisTranslate + ")") // This shifts the x axis in.
        .call(x_axis);

});