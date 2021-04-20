// import {colors} from "libraries/common_functions.js";

load_code(98); // Vector.98.js
load_code(99); // Util.99.js

var attack_mode=false


setInterval(function(){

	use_hp_or_mp();
	loot();

	for (var id in parent.entities) {
		let ent = parent.entities[id];
		if (ent.type == "monster" && Util.distTo(character.x, character.y, ent.x, ent.y) <= 100) {
			Util.Drawing.drawCircle(ent.x, ent.y, 10, 1, Colors.Debug.red, 250);
			Util.Drawing.drawLine(character.x, character.y, ent.x, ent.y, 1, Colors.Debug.orange, 250);
		}
	}

	Util.Drawing.drawCircle(character.x, character.y, 100, 1, Colors.Debug.slate, 250);


	if(!attack_mode || character.rip || is_moving(character)) return;

	var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:300});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}

	Util.Drawing.drawLine(character.x, character.y, target.x, target.y, 1, "gold", 1000);
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		if (Util.distTo(character.x, character.y, target.x, target.y) < character.range - 1) {
			let point = Util.randomPointOnCircle(target.x, target.y, character.range);
		}
		Util.moveToRange(character.range, target.x, target.y);
		set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.
