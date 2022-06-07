import React from 'react'
import * as blah from 'd3'
import * as bleh from 'topojson'
const d3 = blah.__moduleExports
const topojson = bleh.__moduleExports

export default class SearchMap extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		let _props = this.props
		this.mapInit = mapInit.bind(_props)

		d3.queue()
			.defer(d3.json, 'https://interactive.guim.co.uk/2017/06/aus-census-data/map-sa22.json')
			.defer(d3.json, 'https://interactive.guim.co.uk/docsdata/1u7wug-tZ7Td-2-rnYFgd9mdjoAGsKCYVZrelzDmFtvE.json')
			.awaitAll(function(error, results) {
				if (error) throw error
				this.mapInit(results[0],results[1])
			}.bind(this)) 	


		function mapInit(sa2s,places) {
			var width = document.querySelector("#mapContainer").getBoundingClientRect().width
			var height = 500
			var margin = {top: 0, right: 0, bottom: 0, left:0}
			var active = d3.select(null)
			var scaleFactor = 1
			var projection = d3.geoMercator()
				.center([135,-28.0])
				.scale(width*0.55)
				.translate([width/2,height/2]);

			var path = d3.geoPath()
				.projection(projection)

			var graticule = d3.geoGraticule()	

			var zoom = d3.zoom()
				.scaleExtent([1, 100])
				.on("zoom", zoomed)	

			var commentAreas = d3.map(places.sheets.Sheet1,function(d) { return(d.areaID)}).keys()

			// console.log("commentAreas", commentAreas)

			var svg = d3.select("#mapContainer").append("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("id", "map")
				.attr("overflow", "hidden")
				.on("mousemove", tooltipMove)
				.call(zoom)

			var tooltip = d3.select("#mapContainer")
			    .append("div")
			    .attr("class", "tooltip")
			    .style("position", "absolute")
			    .style("z-index", "20")
			    .style("visibility", "hidden")
			    .style("top", "30px")
			    .style("left", "55px")  				

			var features = svg.append("g")

			features.append("path")
				.datum(graticule)
				.attr("class", "graticule")
				.attr("d", path)						

			features.append("g")
				.selectAll("path")
				.data(topojson.feature(sa2s,sa2s.objects.sa2s).features)
				.enter().append("path")
					.attr("class", function(d) {
						if (commentAreas.indexOf(d.properties.SA2_MAIN16) != -1) {
							return "commentSa2 sa2"
						}

						else {
							return	"sa2"	
						}
						
					})
					.attr("id", d => "sa2" + d.properties.SA2_MAIN16)
					.attr("d", path)
					.on("mouseover", tooltipIn)
					.on("click", clicked)
					.on("mouseout", tooltipOut)

			features.append("path")
				.attr("class", "mesh")
				.attr("stroke-width", 0.5)
				.attr("d", path(topojson.mesh(sa2s, sa2s.objects.sa2s, function(a, b) { return a !== b; })));

			// Zoom on load
			if ( _props.selectedArea.id > 0 ){
				zoomToArea(_props.selectedArea.id)
			}

			// Zoom on autosuggest selection
			window.addEventListener('c17_areaUpdated', function(e){
				zoomToArea(e.detail)
			});

			function tooltipMove(d) {
				d3.select(".tooltip").style("left", d3.mouse(this)[0] + "px");
        		d3.select(".tooltip").style("top", (d3.mouse(this)[1] + 30 ) + "px");
			}		

			function tooltipIn(d) {			
				d3.select(".tooltip").html( "<b>" + d.properties.SA2_NAME16 + "</b>").style("visibility", "visible")
			}

			function tooltipOut(d) {	
				d3.select(".tooltip").style("visibility", "hidden")
			}

			d3.select("#zoomIn").on("click", function(d) {
		        zoom.scaleBy(svg.transition().duration(750), 1.5);
		    });    

		    d3.select("#zoomOut").on("click", function(d) {
		        zoom.scaleBy(svg.transition().duration(750), 1/1.5);
		    }); 

			function clicked(d) {
				if (active.node() === this) return reset()
					active.classed("active", false)
					active = d3.select(this).classed("active", true)

				var bounds = path.bounds(d),
					dx = bounds[1][0] - bounds[0][0],
					dy = bounds[1][1] - bounds[0][1],
					x = (bounds[0][0] + bounds[1][0]) / 2,
					y = (bounds[0][1] + bounds[1][1]) / 2,
					scale = Math.max(1, Math.min(100, 0.9 / Math.max(dx / width, dy / height))),
					translate = [width / 2 - scale * x, height / 2 - scale * y]

				svg.transition()
					.duration(750)
					.call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) )

				_props.handleChange(parseInt(d.properties.SA2_MAIN16), d.properties.SA2_NAME16)
			}

			function zoomed() {
				scaleFactor = d3.event.transform.k
				features.style("stroke-width", 1 / d3.event.transform.k + "px")
				d3.selectAll(".mesh").style("stroke-width", 0.5 / d3.event.transform.k + "px");
				features.attr("transform", d3.event.transform)
			}

			function reset() {
				active.classed("active", false)
				active = d3.select(null)
				svg.transition()
					.duration(750)
					.call( zoom.transform, d3.zoomIdentity )
			}

			function zoomToArea(id) {
				var currentArea = d3.select("#sa2" + id)
				currentArea.classed("active", true)

				var bounds = path.bounds(currentArea.data()[0])
				var dx = bounds[1][0] - bounds[0][0],
					dy = bounds[1][1] - bounds[0][1],
					x = (bounds[0][0] + bounds[1][0]) / 2,
					y = (bounds[0][1] + bounds[1][1]) / 2,
					scale = Math.max(1, Math.min(100, 0.9 / Math.max(dx / width, dy / height))),
					translate = [width / 2 - scale * x, height / 2 - scale * y]

				svg.transition()
					.duration(750)
					.call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) )
			}
		}
	}

	render() {
		return (
			<div className="c17-search-map" id="mapContainer">
				<div id="zoomIn" className="zoomButtons">+</div>
            	<div id="zoomOut" className="zoomButtons">–</div>
			</div>
		)
	}
}