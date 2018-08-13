import DomustoPluginApi from '../../domusto/DomustoPluginApi';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

class DomustoP1Api extends DomustoPluginApi {
  /**
   *Creates an instance of DomustoP1Api.
   * @memberof DomustoP1Api
   */
  constructor() {
    // Create api endpoint /plugin/domusto-p1
    super('domusto-p1');

    // http://192.168.178.72:3000/plugin/domusto-p1/update?data=6435;8084;529;5650;3453;345
    this.addApiRouteGet('update', (request, response) => {
      let sensorData = request.query.data.split(';');

      // Check if number of values is valid
      if (sensorData.length !== 6) {
        response.status(400);
        response.json({ error: 'invalid sensor data format' });
        return;
      }

      // Check if all values are numbers
      for (let i = 0; i < sensorData.length; i++) {
        const element = sensorData[i];
        if (isNaN(sensorData[i])) {
          response.status(400);
          response.json({
            error: `sensor value at position ${i} isn't a number`
          });
          return;        }
      }

      this.pluginInstance.updatePowerData({
        electricity: {
          received: {
            tariff1: {
              reading: parseFloat(sensorData[0]),
              unit: 'kWh'
            },
            tariff2: {
              reading: parseFloat(sensorData[1]),
              unit: 'kWh'
            },
            actual: {
              reading: parseFloat(sensorData[2]) / 1000,
              unit: 'kWh'
            }
          },
          delivered: {
            tariff1: {
              reading: sensorData[3],
              unit: 'kWh'
            },
            tariff2: {
              reading: sensorData[4],
              unit: 'kWh'
            },
            actual: {
              reading: sensorData[5],
              unit: 'kWh'
            }
          }
        }
      });

      response.json({
        message: 'P1 values updated'
      });
    });
  }
}

let DomustoZWaveApiInstance = new DomustoP1Api();
export default DomustoZWaveApiInstance;
