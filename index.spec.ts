import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

// DOMUSTO
import DomustoPlugin from '../../domusto/DomustoPlugin';
import { Domusto } from '../../domusto/DomustoTypes';

describe('Plugin DomustoP1', () => {

    let DomustoP1Proxy;
    let DomustoPluginProxy;
    let broadcastSignalSpy;

    let p1PluginInstance;

    before(() => {

        broadcastSignalSpy = sinon.spy(DomustoPlugin.prototype, 'broadcastSignal');

        let p1ReaderStub = sinon.stub().returns({
            on: (eventName, eventFunction) => {
                return true;
            }
        });

        DomustoP1Proxy = proxyquire('./index', {
            'p1-reader': p1ReaderStub,
        });

        p1PluginInstance = new DomustoP1Proxy.default({
            id: 'P1',
            enabled: true,
            dummyData: false,
            debug: true,
            settings: {
                port: '/dev/dummy',
                emulator: false
            }
        });

    });

    after(() => {
        broadcastSignalSpy.restore();
    });

    it('should broadcast update on new data', () => {

        const dummyData = {
            electricity: {
                received: {
                    tariff1: {
                        reading: 23410,
                        unit: 'kWh'
                    },
                    tariff2: {
                        reading: 12145,
                        unit: 'kWh'
                    },
                    actual: {
                        reading: 5622,
                        unit: 'kW'
                    },

                },
                delivered: {
                    tariff1: {
                        reading: 45642,
                        unit: 'kWh'
                    },
                    tariff2: {
                        reading: 34534,
                        unit: 'kWh'
                    },
                    actual: {
                        reading: 2343,
                        unit: 'kW'
                    },

                }
            }
        };

        p1PluginInstance.updatePowerData(dummyData);

        sinon.assert.calledWith(broadcastSignalSpy, 'received', {
            tariff1: {
                value: 23410,
                unit: 'kWh'
            },
            tariff2: {
                value: 12145,
                unit: 'kWh'
            },
            actual: {
                value: 5622,
                unit: 'kW'
            }
        });

        sinon.assert.calledWith(broadcastSignalSpy, 'delivered', {
            tariff1: {
                value: 45642,
                unit: 'kWh'
            },
            tariff2: {
                value: 34534,
                unit: 'kWh'
            },
            actual: {
                value: 2343,
                unit: 'kW'
            }
        });

    });

});