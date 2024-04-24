# Wheels game - Game Design Document

## Gameplay
### Overview

The goal in Wheels is to reduce your enemy’s HP (called the “Crown”) to zero before they can. You can protect your HP with a wall called a Bulwark. Bulwarks cap at 5 damage resistance/levels. Even if the damage goes over the Bulwark’s resistance level, the attack will not reach the Crown until it’s fully down. 
Some heroes are an exception to the rule.

### Heroes
The game starts by the players selecting what two heroes they want to play with, and assigns one Hero to Squares and the other one Diamonds.
Each hero has 3 ranks of power, bronze, silver, and gold. The higher the level, the less energy it takes to act, and the more powerful the action is.

Heroes array :

| Hero  |         | Figurine |       | Description                                        |
|--------|----------|-------|-------|----------------------------------------------------|
|        | Bronze   | Silver | Gold  |                                                    |
|--------|----------|-------|-------|----------------------------------------------------|
| Warrior| 3 Energy to Act | 3 Energy to Act | 3 Energy to Act | A steady and moderately fast damage dealer. Since damage doesn't carry over, this one is easily blocked by the Bulwark. |
|        | Crown: 3 | Crown: 5 | Crown: 7 |                                                    |
|        | Bulwark: 3| Bulwark: 5 | Bulwark: 5 |                                          |
|--------|----------|-------|-------|----------------------------------------------------|
| Mage   | 5 Energy to Act | 4 Energy to Act | 4 Energy to Act | Attacks twice. The first fireball is at the ground level and easily blocked by the Bulwark, while the second fireball flies at a height of 6 units, guaranteeing a hit on the Crown even if the Bulwark is maxed out. |
|        | Crown: 2 | Crown: 3 | Crown: 3 |                                                    |
|        | Bulwark: 2| Bulwark: 3 | Bulwark: 5 |                                          |
|--------|----------|-------|-------|----------------------------------------------------|
| Archer   | 4 Energy to Act | 3 Energy to Act | 3 Energy to Act | Strong against Crown, weak against Bulwark. The arrow flies at a height of 3 units, hitting the Crown when the Bulwark is at 2 or less. |
|        | Crown: 3 | Crown: 4 | Crown: 6 |                                                    |
|        | Bulwark: 1| Bulwark: 2 | Bulwark: 3 |                                          |
|--------|----------|-------|-------|----------------------------------------------------|
| Engineer   | 4 Energy to Act | 4 Energy to Act | 3 Energy to Act | Strong against Bulwark, weak against Crown. As a bonus, the engineer raises its team's Bulwark by 2 units whenever it acts.  |
|        | Crown: 1 | Crown: 2 | Crown: 4 |                                                    |
|        | Bulwark: 3| Bulwark: 5 | Bulwark: 5 |                                          |
|--------|----------|-------|-------|----------------------------------------------------|
| Assassin   | 3 Energy to Act | 3 Energy to Act | 3 Energy to Act | Specialist Hero. Attacks delay the opponent's Hero with the least amount of energy left before acting. Also deals low damage to the Crown directly, disregarding Bulwark.   |
|        | Crown: 1 | Crown: 1 | Crown: 2 |                                                    |
|        | Opponent Base: 1| Opponent Base: 2 | Opponent Base: 2 |                                      |
|--------|----------|-------|-------|----------------------------------------------------|
| Priest   | 4 Energy to Act | 3 Energy to Act | 3 Energy to Act | Support Hero. Heals its team's Crown, and gives energy to its fellow Hero.   |
|        | Crown: 1 | Crown: 2 | Crown: 2 |                                                    |
|        | Ally: 2| Ally: 2 | Ally: 3 |                                      |                         


### Wheels statistics
The rest of the game is played in rounds in which the player spins their wheels up to three times. 
The first time each round, all wheels must be spun. The player can then choose to lock a wheel according to what panels are desired that round. The roll is finalized after the result of the third spin, or if the player locks all 5 wheels after the 1st or 2nd spin. Panels can show Squares, Diamonds, Hammers, or nothing (only on low level player wheels). Squares and Diamonds grant energy needed for the respective Hero to act, while hammers build Bulwark, a defensive wall that protects the Crown from damage in most cases.

Wheels values :
S = Square
D = Diamond
H = Hammer
S+ = Square + XP for the hero display on the Square basement
D+ = Diamond + XP for the hero display on the Diamond basement
DD+ = Double Diamond + XP for the hero display on the Diamond basement
SS+ = Double Square + XP for the hero display on the Square basement

- Wheel 1 : S → D → S → S+ → D → H → DD+ → H
- Wheel 2 : S+ → D → SS → D+ → S → H → DD → HH
- Wheel 3 : S+ → D → D+ → S → D → HH → SS → HH
- Wheel 4 : S → D → S+ → D → HH → S → D+ → HH

