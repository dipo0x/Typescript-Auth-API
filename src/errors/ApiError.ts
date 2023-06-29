class ApiError {
    code: number;
    message: String;
	constructor(code: number, message: String) {
		this.code = code;
		this.message = message
	}
	static badRequest(msg: String){
		return new ApiError(400, msg)
	}
	static badUserRequest(msg: String){
		return new ApiError(409, msg)
	}
	static internal(msg: String){
		return new ApiError(500, msg)
	}
}

export default ApiError