# Necromancer

Source page: [job-necromancer.html](job-necromancer.html)

Technical job · Spell User

A job that summons undead and spirits of death and casts even stronger dark spells.

1. [Warlock Base](job-warlock.md)
2. [Cabalist Expert](job-cabalist.md)
3. [⇄](job-switching.md)
4. Necromancer Technical
5. [Soul Taker Chronicle](job-soultaker.md)

## Job change

**Requirement:** MAG 30 or higher, as a Cabalist at any Job Level.

1. Go to [Master Sage's House](maps.html#map:10023000) in [Uptown](maps.html#map:10023000).
2. Talk to the **Sage Master** and choose to browse the items **on top of the shelves**.
   **Sage Master**
3. Buy a **Forbidden Book** for **100,000 G**.
4. Talk to the **Sage Master** again and choose to change your job.
5. When asked, **take off all your equipment**.
6. Choose the skills to take with you: **1 skill**, plus 1 more for every 10 Job Levels. See [Job Switching](job-switching.md).
7. You are now a Necromancer. You can switch back to Cabalist the same way.

## Skills

**Job Lv 3 Blessing Seal Active debuff · Max Lv 3**

- Attempts to prevent the target from recovering HP, MP, and SP for 4 seconds.
- Boss monsters are immune.

| Lv | MP | SP | Cast time | Cooldown | Chance | Duration |
|---|---|---|---|---|---|---|
| 1 | 16 | 6 | 2 sec | 1 sec | 40% | 4 sec |
| 2 | 20 | 6 | 2 sec | 1 sec | 50% | 4 sec |
| 3 | 24 | 6 | 2 sec | 1 sec | 60% | 4 sec |

**Job Lv 5 Necro Resurrection Passive · Max Lv 3**

- Gives a chance to automatically revive after being defeated.
- A successful Necro Resurrection revives the character with HP and applies Undead for 30 seconds.

| Lv | Auto-revive chance | HP after revive |
|---|---|---|
| 1 | 10% | 40% |
| 2 | 20% | 50% |
| 3 | 30% | 60% |

**Job Lv 7 Undead Summon Active skill · Max Lv 5**

- Summons a Mummy.
- Using the skill again can dismiss the undead summon.

| Lv | MP | Cast time | Cooldown |
|---|---|---|---|
| 1 | 20 | 1 sec | 1 sec |
| 2 | 24 | 1 sec | 1 sec |
| 3 | 28 | 1 sec | 1 sec |
| 4 | 32 | 1 sec | 1 sec |
| 5 | 36 | 1 sec | 1 sec |

**Job Lv 9 Increase Summon HP Passive · Max Lv 3**

- Increases the maximum HP of monsters created by Undead Summon .
- The bonus is applied when the summon is created.

| Lv | Summon Max HP bonus |
|---|---|
| 1 | +30% |
| 2 | +40% |
| 3 | +50% |

**Job Lv 11 Increase Summon's Magic Passive · Max Lv 3**

- Improves the magic stats of monsters created by Undead Summon .
- The bonus is applied when the summon is created.

| Lv | Min/Max M.ATK bonus | M.DEF | Additive M.DEF |
|---|---|---|---|
| 1 | +30% | +5% | +10 |
| 2 | +60% | +7% | +15 |
| 3 | +90% | +12% | +15 |

**Job Lv 13 Increase Summon's Physical Passive · Max Lv 3**

- Improves the physical attack stats of monsters created by Undead Summon .
- The summon also receives an ASPD bonus based on the level of Undead Summon used.

| Lv | Min/Max ATK bonus |
|---|---|
| 1 | +30% |
| 2 | +60% |
| 3 | +90% |

**Job Lv 15 Necro Heal Active skill · Max Lv 5**

Restores HP to monsters created by Undead Summon.

| Lv | MP | Cast time | Cooldown |
|---|---|---|---|
| 1 | 4 | 0.5 sec | 1 sec |
| 2 | 5 | 0.5 sec | 1 sec |
| 3 | 6 | 0.5 sec | 1 sec |
| 4 | 7 | 0.5 sec | 1 sec |
| 5 | 8 | 0.5 sec | 1 sec |

**Job Lv 17 Animate Dead Active · Max Lv 3**

- Marks an enemy for revival.
- If the marked monster dies while the effect is active, it revives once as a zombie instead of completing its normal death processing.
- The revived monster does not count for monster book or drop processing while it is in the revived zombie form.
- Cannot be used on a target that is already marked by Animate Dead, and cannot be used inside Knight Training.

| Lv | MP | Cast time | Cooldown | Chance | Mark duration | Revive HP |
|---|---|---|---|---|---|---|
| 1 | 20 | 1 sec | 1 sec | 95% | 50 sec | 40% Max HP |
| 2 | 26 | 1 sec | 1 sec | 95% | 50 sec | 60% Max HP |
| 3 | 32 | 1 sec | 1 sec | 95% | 50 sec | 80% Max HP |

**Job Lv 20 Necromancy Active · Max Lv 5**

- Temporarily treats the target as Undead.
- This changes how Undead-specific skills and healing/damage checks interact with the target.

| Lv | MP | Cast time | Cooldown | Chance | Duration |
|---|---|---|---|---|---|
| 1 | 16 | 3 sec | 1.4 sec | 10% | 10 sec |
| 2 | 22 | 2.75 sec | 1.7 sec | 20% | 12 sec |
| 3 | 28 | 2.5 sec | 2 sec | 30% | 14 sec |
| 4 | 34 | 2.25 sec | 2.3 sec | 40% | 16 sec |
| 5 | 40 | 2 sec | 2.6 sec | 50% | 18 sec |

**Job Lv 22 Life Absorption Active · Max Lv 5**

- Grants a 50-second self buff that can heal HP when the caster deals damage.
- Each damage event rolls the listed activation chance; if it activates, the caster recovers HP based on damage dealt, capped by the caster's Max HP.
- It removes Stamina Take, and Stamina Take removes this effect.

| Lv | MP | Cast time | Cooldown | Activation chance | HP recovery | Recovery cap |
|---|---|---|---|---|---|---|
| 1 | 20 | 2.5 sec | 1 sec | 80% | 10% of damage dealt | 10% Max HP |
| 2 | 24 | 2.5 sec | 1 sec | 70% | 20% of damage dealt | 12% Max HP |
| 3 | 28 | 2.5 sec | 1 sec | 60% | 30% of damage dealt | 16% Max HP |
| 4 | 32 | 2.5 sec | 1 sec | 50% | 40% of damage dealt | 18% Max HP |
| 5 | 36 | 2.5 sec | 1 sec | 40% | 50% of damage dealt | 20% Max HP |

**Job Lv 25 Soul Burn Active skill · Max Lv 5**

Deals damage to the target's MP.

| Lv | MP | Cast time | Cooldown | MP damage |
|---|---|---|---|---|
| 1 | 20 | 5 sec | 3 sec | 40% target Max MP |
| 2 | 28 | 4.75 sec | 3 sec | 55% target Max MP |
| 3 | 36 | 4.5 sec | 3 sec | 70% target Max MP |
| 4 | 44 | 4.25 sec | 3 sec | 85% target Max MP |
| 5 | 52 | 4 sec | 3 sec | 100% target Max MP |

**Job Lv 27 Spirit Burn Active skill · Max Lv 5**

Deals damage to the target's SP.

| Lv | MP | Cast time | Cooldown | SP damage |
|---|---|---|---|---|
| 1 | 20 | 5 sec | 3 sec | 40% target Max SP |
| 2 | 28 | 4.75 sec | 3 sec | 55% target Max SP |
| 3 | 36 | 4.5 sec | 3 sec | 70% target Max SP |
| 4 | 44 | 4.25 sec | 3 sec | 85% target Max SP |
| 5 | 52 | 4 sec | 3 sec | 100% target Max SP |

**Job Lv 30 Dark Light Active buff/debuff · Max Lv 5**

- Places a Dark Light field at the target ground position.
- The field covers a 7x7 area, reveals hiding actors in the area, removes Reflection from affected actors, and gives nearby monsters aggro toward the caster.
- While standing inside the field, actors have their final hit chance reduced by 5% per field level.
- Up to 3 Dark Light fields can exist for the caster; placing another removes the oldest one.

| Lv | MP | Cast time | Cooldown | Field duration | Hit chance reduction |
|---|---|---|---|---|---|
| 1 | 12 | 0 sec | 0 sec | 20 sec | -5% |
| 2 | 16 | 0 sec | 0 sec | 25 sec | -10% |
| 3 | 20 | 0 sec | 0 sec | 30 sec | -15% |
| 4 | 24 | 0 sec | 0 sec | 35 sec | -20% |
| 5 | 28 | 0 sec | 0 sec | 40 sec | -25% |

**Job Lv 30 Possession Cancellation Active · Max Lv 5**

- Attempts to forcibly remove possession from the target.
- On success, it cancels possession from all four possession slots: armor, necklace, left hand, and right hand.
- The skill can be reflected by reflection effects.

| Lv | MP | Cast time | Cooldown | Success chance |
|---|---|---|---|---|
| 1 | 10 | 2 sec | 1 sec | 40% |
| 2 | 14 | 2 sec | 1 sec | 50% |
| 3 | 18 | 2 sec | 1 sec | 60% |
| 4 | 22 | 2 sec | 1 sec | 70% |
| 5 | 26 | 2 sec | 1 sec | 80% |

**Job Lv 31 Follow Up Passive · Max Lv 5**

Increases physical damage dealt to targets that currently have an abnormal status.

| Lv | Damage bonus vs abnormal-status target |
|---|---|
| 1 | +12% |
| 2 | +14% |
| 3 | +16% |
| 4 | +18% |
| 5 | +20% |

**Job Lv 33 Black Flare Active · Max Lv 3**

- Deals Dark magical damage to one target.
- If the hit deals damage and the target is not a boss, it can inflict Flare for 20 seconds.
- Flare deals damage every 2 seconds based on the target's Max HP, capped at 300 damage per tick, and cannot reduce the target below 1 HP by itself.

| Lv | MP | Cast time | Cooldown | Damage rate | Flare chance | Flare damage per tick |
|---|---|---|---|---|---|---|
| 1 | 25 | 1 sec | 1 sec | 500% | 15% | 0.9% Max HP, cap 300 |
| 2 | 36 | 1.3 sec | 1 sec | 650% | 25% | 1.2% Max HP, cap 300 |
| 3 | 45 | 1.6 sec | 1 sec | 800% | 35% | 1.5% Max HP, cap 300 |

**Job Lv 35 Terror Active · Max Lv 5**

- Attempts to inflict Fear and Immobilize on the target and nearby enemies in a 3x3 area.
- Affected targets cannot move or perform normal attacks while the effect lasts.
- On player targets that are not currently possessing another target, the effect also forces their AI target toward the caster for the duration.
- The skill adds monster aggro on affected monsters and can be reflected by reflection effects.

| Lv | MP | Cast time | Cooldown | Chance | Duration |
|---|---|---|---|---|---|
| 1 | 22 | 1 sec | 1 sec | 25% | 3 sec |
| 2 | 24 | 1.5 sec | 1.15 sec | 30% | 4 sec |
| 3 | 26 | 2 sec | 1.3 sec | 35% | 5 sec |
| 4 | 28 | 2.5 sec | 1.45 sec | 40% | 6 sec |
| 5 | 30 | 3 sec | 1.6 sec | 45% | 7 sec |

**Job Lv 40 Evil Soul Active · Max Lv 5**

- Increases the caster's Dark-element damage while active.
- Magical Dark damage is increased by the listed rate.
- Physical Dark damage is increased only for supported Dark physical skills such as Soul Steal, Shadow Blade, Dark Sliver, Dark Tide, and Light of Darkness when its active level is Dark-element.

| Lv | MP | Cast time | Cooldown | Duration | Dark damage bonus |
|---|---|---|---|---|---|
| 1 | 20 | 4 sec | 0.5 sec | 20 sec | +20% |
| 2 | 25 | 4.5 sec | 0.5 sec | 30 sec | +40% |
| 3 | 30 | 5 sec | 0.5 sec | 40 sec | +60% |
| 4 | 35 | 5.5 sec | 0.5 sec | 50 sec | +80% |
| 5 | 40 | 6 sec | 0.5 sec | 60 sec | +100% |

**Job Lv 42 Evaporate Active skill · Max Lv 5**

- Attempts to instantly defeat a non-boss target.
- Success chance is 10% + 10% x Lv normally, but 5% + 4% x Lv against PvP targets.

| Lv | MP | Cast time | Cooldown |
|---|---|---|---|
| 1 | 35 | 4 sec | 6 sec |
| 2 | 40 | 4.5 sec | 5.5 sec |
| 3 | 45 | 5 sec | 5 sec |
| 4 | 50 | 5.5 sec | 4.5 sec |
| 5 | 55 | 6 sec | 4 sec |

**Job Lv 44 Summon Shinigami Active skill · Max Lv 5**

- Summons a temporary Shinigami partner for 6 seconds and orders it to use a level-based attack on the selected target.
- At Lv 1 it appears near the caster; at Lv 2 and above it appears near the target.
- The summoned partner is removed after its attack finishes or when its duration ends.

| Lv | MP | Cast time | Cooldown | Summon attack |
|---|---|---|---|---|
| 1 | 40 | 1.7 sec | 1 sec | Single target, 3 physical hits at 100% each |
| 2 | 44 | 1.9 sec | 1 sec | 3x3 physical attack, 400% |
| 3 | 48 | 2.1 sec | 1 sec | 3x3 Dark magical attack, 500% |
| 4 | 52 | 2.3 sec | 1 sec | 5x5 Neutral magical attack, 600%, 70% chance to Stun for 3 sec |
| 5 | 56 | 2.5 sec | 1 sec | 7x7 Dark magical attack, 700% |

**Job Lv 50 Chaos Gate Active magic/field skill · Max Lv 5**

- Creates a Dark magic damage field on the target.
- The field attacks valid enemies in a 5x5 area every 0.5 seconds after the first 1 second delay.
- The field cannot be placed on top of another active ground skill in the same area.

| Lv | MP | Cast time | Cooldown | Hits | Damage rate per hit |
|---|---|---|---|---|---|
| 1 | 43 | 5 sec | 2.5 sec | 6 | 60% |
| 2 | 48 | 5.5 sec | 2.5 sec | 7 | 110% |
| 3 | 53 | 6 sec | 2.5 sec | 8 | 160% |
| 4 | 58 | 6.5 sec | 2.5 sec | 9 | 210% |
| 5 | 63 | 7 sec | 2.5 sec | 10 | 260% |

## Equipment

### Weapons

**Staff** 26 items **Hammer** 25 items **Shield** 23 items **Short Sword** 16 items

### Armor

**All armor for Necromancer** 879 items

### Job outfits

#### Cabalist set

Lv 45

##### Male

- [Cabalist Hat](equipment.html#item:50026300)
- [Cabalist Suit(M)](equipment.html#item:50009400)

##### Female

- [Cabalist Hat](equipment.html#item:50026300)
- [Cabalist Suit(F)](equipment.html#item:50008300)
- [Cabalist Boots(F)](equipment.html#item:50064000)

##### How to get

- All pieces from [Fallen Titania](shops.html#npc:11000399), a reward of the [Lv 45 Armor Quest](quest-lv45-armor.md)

#### Evil Nurse set

Lv 65

##### Male

- [Evil Nurse Hat](equipment.html#item:50026350)
- [Wonder Suit(M)](equipment.html#item:50009450)

##### Female

- [Evil Nurse Hat](equipment.html#item:50026350)
- [Evil Nurse Uniform(F)](equipment.html#item:50008350)
- [Nurse Shoes(F)](equipment.html#item:50064050)

##### How to get

- All pieces come from the [Lv 65 Armor Quest](quest-lv65-armor.md)
   - One piece per **Queen Key**

#### Spider set

Lv 75

##### Male

- [Spider Hat](equipment.html#item:50039000)
- [Spider Coat(M)](equipment.html#item:60103100)
- [Spider Boots(M)](equipment.html#item:50067100)

##### Female

- [Hair Cover of Dead](equipment.html#item:50038900)
- [Shadow Robe(M)](equipment.html#item:60103200)

##### How to get

- All pieces from [Princess Chunsoon](shops.html#npc:11000260), a reward of the [Lv 75 Armor Quest](quest-lv75-armor.md)

#### Teller set

Lv 85

##### Male

- [Teller Robe(M)](equipment.html#item:60103150)
- [Teller Boots(M)](equipment.html#item:50067150)

##### Female

- [Teller Robe(F)](equipment.html#item:60103250)

##### How to get

- [Teller Robe(M)](equipment.html#item:60103150) and [Teller Robe(F)](equipment.html#item:60103250)
   - From the [Lv 85 Armor Quest](quest-lv85-armor.md)
- [Teller Boots(M)](equipment.html#item:50067150)
   - From [Apprentice Blacksmith Arus](shops.html#npc:11000510), a reward of the [Lv 85 Armor Quest](quest-lv85-armor.md)
