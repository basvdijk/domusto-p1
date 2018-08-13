# P1 meter

```
plugin:    P1 smartmeter for Landys Gyr E350
author:    Bas van Dijk
category:  utility
version:   0.0.1
website:   http://domusto.com
```

## Hardware needed
- [P1 smart meter serial to USB cable](https://www.sossolutions.nl/slimme-meter-kabel) - € 19,95

## Tested with
 - Kaifa and Landis+Gyr Smart Meters

## Installation
```sh
$ ./domusto.js plugin install basvdijk/domusto-p1
```

## Plugin configuration

1. Connect the P1 smart meter cable to your usb port
2. Add the section below to your `config.ts`
3. Set the correct com port where your have connected your P1 smart meter cable
5. Restart DOMUSTO

```js
{
    enabled: true,
    type: 'P1',
    settings: {
        port: '/dev/ttyUSB-P1'
    }
},
```

## Example devices

```js

// For received power
{
    id: 'POWER1',
    enabled: true,
    role: 'input',
    name: 'Smart meter',
    type: 'power',
    protocol: {
        pluginId: 'P1',
        id: 'POWER1',
        deviceId: 'received'
    }
},

// For delivered power
{
    id: 'POWER2',
    enabled: true,
    role: 'input',
    name: 'Smart meter',
    type: 'power',
    protocol: {
        pluginId: 'P1',
        id: 'POWER2',
        deviceId: 'delivered'
    }
},
```

# API

## /update - GET
Updates the P1 values

### Parameters
 - Consumption low tariff
 - Consumption high tariff
 - Consumption current
 - Return low tariff
 - Return high tariff
 - Return current

Example:
`http://192.168.178.72:3000/plugin/domusto-p1/update?data=6435;8084;529;5650;3453;345`