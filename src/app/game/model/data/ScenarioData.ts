import { Editional } from "../Editional";
import { LootDeckConfig } from "../Loot";
import { Spoilable } from "../Spoilable";
import { ObjectiveData } from "./ObjectiveData";
import { RoomData } from "./RoomData";
import { ScenarioRule } from "./ScenarioRule";

export class ScenarioData implements Editional, Spoilable {

  name: string;
  index: string;
  unlocks: string[];
  blocks: string[];
  requires: string[][];
  links: string[];
  forcedLinks: string[];
  group: string | undefined;
  monsters: string[];
  allies: string[];
  drawExtra: string[];
  objectives: ObjectiveData[];
  rooms: RoomData[] = [];
  marker: string = "";
  rules: ScenarioRule[];
  initial: boolean = false;
  allyDeck: boolean = false;
  solo: string | undefined;
  lootDeckConfig: LootDeckConfig = {};
  parent: string | undefined;
  parentSections: string[] = [];
  blockedSections: string[] = [];
  resetRound: "visible" | "hidden" | undefined;

  // from Editional
  edition: string;

  // from Spoilable
  spoiler: boolean;

  constructor(name: string, index: string, unlocks: string[], blocks: string[], requires: string[][], links: string[], forcedLinks: string[], monsters: string[], allies: string[], drawExtra: string[], objectives: ObjectiveData[], rooms: RoomData[], marker: string, rules: ScenarioRule[], edition: string, group: string | undefined = undefined,
    spoiler: boolean = false, allyDeck: boolean = false) {
    this.name = name;
    this.index = index;
    this.unlocks = unlocks;
    this.blocks = blocks;
    this.requires = requires;
    this.links = links;
    this.forcedLinks = forcedLinks;
    this.monsters = monsters;
    this.allies = allies;
    this.drawExtra = drawExtra;
    this.edition = edition;
    this.objectives = objectives;
    this.rooms = rooms || [];
    this.marker = marker || "";
    this.rules = rules;
    this.group = group;
    this.spoiler = spoiler;
    this.allyDeck = allyDeck;
  }
}