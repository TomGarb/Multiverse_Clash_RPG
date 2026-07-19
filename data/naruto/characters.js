export const BOSSES_LIGHT = [
    { name: "Zabuza", hp: 120, attack: 18, specialName: "Corte de Agua", specialDmg: 30, specialEffect: "none", critThreshold: 16 },
    { name: "Sasori", hp: 140, attack: 16, specialName: "Agujas Envenenadas", specialDmg: 20, specialEffect: "burn", critThreshold: 15 },
    { name: "Pain", hp: 180, attack: 22, specialName: "Shinra Tensei", specialDmg: 45, specialEffect: "stun", critThreshold: 17 },
    { name: "Madara", hp: 220, attack: 25, specialName: "Meteorito", specialDmg: 55, specialEffect: "none", critThreshold: 14 },
    { name: "Kaguya", hp: 350, attack: 30, specialName: "Expansión de la Verdad", specialDmg: 70, specialEffect: "lifesteal", critThreshold: 15 }
];

export const BOSSES_DARK = [
    { name: "Naruto", hp: 160, attack: 20, specialName: "Rasengan", specialDmg: 40, specialEffect: "none", critThreshold: 15 },
    { name: "Sasuke", hp: 140, attack: 22, specialName: "Chidori", specialDmg: 45, specialEffect: "stun", critThreshold: 13 },
    { name: "Sakura", hp: 180, attack: 18, specialName: "Fuerza Centenaria", specialDmg: 35, specialEffect: "none", critThreshold: 16 },
    { name: "Kakashi", hp: 130, attack: 19, specialName: "Raikiri", specialDmg: 40, specialEffect: "stun", critThreshold: 14 },
    { name: "Jiraiya", hp: 170, attack: 21, specialName: "Rasengan Gigante", specialDmg: 50, specialEffect: "burn", critThreshold: 16 }
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