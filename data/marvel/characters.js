export const BOSSES_LIGHT = [
    { name: "Cráneo Rojo", hp: 120, attack: 18, specialName: "Cubo Cósmico", specialDmg: 30, specialEffect: "burn", critThreshold: 16 },
    { name: "Loki", hp: 140, attack: 15, specialName: "Ilusión Traicionera", specialDmg: 20, specialEffect: "stun", critThreshold: 15 },
    { name: "Ultron", hp: 180, attack: 20, specialName: "Rayo de Vibranium", specialDmg: 40, specialEffect: "none", critThreshold: 17 },
    { name: "Hela", hp: 190, attack: 22, specialName: "Espadas de la Muerte", specialDmg: 45, specialEffect: "lifesteal", critThreshold: 14 },
    { name: "Thanos", hp: 300, attack: 30, specialName: "Chasquido", specialDmg: 60, specialEffect: "none", critThreshold: 15 }
];

export const BOSSES_DARK = [
    { name: "Capitán América", hp: 150, attack: 16, specialName: "Escudo Justiciero", specialDmg: 25, specialEffect: "stun", critThreshold: 17 },
    { name: "Iron Man", hp: 130, attack: 20, specialName: "Rayo Pectoral", specialDmg: 40, specialEffect: "burn", critThreshold: 16 },
    { name: "Thor", hp: 180, attack: 22, specialName: "Mjolnir", specialDmg: 50, specialEffect: "stun", critThreshold: 15 },
    { name: "Spider-Man", hp: 110, attack: 18, specialName: "Red Inmovilizadora", specialDmg: 15, specialEffect: "stun", critThreshold: 13 },
    { name: "Doctor Strange", hp: 120, attack: 16, specialName: "Bandas Rojas", specialDmg: 35, specialEffect: "stun", critThreshold: 14 }
];

import { DB_LIGHT, DB_DARK } from './classes.js';

export let galacticPool = [];
export function buildGalacticPool() {
    galacticPool = [];
    const extractFromDB = (db) => {
        db.forEach(c => {
            c.subclasses.forEach(sub => {
                const sp = c.specials[0];
                galacticPool.push({
                    name: sub.name, hp: sub.hp, maxHp: sub.hp, attack: sub.attack, critThreshold: sub.critThreshold,
                    specialName: sp.name, specialDmg: sp.dmg, specialEffect: sp.effect, specialCooldownMax: sp.cooldown,
                    passives: sub.passives, state: { burn: 0, stun: false, cooldown: 0 }
                });
            });
        });
    };
    extractFromDB(DB_LIGHT);
    extractFromDB(DB_DARK);
    
    const extractFromBosses = (bosses) => {
        bosses.forEach(b => {
            galacticPool.push({
                name: b.name, hp: b.hp, maxHp: b.hp, attack: b.attack, critThreshold: b.critThreshold,
                specialName: b.specialName, specialDmg: b.specialDmg, specialEffect: b.specialEffect, specialCooldownMax: 2,
                passives: [], state: { burn: 0, stun: false, cooldown: 0 }
            });
        });
    }
    extractFromBosses(BOSSES_LIGHT);
    extractFromBosses(BOSSES_DARK);
}