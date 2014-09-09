THREE.MapLoader = function ( manager ) {
	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
};

THREE.MapLoader.prototype = {

	constructor: THREE.MapLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;
		var req = new XMLHttpRequest();

		if ( onLoad !== undefined ) {
			req.addEventListener( 'load', function ( event ) {
				onLoad( new Uint16Array( event.target.response ) );
				scope.manager.itemEnd( url );
			}, false );
		}

		if ( onProgress !== undefined ) {
			req.addEventListener( 'progress', function ( event ) {
				onProgress( event );
			}, false );
		}

		if ( onError !== undefined ) {
			req.addEventListener( 'error', function ( event ) {
				onError( event );
			}, false );
		}

		if ( this.crossOrigin !== undefined ) req.crossOrigin = this.crossOrigin;
		req.open( 'GET', url, true );
		req.responseType = 'arraybuffer';
		req.send( null );
		scope.manager.itemStart( url );
	},

	setCrossOrigin: function ( value ) {
		this.crossOrigin = value;
	}

};
