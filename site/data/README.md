# ECO Archive data files

Unofficial wiki for Emil Chronicle Online (ECO).

Each file is a JSON array, one object per line. Ids are stable `kind:number` strings and are the same ids the pages use as anchors, so `refs` and id fields point across files (`item:` -> items.json, `monster:` -> monsters.json, `map:` -> maps.json, `npc:` -> npcs.json, `skill:` -> skills.json, `job:` -> jobs.json, `recipe:` -> crafting.html#recipe:N, `iris:` -> iris-cards.json, `vector:` -> ability-vectors.json, `chip:` -> demic-chips.json, `page:x` -> x.html). Image paths are relative to the site root.

Files built from the list pages (equipment, crafting recipes, materials, partners, stamps, fishing, iris cards, ability vectors, marionettes, DEMIC chips, dual jobs, shops) share one shape: `id`, `name`, optional `subtitle`, `filters` (the page's filter values), `images`, `sections` (each detail section of the entry: label -> value, a list, or table rows), `refs` (ids linked from each section) and `page` (the page URL with anchor).

## ability-vectors.json

Iris card ability vectors.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections hold the effect per level and the cards that carry the vector.

## boxes.json

Boxes and their contents.

Fields: id (box item id), name, family, tiers (tier name + items with id, name, qty), how_to_get, page.

## crafting-recipes.json

Craftable items and their recipes from Craftable Items.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections hold the recipe (materials, skill, success) per craftable item.

## demic-chips.json

DEMIC chips.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections hold chip type, code, stats, skill (linked to skill ids) and how to get.

## dual-jobs.json

Dual job systems.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections hold the jobs and skills of each system.

## equipment.json

Weapons and armor from the Weapons & Armor page.

Fields: id, name, subtitle, filters, images, sections, refs, page. filters hold level (lv), type, jobs, race, gender and attack values (atk); sections hold stats and how to get. Full equip stats are in items.json under the same id.

## fishing.json

Fishing catches.

Fields: id, name, subtitle, filters, images, sections, refs, page.

## iris-cards.json

Iris cards.

Fields: id, name, subtitle, filters, images, sections, refs, page. filters hold slot, rarity (rar), vector (vec), series and card number (no); sections hold card info and ability vector points per rank.

## items.json

Every item in the game data.

Fields: id (`item:N`), name, type, price, weight, description; equip (req_lv, rebirth, races, genders, jobs, stats, elements, req_stats, two_handed, durability, iris_slots) for gear; partner_id for partner items.

## jobs.json

Every job.

Fields: id (`job:slug`), name, series, tier, parent, next, switch_with (job ids), page, skills (id, name, job_lv, max_lv).

## maps.json

Every map.

Fields: id (`map:N`), name, world, kind, area, region, level, map_ids (all client ids for the map), size, monsters (ids), npcs (id, name, x, y), minimap, page.

## marionettes.json

Marionettes and golems.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections hold stats, traits, skill, golem and how to get.

## materials.json

Crafting materials from Crafting Materials.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections list what each material is used for and where to get it.

## monsters.json

Every monster.

Fields: id (`monster:N`), name, group, boss, level, exp, job_exp, elements, drops (item id + name), stamp (item id), maps (map ids), size, where_to_find, images, page.

## npcs.json

Every NPC in the client data.

Fields: id (`npc:N`), name, name_jp, map (map id), map_name, x, y.

## partners.json

Partners.

Fields: id, name, subtitle, filters, images, sections, refs, page. ids are the partner item ids (`item:N`).

## quests.json

Quest counter quests from the client data.

Fields: id (`quest:N`), name, type, minutes (time limit), min_lv, max_lv, job, race, gender, quest_points, reward (item id, name, qty). Story and job quests have their own pages.

## shops.json

Shops and merchants.

Fields: id, name, subtitle, filters, images, sections, refs, page. ids are `npc:N`; sections list the goods and place.

## skills.json

Every job skill.

Fields: id (`skill:N`), name, name_jp, type, target, range, max_lv, description, levels (tables: header + rows per level), jobs (job id, job_lv).

## stamps.json

Stamps.

Fields: id, name, subtitle, filters, images, sections, refs, page. sections list the monsters that drop each stamp.
