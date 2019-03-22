import random from 'random';
import round from 'round-to';

export function avgDmg(values) {

    const attackModifier = values.attackModifier;
    const damageModifier = values.damageModifier;
    const armorClass = values.armorClass;
    const damageDice = values.dice;
    const attackRolls = values.attackRolls;
    const attacks = values.attacks;
    const critRange = values.critRange;

    const throwAmount = 500000;
    let damageTotal = 0;

    for (let i=0; i < throwAmount; i++) {
        for (let j=1; j <= attacks; j++) {

            let attack = attackHits(attackModifier, armorClass, attackRolls, critRange);

            if (attack['hit']) {
                Object.entries(damageDice).forEach(([sides, amount]) => {
                    if (attack['crit']) {
                        amount *= 2;
                    }

                    for (let k=1; k <= amount ; k++) {
                        damageTotal += random.int(1, parseInt(sides));
                    }

                });

                damageTotal += damageModifier;
            }
        }
    }


    return round(damageTotal/throwAmount, 0);
}

function attackHits(attackModifier, armorClass, attackRolls, critRange) {
    let attack = [];

    attack['hit']  = false;
    attack['crit'] = false;

    if (attackRolls !== 0) {
        for (let r=1; r <= attackRolls; r++) {

            let rolledAttackRoll = random.int(1, 20);

            if (!attack['hit']) {
                attack['hit'] = rolledAttackRoll !== 1 && rolledAttackRoll + attackModifier >= armorClass;
            }

            if (!attack['crit']) {
                attack['crit'] = rolledAttackRoll >= critRange;
            }
        }
    } else {
        //Disatvantage
        let rolledAttackRolls = [];
        rolledAttackRolls[0] = random.int(1, 20);
        rolledAttackRolls[1] = random.int(1, 20);

        const roll = Array.min(rolledAttackRolls);
        attack['hit'] = roll !== 1 && roll + attackModifier >= armorClass;
        attack['crit'] = roll >= critRange;

        if (attack['crit']) {
            console.log('crit!');
        }
    }

    //Crits always hit
    if (attack['crit']) {
        attack['hit'] = true;
    }

    return attack;
}

export function hitChance (attackModifier, armorClass, attackRolls, critRange) {
    const throwAmmount = 1000000;
    let hits = 0;

    for (let i=0; i < throwAmmount; i++) {
        let attack = attackHits(attackModifier, armorClass, attackRolls, critRange);
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

Array.min = function( array ){
    return Math.min.apply( Math, array );
};