# Heroes actions & xp logic

## Before game starts

1) Choose a rank for himself (copper, bronze, silver, gold, diamond, platinum)
2) Choose a first hero to display on Square basement.
    - This action settle the values of {player[x].square.rod} with the value of {hero.energy_to_act.[current_hero_rank]}
3) Choose a second hero to display on Diamond basement.
    - This action settle the values of {player[x].diamond.rod} with the value of {hero.energy_to_act.[current_hero_rank]}
4) When each player has chosen his heroes, the game can start.

## During game

1) If {player[x].[square || diamond].rod} reach {hero.energy_to_act.[current_hero_rank]}

    - Case 1 : if the hero ins't the "Priest", substract {hero.crown.[current_hero_rank]} value to {player[y].crown} and add 2 points to {player[x].[square || diamond].exp}.

    - Case 2 : if the hero is the "Priest", add {hero.crown.[current_hero_rank]} value to {player[x].crown} and add 2 points to {player[x].[square || diamond].exp}.

2) If {player[x].[square || diamond].exp} reach 6 points

    - Case 1 : the hero level up and this upgrade automatically the {player[x].[square || diamond].hero_rank} and reset the {player[x].[square || diamond].exp} to 0.

    - Case 2 : the hero is at top hero_rank, substract 2 points to {player[y].crown} and reset the {player[x].[square || diamond].exp} to 0.


