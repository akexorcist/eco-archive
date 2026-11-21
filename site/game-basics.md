# Game Basics

Source page: [game-basics.html](game-basics.html)

## Character

### Status

Your character has six status values: **STR**, **DEX**, **INT**, **VIT**, **AGI** and **MAG**. You raise them with [status points](stat-points.md) from leveling up.

| Status | Raises |
|---|---|
| STR | ATK Max Payload |
| DEX | ATK MDEF Short Range Accuracy Cooldown Speed Max Capacity Shield block rate Status effect resistance |
| INT | MATK MDEF Max SP Long Range Accuracy Long Range Dodge Max Capacity Status effect resistance |
| VIT | Max HP Max SP DEF MDEF Long Range Accuracy Max Payload |
| AGI | ATK Speed Short Range Dodge Long Range Dodge |
| MAG | MATK Max MP |

### Status bonuses

Some values get an extra bonus each time a status reaches a multiple of a number. Status from your job counts toward these steps.

| Status | Bonus steps |
|---|---|
| STR | Maximum ATK every 5 STR Minimum ATK every 9 STR |
| DEX | Short Range Accuracy every 10 DEX Cooldown Speed every 9 DEX |
| INT | Long Range Accuracy every 10 INT |
| VIT | Max HP every 5 VIT DEF +1 every 3 VIT and +2 more every 9 VIT |
| AGI | Short Range Dodge and ATK Speed every 9 AGI |
| MAG | Maximum MATK every 6 MAG (7, 13, 19, 25, …) Minimum MATK every 8 MAG (7, 15, 23, 31, …) |

### Status points

- Each level-up gives **3** status points at first, then **1 more** every 3 levels. For the level you reach, you get: points = ⌊(new level − 1) ÷ 3⌋ + 3
- You can raise each status to **100** with points. The number after the **+** is a bonus from equipment or your job. For example, 90+18 means 108 in total.

### Skill points

Learning a new skill costs **3** skill points.

### Resetting status and skills

Talk to the **Sorcerer's Subordinate** in the [Sorcerer Master Room](maps.html#map:10065000), [Northern Promenade](maps.html#map:10065000).

**Sorcerer's Subordinate**

- Your **first** status reset and **first** skill reset are free.
- After that, each reset costs: gold = 1,000 × your level At level 17 it costs 17,000 gold.

### Payload and capacity

Everything you carry counts against two limits:

| Limit | What it measures | Raised by |
|---|---|---|
| **Max Payload** | the total **weight** of your items | STR, VIT |
| **Max Capacity** | the total **volume** (space) of your items | DEX, INT |

- Some items take less space when you wear them. For example, [Leather Armor](equipment.html#item:60000000) takes half the space when equipped compared with carrying it.
- Bags and backpacks raise both limits.

**When you go over either limit:**

- You **can't move**. Drop, trade or store items until you're under the limit.
- You **can't pick up** items.
- Merchants **won't sell** to you, including when the purchase itself would put you over.
- You **can't set up a golem**.
- You **can't possess** another player, and no one can possess you, while over capacity.

### Storage

- Store items with any **Guild Merchant**, for example the [Guild Merchant](maps.html#map:10023000) in [Uptown](maps.html#map:10023000). Some charge a fee.
- Storage holds up to **300 kinds** of items.
- Every character on your account on the same server shares it.

## Party

- A party holds up to **8 members**.
- The party EXP bonus grows with the number of members who attacked.
- Members far away, on another map or logged out get no EXP.
- The party stays when members log out.

## Combat

### Damage and DEF

The status window shows DEF as two numbers: **% DEF** and **Add DEF**. MDEF works the same way.

Physical damage works out as:

physical damage = (ATK − Add DEF) × (1 − % DEF ÷ 100) − ⌊VIT ÷ 3⌋

- Skills multiply ATK by their % first, then DEF is applied.
- VIT adds DEF: DEF from VIT = ⌊VIT ÷ 3⌋ + ⌊VIT ÷ 9⌋ × 2 VIT 100 gives about 55 DEF.

### Elements

There are seven elements: **Neutral**, **Fire**, **Water**, **Wind**, **Earth**, **Light** and **Darkness**.

Each arrow points from an element to the one it is strong against. Light and Darkness sit outside the cycle of the four elements.

Damage you deal, as a % of normal, against a target with element strength 100 (approximate):

| Attack ↓ Target → | Fire | Water | Wind | Earth | Light | Darkness |
|---|---|---|---|---|---|---|
| Fire | 0% | 167% | 50% | 100% | 133% | 67% |
| Water | 50% | 0% | 100% | 167% | 133% | 67% |
| Wind | 167% | 100% | 0% | 50% | 133% | 67% |
| Earth | 100% | 50% | 167% | 0% | 133% | 67% |
| Light | 50% | 50% | 50% | 50% | 0% | 167% |
| Darkness | 150% | 150% | 150% | 150% | 50% | 0% |

The effect grows with the target's element strength: at strength 50 the difference from 100% is halved. Neutral attacks and Neutral targets: 100%.

### Status effects

The status effects are **Poison**, **Stone**, **Sleep**, **Silence**, **Slow**, **Confusion**, **Freeze** and **Stun**.

- **DEX** and **INT** help you resist them.
- **Poison** keeps draining your HP.
- **Freeze** turns you into the Water element and **Stone** into the Earth element. An attack of the element strong against it does more damage, but the effect ends at once.
- Your HP also drops by itself in very cold or very hot places and underwater.

### Monster behavior

Each monster has one or more of these behaviors.

| Behavior | What it does |
|---|---|
| Non-active | Only fights back after you attack it. |
| Active | Attacks you first when it sees you. |
| Link | Joins the fight when it sees another monster being attacked. |
| Reacts to casting | Attacks anyone nearby who uses a skill: attack skills, magic, even lighting a campfire. |
| Reacts to healing | Attacks anyone nearby who uses healing. |
| Runs away | Runs away when it sees you. |
