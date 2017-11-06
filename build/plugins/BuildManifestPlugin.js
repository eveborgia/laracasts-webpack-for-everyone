let fs = require('fs');
let path = require('path');

function BuildManifestPlugin () {}

BuildManifestPlugin.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compiler, callback) =>{
        let stats = compiler.getStats();
        let  manifest = JSON.stringify(compiler.getStats().toJson().assetsByChunkName);

        compiler.assets['manifest.json'] = {
            source: function(){

                return manifest;
                
            },
            size: function() {
                return manifest.length;
            }
        };

        callback();
    });

  //  compiler.plugin('done', this.writeManifest);
		
        };


module.exports = BuildManifestPlugin; 