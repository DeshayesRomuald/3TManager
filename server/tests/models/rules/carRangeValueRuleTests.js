const test = require('tape');
const sinon = require('sinon');

const carRangeValueRule = require('../../../models/rules/rules/carRangeValueRule');

test('Should call next function if between range', (t) => {
    const rule = carRangeValueRule(1000, 2000);
    const nextSpy = sinon.spy();

    rule({ value: 1500 }, nextSpy);
    t.assert(nextSpy.calledOnce, 'Should only call one time the next function');
    t.assert(nextSpy.firstCall.args.length === 0, 'Should not receive an error message in the next function');

    t.end();
});

test('Should call next function with an error message if not between range', (t) => {
    const rule = carRangeValueRule(1000, 2000);
    const nextSpy = sinon.spy();

    rule({ value: 0 }, nextSpy);

    t.assert(nextSpy.calledOnce, 'Should only call one time the next function');
    t.assert(nextSpy.firstCall.args.length === 1, 'Should receive an error message in the next function');
    
    t.end();
});