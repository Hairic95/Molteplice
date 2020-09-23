extends Node

var scenes_references : Dictionary = {
	"login" : load("res://src/Scenes/LoginScene.tscn")
}


# Load the first Scene
func _ready():
	load_scene("login")

# Loads as a child of CurrentScene a Scene (.tscn files under the /src/Scene folder) erasing 
# any other scene loaded in this parent Node; also it connects the new Scene change_scene 
# signal to itself
# TODO: add a array parameter to pass to the Scene in case it needs any parameter to start
func load_scene(scene_id : String) -> void:
	
	# Checks if the scene_id is present in the scenes_references dictionary; if it doesn't
	# a error will be displayed and the game will go back to the main menu
	if !scenes_references.has(scene_id):
		# TODO: prepare a error board on Main
		# TODO: make a default Scene to come 
		#       back in case of error
		return
	
	# TODO: add a fade in and fade out animation 
	#       to the screen to transition the Scene
	
	# Deletes the old current Scene
	for old_scene in $CurrentScene.get_children():
		old_scene.queue_free()
	
	# Adds and connects the new Scene to the Main
	var new_scene = scenes_references[scene_id].instance()
	new_scene.connect("change_scene", self, "load_scene")
	$CurrentScene.add_child(new_scene)
	
	# TODO: call the Scene constructor method
	
