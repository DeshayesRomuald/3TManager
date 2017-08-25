const engine = rulesSets => (contractSpecification, data) => {
    const ruleSet = rulesSets.find(rulesSet =>
        rulesSet.contractType === contractSpecification.contractType &&
        rulesSet.version === contractSpecification.version);
        
    if (ruleSet && ruleSet.rules.length > 0) {
        // run validation
        return run(ruleSet, data);
    }

    // no rule set => valid
    return Promise.resolve();
};

const run = (ruleSet, data) =>
    new Promise((resolve) => {
        let position = 0;

        const next = (err) => {
            if (err) {
                return resolve(err);
            }

            position += 1;

            if (position === ruleSet.rules.length) {
                resolve();
                return;
            }

            executeRule(position);
        };

        const executeRule = (nextPosition) => {
            ruleSet.rules[nextPosition].apply(this, [data, next]);
        };

        executeRule(0);
    });

module.exports = engine;
