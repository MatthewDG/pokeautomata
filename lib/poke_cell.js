//types
const types = ([
  "NORMAL",
  "FIGHT",
  "FLYING",
  "POISON",
  "GROUND",
  "ROCK",
  "BUG",
  "GHOST",
  "FIRE",
  "WATER",
  "GRASS",
  "ELECTRIC",
  "PSYCHIC",
  "ICE",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY"
]);

//cell colors
const pokePalette = {
  "NORMAL": "#a9a978",
  "FIGHT" : "#c03028",
  "FLYING" : "#a890f0",
  "POISON" : "#a040a0",
  "GROUND" : "#e0c068",
  "ROCK" : "#b8a038",
  "BUG" : "#a8b820",
  "GHOST" : "#6f5796",
  "FIRE" : "#f08030",
  "WATER" : "#6890f0",
  "GRASS" : "#76c74e",
  "ELECTRIC" : "#f8ce2a",
  "PSYCHIC" : "#f85888",
  "ICE" : "#97d7d8",
  "DRAGON" : "#6e36f8",
  "STEEL" : "#b8b8d0",
  "DARK" : "#705848",
  "FAIRY" : "#ff65d5",
  "NONE" : "#000"
}

//type match-ups
const immuneFrom = {
  "NORMAL" : ["GHOST"],
  "FLYING" : ["GROUND"],
  "GROUND" : ["ELECTRIC"],
  "PSYCHIC" : ["GHOST"],
  "GHOST" : ["NORMAL", "FIGHT"],
  "FIGHT" : [],
  "POISON" : [],
  "ROCK" : [],
  "BUG" : [],
  "FIRE" : [],
  "WATER" : [],
  "GRASS" : [],
  "ELECTRIC" : [],
  "ICE" : [],
  "DRAGON" : [],
  "DARK" : ["PSYCHIC"],
  "STEEL" : ["POISON"],
  "FAIRY" : ["DRAGON"],
  "NONE" : []
}

const halfDamageTo = {
  "NORMAL" : ["ROCK", "STEEL"],
  "FIGHT" : ["FLYING", "POISON", "BUG", "PSYCHIC", "FAIRY"],
  "FLYING" : ["ROCK", "ELECTRIC", "STEEL"],
  "POISON" : ["POISON", "GROUND", "ROCK", "GHOST"],
  "GROUND" : ["BUG", "GRASS"],
  "ROCK" : ["FIGHT", "GROUND", "STEEL"],
  "BUG" : ["FIGHT", "FLYING", "GHOST", "FIRE", "STEEL", "FAIRY"],
  "GHOST" : ["DARK"],
  "FIRE" : ["ROCK", "FIRE", "WATER", "DRAGON"],
  "WATER" : ["WATER", "GRASS", "DRAGON"],
  "GRASS" : ["FLYING", "POISON", "BUG", "FIRE", "GRASS", "DRAGON"],
  "ELECTRIC" : ["GRASS", "ELECTRIC", "DRAGON"],
  "PSYCHIC" : ["PSYCHIC", "STEEL"],
  "ICE" : ["WATER", "ICE", "STEEL"],
  "DRAGON" : ["STEEL"],
  "DARK" : ["FIGHT", "DARK", "FAIRY"],
  "STEEL" : ["STEEL", "FIRE", "WATER", "ELECTRIC"],
  "FAIRY" : ["POISON", "STEEL", "FIRE"],
  "NONE" : []
}

const doubleDamageTo = {
  "NORMAL" : [],
  "FIGHT" : ["NORMAL", "ROCK", "ICE", "STEEL", "DARK"],
  "FLYING" : ["FIGHT", "BUG", "GRASS"],
  "POISON" : ["BUG", "GRASS", "FAIRY"],
  "GROUND" : ["POISON", "ROCK", "FIRE", "ELECTRIC", "STEEL"],
  "ROCK" : ["FLYING", "BUG", "FIRE", "ICE"],
  "BUG" : ["POISON", "GRASS", "PSYCHIC", "DARK"],
  "GHOST" : ["GHOST"],
  "FIRE" : ["BUG", "GRASS", "ICE", "STEEL"],
  "WATER" : ["GROUND", "ROCK", "FIRE"],
  "GRASS" : ["GROUND", "ROCK", "WATER"],
  "ELECTRIC" : ["FLYING", "WATER"],
  "PSYCHIC" : ["FIGHT", "POISON"],
  "ICE" : ["FLYING", "GROUND", "GRASS", "DRAGON"],
  "DRAGON" : ["DRAGON"],
  "DARK" : ["GHOST", "PSYCHIC"],
  "STEEL" : ["ROCK", "ICE", "FAIRY"] ,
  "FAIRY" : ["FIGHT", "DRAGON", "DARK"],
  "NONE" : []
}


export default class pokeCell{

  constructor(type = types[Math.floor(Math.random() * types.length)]){
    this.HP = 20;
    this.type = type;
    this.color = pokePalette[this.type];
  }

  battleNeighbors(neighbors){

    neighbors.forEach( (attacker) => {
      let damage = this.calculateDamage(this, attacker);
      this.HP -= damage;


      if(this.HP <= 0){

        this.HP = 20;
        this.type = attacker.type;
        this.color = pokePalette[attacker.type]
      }

    })
  }

  calculateDamage(defender, attacker){
    if(immuneFrom[defender.type].includes(attacker.type) || attacker.type === "NONE"){
      return 0
    }

    if(halfDamageTo[attacker.type].includes(defender.type)){
      return 0.5;
    }

    if(doubleDamageTo[attacker.type].includes(defender.type)){
      return 2;
    }

    return 1;
  }

}
