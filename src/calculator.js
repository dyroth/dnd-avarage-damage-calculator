import random from 'random';
import round from 'round-to';

export function avgDmg(values) {

    const attackModifier = values.attackModifier;
    const damageModifier = values.damageModifier;
    const armorClass = values.armorClass;
    const damageDice = values.dice;
    const attackRolls = values.attackRolls;
    const attacks = values.attacks;

    const throwAmmount = 100000;
    let damageTotal = 0;
    let counter = 0;

    for (let i=0; i < throwAmmount; i++) {
        for (let j=1; j <= attacks; j++) {

            let attack = attackHits(attackModifier, armorClass, attackRolls);
            counter++;

            if (attack['hit']) {
                Object.entries(damageDice).forEach(([sides, amount]) => {
                    if (attack['crit']) {
                        amount *= 2;
                    }

                    for (let k=1; k <= amount ; k++) {
                        damageTotal += random.int(1, parseInt(sides)) + damageModifier;
                    }
                });
            }
        }
    }


    return round(damageTotal/throwAmmount, 0);
}

function attackHits(attackModifier, armorClass, attackRolls) {
    let attack = {};

    attack['hit']  = false;
    attack['crit'] = false;

    for (let r=1; r <= attackRolls; r++) {

        let rolledAttackRoll = random.int(1, 20);

        if (!attack['hit']) {
            attack['hit'] = rolledAttackRoll != 1 && rolledAttackRoll + attackModifier >= armorClass;
        }

        if (!attack['crit']) {
            attack['crit'] = rolledAttackRoll == 20;
        }
    }

    return attack;
}

export function hitChance (attackModifier, armorClass, attackRolls) {
    const throwAmmount = 1000000;
    let hits = 0;

    for (let i=0; i < throwAmmount; i++) {
        let attack = attackHits(attackModifier, armorClass, attackRolls);
        if (attack['hit']) {
            hits += 1;
        }
    }

    return round(hits/throwAmmount*100, 0) + "%";
}

export function critChance(rolls, critRange)
{
    const throwAmmount = 1000000;
    let successes = 0;

    for (let i=0; i < throwAmmount; i++) {

        for (let j=1; j <= rolls; j++) {
            let thrown = random.int(1, 20);

            if (thrown >= critRange) {
                successes += 1;
                break;
            }
        }
    }

    return round(((successes/throwAmmount)*100), 0) + "%";
}