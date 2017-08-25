const test = require('tape');
const sinon = require('sinon');

const rulesEngine = require('../../utils/rulesEngine');

const createContractSpecification = (contractType = 'car', version = 1) => {
    return {
        contractType,
        version,
        findCarById: (arg) => { }
    };
};

const createRule = (nextSpy, error = null) => {
    return (data, next) => {
        console.log('next');
        nextSpy();
        next(error);
    };
};

const creatRulesSet = (rules, contractType = 'car', version = 1) => {
    return {
        version,
        contractType,
        rules: rules
    };
}

test('Should run rules engine', t => {
    let next1 = sinon.spy();
    let next2 = sinon.spy();

    let rule1 = createRule(next1);
    let rule2 = createRule(next2);

    let rulesSet = creatRulesSet([rule1, rule2]);
    let contractSpecification = createContractSpecification();

    const rulesEngineInstance = rulesEngine([rulesSet]);

    rulesEngineInstance(contractSpecification, {})
        .then(() => {
            t.assert(next1.calledOnce);
            t.assert(next2.calledOnce);
            t.end()
        });

    ;
});

test('Should not fails if no rules found', t => {

    let rulesSet = creatRulesSet([]);
    let contractSpecification = createContractSpecification();

    const rulesEngineInstance = rulesEngine([rulesSet]);

    rulesEngineInstance(contractSpecification, {})
        .then(() => {
            t.end()
        });
});

test('Should stop engine on first error', t => {
    let next1 = sinon.spy();
    let next2 = sinon.spy();

    let rule1 = createRule(next1, 'error in rule engine');
    let rule2 = createRule(next2);

    let rulesSet = creatRulesSet([rule1, rule2]);
    let contractSpecification = createContractSpecification();

    const rulesEngineInstance = rulesEngine([rulesSet]);

    rulesEngineInstance(contractSpecification, {})
        .then(() => {
            t.assert(next1.calledOnce);
            t.assert(!next2.calledOnce);
            t.end()
        });

    ;
});