Notes : Each of these first four wheels contains three square panels, three diamond panels, two hammer panels, and two experience-granting panels (one for each symbol). 

The fifth wheel is a special wheel that change depending on the levels of the players.

- Wheel 5 : 
    - Copper : s1 → d1 → h1 → blank → blank → s1 → d1 → blank
    - Bronze : s1 → d1 → h1 → blank → blank → s1 → d1 → h2
    - Silver : s1 → d1 → h1 → blank → d1 → sp2 → d1 → h2
    - Gold : s1 → dp2 → h1 → s1 → d1 → sp2 → d1 → h2
    - Diamond : s1 → dp2 → h2 → s2 → d2 → sp2 → d1 → h2
    - Platinum : s1 → dp2 → h3 → sp2 → dp2 → sp2 → d1 → h2
    - Obsidian : blank → blank → d3 → blank → blank → s3 → blank → blank

## Hero Rank and XP

Some Square and Diamond panels also have a starry background (representing as '+' on the wheels statistics values); these each grant 1 XP to the Hero associated with the symbol. Additionally, each time a Hero acts, 2 XP is granted. Once a Hero's XP indicator reaches 6, the Hero either upgrades or sends a bomb. 

Note that XP does not carry over (e.g., rolling 3 XP points to a Hero who has 5/6 XP will still only receive the 1 XP needed). 

However, XP granted by acting is given at the very end of a turn. Reaching 6 XP for the first time upgrades the Hero to Silver rank, and a second time upgrades the Hero to Gold rank. Gold rank Heroes send a bomb every time 6 XP is reached instead of upgrading further. Bombs deal 2 points of damage to the opposing player's Crown, ignoring Bulwark. Not only does ranking up increase the effectiveness of Heroes' actions, but in some cases it decreases the amount of energy needed to for that Hero to act.

## Energy and Hero Actions

Energy is granted to Heroes when the final roll of a turn shows enough of a given symbol. Energy is calculated by subtracting 2 from the amount of symbols shown on the roll, so the player must obtain at least 3 in one turn in order to grant a Hero energy. A single panel can sometimes show 2 or even 3 of a single symbol at once. Just like XP, a Hero's action meter does not carry over if excess energy is earned. 

All Heroes but the Priest attack when they act. 

Another way for a Hero to gain energy is through the Priest Hero, which grants some energy instead of attacking. 

Heroes can also lose energy in a turn if the enemy's Assassin Hero acts. 

The damage an attacking Hero does to the Crown and to the Bulwark are indicated by numbers under the figurine. 

An Engineer does more damage to the Bulwark than to the Crown, whereas the Archer performs vice versa. Attacks that don't directly damage the Crown have another element to them which is height. An attack's height must be greater than the enemy Bulwark's height in order to attack the Crown; otherwise, the Bulwark takes the hit instead. 

## Bulwark

Bulwark is built much in the same way Heroes gain energy. As opposed to Diamonds and Squares, a panel showing Hammers will build Bulwark, and follows the same subtracting 2 calculation. Bulwark health and height are always equal -- that is, a Bulwark with 1 health also has 1 height. Bulwark's max health/height is 5. Another way to build Bulwark is to deploy the Engineer Hero, who grants 2 Bulwark every action. 

There are three ways to damage the Crown ignoring any Bulwark height: 

1) All assassin actions deal direct Crown damage 
2) All Mage actions include an attack of height 6, which always deals direct crown damage
3) Deploying bombs by granting a Gold rank Hero 6/6 XP.

## Game End

Each player begins with 10 Crown HP. The game ends when at least one player ends a round with 0 Crown HP. 

While there is a set order of actions after the roll is finalized, it does not matter which player reaches 0 Crown HP first within a round. 
If a round ends with both players at 0 HP, the game is considered a Tie. 

The only way to regain Crown HP is by deploying the Priest Hero, whose action heals the Crown by a set amount depending on the Priest's rank. Priests cannot heal a Crown beyond 12 HP.

## Turn Order

Once the roll is finalized, there is a set order in which the results are calculated. All stages only take place if applicable.

1) Panel XP, Level ups
2) Hammer panels added
3) Energy panels added
4) Assassin Acts
5) Priest heals + (If the second hero does not have enough energy from energy panels to act: Priest grants energy) + Action XP
6) Engineer Acts
7) Bombs
8) Rest of heroes act
9) (If the second hero had enough energy from energy panels to act: Priest grants energy)
10) Hero acts from priest energy
11) Bombs (if deployed after a priest caused hero to act and gain XP)
12) 0 HP Crown check (simultaneous)

Notes: For all stages except for the 0 HP Crown check, the player side is checked and applied first. Any time a hero acts, they immediately gain 2 XP and a level up check is performed. The square hero (left) will act before the diamond hero (right) within a given step. 
