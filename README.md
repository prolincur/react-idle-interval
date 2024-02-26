# react-idle-interval
Utility to periodically call a callback function and skip when user is idle.

#### Install
`yarn add react-idle-interval`

#### Usage

```javascript

import { useIdleInterval, useInterval } from 'react-idle-interval'


function MyComponent () {

  useIdleInterval({
    callback: () => console.log('callback called'),
    interval: 100, // ms
    idleTimer: 1000, // ms
    onIdle: () => console.log('called on idle'),
    onActive: () => console.log('called on active'),
  })

}

```

### Author

[Prolincur Technologies](https://prolincur.com)