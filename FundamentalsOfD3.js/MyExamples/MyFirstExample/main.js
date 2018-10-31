var dataset = [];
d3.csv("../../Data/NationalBabyNames/cities.csv", function (data) {
    data.forEach(function (d) {
        // console.log(d); // Not needed.
        // console.log(d['land area']); // Not needed.
        dataset.push(parseInt(d['land area']));
    });


    // *** Define Our Variables ***
    var svgWidth = 800, svgHeight = 300, barPadding = 10; // 'barWidth' makes the bars more narrow.

    var barWidth = ((svgWidth / dataset.length) + (barPadding / 2));


    // *** Selecting the SVG Tag ***
    var svg = d3.select('svg')
        .style('margin-top', '20')
        .style('padding', '40')
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("display", "block");


    // *** Defining the scale ***
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, svgHeight]);


    // *** The bar chart ***
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
        .attr("width", barWidth - (barPadding / 2))
        .attr("transform", function (d, i) {
            var translate = [(barWidth * i), 0];
            return "translate(" + translate + ")";
        });


    // *** Bar height text *** see https://scrimba.com/p/pb4WsX/c4WLes8
    var text = svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function (d) {
            return d;
        })
        .attr('y', function (d, i) {
            return svgHeight - yScale(d) - 5;
        })
        .attr('x', function (d, i) {
            return ((barWidth * i) + (barWidth - barPadding) / 2); // Replaced '(barWidth * i)' with '((barWidth * i) )'.
        })
        .attr("fill", "#A64C38");


    // *** The Axes *** see https://scrimba.com/p/pb4WsX/c6rwbhr

    // remove this - not used
    // var xScaleAxis = d3.scaleLinear()
    // .domain([0, d3.max(dataset)])
    // .range([0, svgWidth]);

    var yScaleAxis = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([svgHeight, 0]);

    var y_axis = d3.axisLeft()
        .scale(yScaleAxis);

    svg.append("g") // "g" for group element.
        .call(y_axis);


    // *** The Pie Chart *** see https://scrimba.com/p/pb4WsX/cPyPVAr
    var data2 = [
        { "platform": data[0].city, "percentage": data[0][`land area`] },
        { "platform": data[1].city, "percentage": data[1][`land area`] },
        { "platform": data[2].city, "percentage": data[2][`land area`] },
        { "platform": data[3].city, "percentage": data[3][`land area`] },
        { "platform": data[4].city, "percentage": data[4][`land area`] },
        { "platform": data[5].city, "percentage": data[5][`land area`] },
        { "platform": data[6].city, "percentage": data[6][`land area`] },
        { "platform": data[7].city, "percentage": data[7][`land area`] }
    ];

    var svgWidth2 = 500, svgHeight2 = 300, radius = Math.min(svgWidth2, svgHeight2) / 2;
    var svg2 = d3.select('.pie-chart')
        .attr("width", svgWidth2)
        .attr("height", svgHeight2)
        .attr("display", "block");

    //Create group element to hold pie chart    
    var g = svg2.append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var pie = d3.pie().value(function (d) {
        return d.percentage;
    });

    var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    var arc = g.selectAll("arc")
        .data(pie(data2))
        .enter()
        .append("g");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d) {
            return color(d.data.percentage);
        });

    var label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.data.platform + ":" + d.data.percentage + "%";
        });
});