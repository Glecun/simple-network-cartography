$( document ).ready(function() {
	var clusterFactor = 0.9;
	var clusterized =false;
	
	var network;
	var acteurs;
	function restart() {
		acteurs= [
		'Actor 1',
		'Actor 2',
		'Actor 3',
		'Actor 4',
		'Actor 5'
		];

		// create an array with nodes
		var nodes = [
			{id: 1, label: 'Library 1', group: 'library', chefid:0, mass:4},
			{id: 2, label: 'WebService 1', group: 'webservice', chefid:0, mass:4},
			{id: 3, label: 'Application 1', group: 'appli', chefid:1, mass:4},
			{id: 4, label: 'Application 2', group: 'appli', chefid:1, mass:4},
			{id: 5, label: 'WebService 2', group: 'webservice', chefid:1, mass:4},
			{id: 6, label: 'WebService 3', group: 'webservice', chefid:1, mass:4},
			{id: 7, label: 'WebService 4', group: 'webservice', chefid:2, mass:4},
			{id: 8, label: 'WebService 5', group: 'webservice', chefid:3, mass:4},
			{id: 9, label: 'WebService 6', group: 'webservice', chefid:4, mass:4},
			{id: 10, label: 'WebService 7', group: 'webservice', chefid:4, mass:4},
			{id: 11, label: 'WebService 8', group: 'webservice', mass:4},
			{id: 12, label: 'Application 3', group: 'appli', chefid:0, mass:4},
			{id: 13, label: 'WebService 9', group: 'webservice', chefid:2, mass:4},
			{id: 14, label: 'Library 2', group: 'library', chefid:0, mass:4},
			{id: 15, label: 'Library 3', group: 'library'},
			{id: 16, label: 'Library 4', group: 'library'},
			{id: 17, label: 'Library 5', group: 'library'}
		];

		// create an array with edges
		var edges = [
			{from: 3, to: 9  },
			{from: 3, to: 10},
			{from: 3, to: 5 },
			{from: 4, to: 1},
			{from: 4, to: 2 },
			{from: 4, to: 3},
			{from: 4, to: 5},
			{from: 4, to: 6},
			{from: 4, to: 7},
			{from: 4, to: 9},
			{from: 4, to: 10},
			{from: 5, to: 9},
			{from: 7, to: 12},
			{from: 9, to: 11},
			{from: 10, to: 11},
			{from: 12, to: 10},
			{from: 12, to: 9},
			{from: 12, to: 6},
			{from: 12, to: 8},
			{from: 12, to: 13},
			{from: 12, to: 15},
			{from: 12, to: 17},
			{from: 12, to: 16},
			{from: 12, to: 14}
		];

		// create a network
		var container = document.getElementById('mynetwork');
		var data = {
			nodes: nodes,
			edges: edges
		};
		var options = {
			layout: {randomSeed: 8}, 
			physics:{adaptiveTimestep:false},
			edges:{
				smooth:true,
				arrows: {to:true}
			},
			groups: {
			  appli: {
				shape: 'image',
				image: 'app.png'
			  },
			  webservice: {
				shape: 'image',
				image: 'earth.png'
			  },
			  library: {
				shape: 'image',
				image: 'book.png'
			  }
			}
		};
		network = new vis.Network(container, data, options);
		network.stabilize();
		
		// we use the zoom event for our clustering
		network.on('zoom', function (params) {
			if (params.direction == '-') {
				console.log(params.scale < clusterFactor && !clusterized);
				console.log(params.scale < clusterFactor);
				console.log(!clusterized);
				if (params.scale < clusterFactor && !clusterized) {
					clusterized =true;
					makeClusters();
				}
			}
			else {
				if (clusterized){
					openClusters();
					clusterized =false;
				}
			}
		});
	}
	restart();
	
	function makeClusters() {
		for (i = 0; i < acteurs.length; i++) { 
		console.log(i);
			var options = {
				joinCondition:function(nodeOptions) {
					return nodeOptions.chefid == i;
				},
				clusterNodeProperties: {
					borderWidth: 3, 
					shape: 'image',
					image: 'user.png',
					font: {size: 20},
					label: acteurs[i],
					id: i,
					mass:4,
					allowSingleNodeCluster: true
				}
			}
			network.clustering.cluster(options);
			network.setOptions({physics:{stabilization:{fit: false}}});
			network.stabilize();
		}

	}
	
	function openClusters() {
		restart();
	}
});
