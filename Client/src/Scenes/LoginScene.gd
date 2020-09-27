extends Control

signal change_scene(new_scene)

func _on_RegisterConfirm_pressed():
	ApiCaller.register_user($RegisterPanel/VBox/Username/Input.text,
			$RegisterPanel/VBox/Email/Input.text,
			$RegisterPanel/VBox/Password/Input.text)

func _on_LoginConfirm_pressed():
	ApiCaller.login_user($LoginPanel/VBox/Username/Input.text,
			$LoginPanel/VBox/Password/Input.text)


func _on_Test_pressed():
	ApiCaller.test()
