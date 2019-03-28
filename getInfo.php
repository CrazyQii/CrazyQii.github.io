<?php 
	/**
	 * [checkInfo 检查用户信息]
	 * @return [void] [description]
	 */
	function checkInfo() {
		$name = test_Info($_POST['name']);
		$gender = test_Info($_POST['gender']);
		$phone = test_Info($_POST['phone']);
		$institute = test_Info($_POST['institute']);
		$ID = test_Info($_POST['ID']);
	}

	/**
	 * [writeInfo 存入用户信息]
	 * @return [void] [无]
	 */
	function writeInfo() {
		//获取json文件，对文件进行解码
		$origin = json_decode(file_get_contents("student.json"), true);
		//向现在的数组添加信息
		$origin[] = array(
			"username" => $_POST['username'],
			"password" => $_POST['pwd']
		);
		//编码成json文件
		$json = json_encode($origin);
		file_put_contents('student.json', $json);
	}

	/**
	 * [test_Info 消除空格、反斜线等特殊字符]
	 * @param  [string] $data [输入信息]
	 * @return [string]       [正确信息]
	 */
	function test_Info($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}

	if ($_SERVER['REQUEST_METHOD'] === "POST") {
		checkInfo();
		writeInfo();
	}
?>