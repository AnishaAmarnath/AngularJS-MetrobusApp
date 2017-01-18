var superagent = require('superagent');

var bus_id='';
module.exports = function (app) {
	app.state('data', {
    ttl: null,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'base64json',
    //clearInvalid: false, // remove invalid cookies
    //strictHeader: true //*/ /*don't allow violations of RFC 6265*/
});

	app.route({
	method: 'GET',
	path: '/api/search',
	//config: {
	handler:function(request, reply) {
		
		superagent
            .get('http://api.metro.net/agencies/lametro/routes/'+request.query.search+'/')
			.end(function (err, response) {
				reply(response.body).state('data', { firstVisit: false });
			});
		}
	});
	app.route( {
	method: 'GET',
	path: '/api/show/{busid}',
	handler:function(request, reply) {
		superagent
            .get('http://api.metro.net/agencies/lametro/routes/'+request.params.busid+'/sequence/')
			.query({ json: true })
			.end(function (err, response) {
					bus_id = request.params.busid;	
					reply(response.body);
			});
		}
	});
	app.route( {
		method: 'GET',
		path: '/api/email',
		handler:function(request, reply) {
			var data = {
        		from: 'neilhapi123@gmail.com',
        		to: request.query.emailid,
        		subject: 'Routes for ' +bus_id,
        		text: request.query.busrroutes,
        		context: {
            		name: 'Example User'
        		}
    		};
 
    		var Mailer = request.server.plugins.mailer;
    		Mailer.sendMail(data, function (err, info) {
 				console.log(err);
 				console.log(info);
        		reply();
    		});	
		}
	});
	

	
}