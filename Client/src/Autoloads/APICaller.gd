extends Node

const api_url = "http://localhost:10000/"
var headers = ["Content-Type: application/json"]
var jwt_headers = headers.duplicate()
var jwt_token : String = ""

var register_request : HTTPRequest = HTTPRequest.new()
var login_request : HTTPRequest = HTTPRequest.new()

var test_request : HTTPRequest = HTTPRequest.new()

func _ready():
	add_child(register_request)
	register_request.connect("request_completed", self, "_register_request_completed")
	add_child(login_request)
	login_request.connect("request_completed", self, "_login_request_completed")
	add_child(test_request)
	test_request.connect("request_completed", self, "_test_request_completed")

func register_user(username : String, email : String, password : String):
	
	# Client Validation
	# Username validation
	if ((username == null) || (username == "")):
		print_debug("error: the username cannot be null")
		return
	
	# Email validation
	if ((email == null) || (email == "") || !email.match("*@*.*")):
		print_debug("error: the email cannot be null or invalid")
		return
	
	# Password Validation
	if ((password == null) || (password == "")):
		print_debug("error: the password cannot be null")
		return
	
	var messageBody = {
		"username": username,
		"email": email,
		"password": password
	}
	
	register_request.request(api_url + "register/", headers, false, HTTPClient.METHOD_POST, JSON.print(messageBody))
	

func _register_request_completed(result, response_code, headers, body):
	var response = parse_json(body.get_string_from_utf8())
	
	print_debug(response_code)
	
	if response_code == 200:
		# TODO Emit Signal to let the player login
		pass
	
	print_debug(response)

func login_user(username : String, password : String):
	
	# Client Validation
	# Username validation
	if ((username == null) || (username == "")):
		print_debug("error: the username cannot be null")
		return
	
	# Password Validation
	if ((password == null) || (password == "")):
		print_debug("error: the password cannot be null")
		return
	
	var messageBody = {
		"username": username,
		"password": password
	}
	
	login_request.request(api_url + "login/", headers, false, HTTPClient.METHOD_POST, JSON.print(messageBody))
	

func _login_request_completed(result, response_code, headers, body):
	print(response_code)
	print(body.get_string_from_utf8())
	
	# Parse Headers
	
	if (response_code == 200):
		jwt_token = body.get_string_from_utf8()
		
		jwt_headers.append("auth-token: " + jwt_token)
	
	
	var header_dictionary = {}
	for hs in headers:
		var values = hs.split(": ")
		header_dictionary[values[0]] = values[1]
	
	# check response category
	if header_dictionary.has("res-category"):
		match(header_dictionary["res-category"]):
			"login":
				if header_dictionary.has("auth-token"):
					jwt_token = header_dictionary["auth-token"]

func test():
	
	print(jwt_headers)
	
	test_request.request(api_url + "", jwt_headers, false, HTTPClient.METHOD_GET, JSON.print({}))

func _test_request_completed(result, response_code, headers, body):
	print(response_code)
	print(body.get_string_from_utf8())
