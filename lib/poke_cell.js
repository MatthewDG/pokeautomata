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
  "DRAGON"
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
  "NONE" : "#fff"
}

//type match-ups
const immuneFrom = {
  "NORMAL" : ["GHOST"],
  "FLYING" : ["GROUND"],
  "GROUND" : ["ELCTRIC"],
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
  "DRAGON" : []
}

const halfDamageTo = {
  "NORMAL" : ["ROCK"],
  "FIGHT" : ["FLYING", "POISON", "BUG", "PSYCHIC"],
  "FLYING" : ["ROCK", "ELECTRIC"],
  "POISON" : ["POISON", "GROUND", "ROCK", "GHOST"],
  "GROUND" : ["BUG", "GRASS"],
  "ROCK" : ["FIGHT", "GROUND"],
  "BUG" : ["FIGHT", "FLYING", "GHOST", "FIRE"],
  "GHOST" : [],
  "FIRE" : ["ROCK", "FIRE", "WATER", "DRAGON"],
  "WATER" : ["WATER", "GRASS", "DRAGON"],
  "GRASS" : ["FLYING", "POISON", "BUG", "FIRE", "GRASS", "DRAGON"],
  "ELECTRIC" : ["GRASS", "ELECTRIC", "DRAGON"],
  "PSYCHIC" : ["PSYCHIC"],
  "ICE" : ["WATER", "ICE"],
  "DRAGON" : []
}

const doubleDamageTo = {
  "NORMAL" : [],
  "FIGHT" : ["NORMAL", "ROCK", "ICE"],
  "FLYING" : ["FIGHT", "BUG", "GRASS"],
  "POISON" : ["BUG", "GRASS"],
  "GROUND" : ["POISON", "ROCK", "FIRE", "ELECTRIC"],
  "ROCK" : ["FLYING", "BUG", "FIRE", "ICE"],
  "BUG" : ["POISON", "GRASS", "PSYCHIC"],
  "GHOST" : ["GHOST"],
  "FIRE" : ["BUG", "GRASS", "ICE"],
  "WATER" : ["GROUND", "ROCK", "FIRE"],
  "GRASS" : ["GROUND", "ROCK", "WATER"],
  "ELECTRIC" : ["FLYING", "WATER"],
  "PSYCHIC" : ["FIGHT", "POISON"],
  "ICE" : ["FLYING", "GROUND", "GRASS", "DRAGON"],
  "DRAGON" : ["DRAGON"]
}

const defaultDamageStandings = {
  "NORMAL" : 0,
  "FIGHT" : 0,
  "FLYING" : 0,
  "POISON" : 0,
  "GROUND" : 0,
  "ROCK" : 0,
  "BUG" : 0,
  "GHOST" : 0,
  "FIRE" : 0,
  "WATER" : 0,
  "GRASS" : 0,
  "ELECTRIC" : 0,
  "PSYCHIC" : 0,
  "ICE" : 0,
  "DRAGON" : 0
}

export default class pokeCell{

  constructor(type = types[Math.floor(Math.random() * types.length)]){
    this.HP = 20;
    this.type = type;
    this.color = pokePalette[this.type];

    this.damageFromType = Object.assign({}, defaultDamageStandings);

  }

  battleNeighbors(neighbors){
    debugger
    neighbors.forEach( (attacker) => {
      let damage = this.calculateDamage(this, attacker);
      this.HP -= damage;
      this.damageFromType[attacker.type] += damage

      if(this.HP <= 0){

        this.HP = 20;
        this.type = Object.keys(this.damageFromType)
        .sort((a, b) => {return this.damageFromType[b] - this.damageFromType[a]})[0]
        
        this.color = pokePalette[attacker.type]
        this.damageFromType = Object.assign({}, defaultDamageStandings);
      }

    })
  }

  calculateDamage(defender, attacker){
    if(immuneFrom[defender.type].includes(attacker.type)){
      return 0
    }

    if(halfDamageTo[attacker.type].includes(defender.type)){
      defender.damageFromType[attacker.type] += 0.5;
      return 0.5;
    }

    if(doubleDamageTo[attacker.type].includes(defender.type)){
      defender.damageFromType[attacker.type] += 0.5;
      return 2;
    }

    return 1;
  }

}
