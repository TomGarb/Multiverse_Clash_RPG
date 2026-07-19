export const LOOT_POOL = [
    { name: "Espada de Plasma", effect: "Aumenta +5 de Ataque.", apply: (p) => p.attack += 5 },
    { name: "Collar de Vida", effect: "Aumenta +50 HP Máximo y te cura.", apply: (p) => { p.maxHp += 50; p.hp += 50; } },
    { name: "Poción de Sanguijuela", effect: "Tus ataques especiales roban vida.", apply: (p) => p.specialEffect = "lifesteal" },
    { name: "Armadura Pesada", effect: "Reduce el daño recibido un 25%.", apply: (p) => p.passives.push("heavy_armor") },
    { name: "Mira Telescópica", effect: "Mejora probabilidad de crítico (+1).", apply: (p) => p.critThreshold = Math.max(2, p.critThreshold - 1) },
    { name: "Botiquín Médico", effect: "Restaura instantáneamente 100 HP.", apply: (p) => p.hp = Math.min(p.maxHp, p.hp + 100) },
    { name: "Batería de Sobrecarga", effect: "Aumenta +20 Daño Especial.", apply: (p) => p.specialDmg += 20 },
    { name: "Lente Letal", effect: "Tus críticos hacen el triple de daño (x3).", apply: (p) => p.passives.push("crit_multiplier_3") },
    { name: "Escudo Reforzado", effect: "La acción Defender cura un 40%.", apply: (p) => p.passives.push("heal_multiplier_40") },
    { name: "Pacto de Sangre", effect: "Gasta 10% de HP para potenciar Especiales.", apply: (p) => p.passives.push("sacrifice_hp") }
];

export function generateLootChoices() {
    return [...LOOT_POOL].sort(() => 0.5 - Math.random()).slice(0, 3);
}
