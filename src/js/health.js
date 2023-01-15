export function healthPerson(person) {
    if (person.health > 50) {
        return 'healthy';
    } else if (person.health >= 15) {
        return 'wounded';
    } else {
        return 'critical';
    }
}

export function healthSortPersons(persons) {
    return persons.sort((a, b) => {
        return a.health - b.health;
    }).reverse();
}