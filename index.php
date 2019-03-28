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
		return true;
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
			"姓名" => $name,
			"性别" => $gender,
			"电话" => $phone,
			"学院" => $institute,
			"ID" => $ID
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

	/**
	 * [mysql 数据库使用]
	 * @return [type] [description]
	 */
	function mysql() {
		$name = test_Info($_POST['name']);
		$gender = test_Info($_POST['gender']);
		$phone = test_Info($_POST['phone']);
		$institute = test_Info($_POST['institute']);
		$stuID = test_Info($_POST['ID']);
		$connection = mysqli_connect('127.0.0.1', 'root', 'hsy98106', 'demo');
		if (!$connection) {
			echo "数据库连接失败！！！";
			return;
		}
		//如果所有必须必须数据均符合要求，添加数据到数据库
		$add = "insert into studentinfo (id, name, gender, phone, institute, stuID) values (null, '$name', '$gender', '$phone', '$institute', '$stuID');";
		//执行添加数据
		$query = mysqli_query($connection, $add);
		if (!$query) {
			echo "添加数据失败！";
		}
		mysqli_close($connection);		
	}

	if ($_SERVER['REQUEST_METHOD'] === "POST") {
			writeInfo();
			mysql();
	}
?>
