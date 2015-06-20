// get room list (TODO: get room list by company)
app
	.factory('wmudBS', 
	    function  ($resource) {
    	    this.Session = function(username, password){
    	    	var Res = $resource(API_BASE_URL+'/public/opensession/username/:username/password/:password',
							{}
						);
					
    	        return Res;
    	    }
    	    
    	    this.Test = function(){
    	    	var Res = $resource(API_BASE_URL+'/public/test',
							{}
						);
    	        return Res;
    	    }
	        
	        return this;
	        
	})
	; //End
	
	//http://luoli-luolisave.c9.io/wmud/index.php/public/opensession/username/test/password/123456