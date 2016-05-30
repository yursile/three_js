var THREE = require("./three.min.js");


var scene, camera, renderer;
var geometry, material, mesh;
var width = window.innerWidth;
var height = window.innerHeight;

init();
animate();

function init() {

    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    // camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    camera.position.z = 500;

    geometry = new THREE.BoxGeometry( 200, 200, 200 );


    var loader = new THREE.CubeTextureLoader();
    // loader.setPath( '../img' );

    // var textureCube = loader.load( [
    //     './img/02.jpg', './img/02.jpg',
    //     './img/02.jpg', './img/02.jpg',
    //     './img/02.jpg', './img/02.jpg'
    // ] );

    var texture = THREE.ImageUtils.loadTexture("./img/02.jpg",null,function(t){
        });

    material = new THREE.MeshLambertMaterial( {map: texture } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );


    /**
     * light
     * only LambertMaterial can take the texture effect
     * lambertMaterial can only display with the light of scene,or with its emmisive
     */
    
    
    var light = new THREE.AmbientLight( 0xffff00 ); // soft white light

    scene.add( light );


    /**
     * reflaction
     */
    var pmaterial = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    var imageReflection = document.createElement( 'canvas' );
        imageReflection.width = 480;
        imageReflection.height = 204;
        imageReflectionContext = imageReflection.getContext( '2d' );
        imageReflectionContext.fillStyle = '#000000';
        imageReflectionContext.fillRect( 0, 0, 480, 204 );
        imageReflectionGradient = imageReflectionContext.createLinearGradient( 0, 0, 0, 204 );
        imageReflectionGradient.addColorStop( 0.2, 'rgba(240, 240, 240, 1)' );
        imageReflectionGradient.addColorStop( 1, 'rgba(240, 240, 240, 0.8)' );
        textureReflection = new THREE.Texture( imageReflection );
        var materialReflection = new THREE.MeshBasicMaterial( { map: textureReflection, side: THREE.BackSide, overdraw: 0.5 } );
        //
        var plane = new THREE.PlaneGeometry( 480, 204, 4, 4 );


    var pmesh = new THREE.Mesh( plane, pmaterial );
    scene.add(pmesh);







    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}