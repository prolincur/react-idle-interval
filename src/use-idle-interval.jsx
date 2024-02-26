/*
 * Copyright (c) 2020-24 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useIdleTimer } from 'react-idle-timer'
import { withPropsValidation } from 'prop-types-hook'
import { useInterval } from './use-interval'

/**
 * Runs the callback after specified interval.
 * It pauses when user is idle for period specified by idleTimer.
 */
function useIdleIntervalInternal(props) {
  const {
    callback,
    interval,
    pause,
    triggerOnUnmount,
    triggerOnMount,
    idleTimer,
    onIdle: onIdleIn,
    onActive: onActiveIn,
    ...restProps
  } = props
  const [isIdle, setIsIdle] = React.useState(false)

  const onIdle = React.useCallback(() => {
    setIsIdle(true)
    onIdleIn()
  }, [onIdleIn])

  const onActive = React.useCallback(() => {
    setIsIdle(false)
    onActiveIn()
  }, [onActiveIn])

  const theTracker = useIdleTimer({ onIdle, onActive, timeout: idleTimer, ...restProps })

  // When not idle, automatically trigger the callback after every specified intervals
  useInterval({
    pause: pause || isIdle,
    callback,
    interval,
    triggerOnMount,
    triggerOnUnmount,
  })


  return theTracker
}

useIdleIntervalInternal.propTypes = {
  callback: PropTypes.func,
  interval: PropTypes.number, // milliseconds
  pause: PropTypes.bool,
  triggerOnUnmount:  PropTypes.bool,
  triggerOnMount:  PropTypes.bool,
  idleTimer: PropTypes.number, // milliseconds
  onIdle: PropTypes.func,
  onActive: PropTypes.func,
}


useIdleIntervalInternal.defaultProps = {
  callback: null,
  interval: 0,
  pause: false,
  triggerOnUnmount: false,
  triggerOnMount: false,
  idleTimer: 1000 * 15, // 15 seconds default
  onIdle: () => {},
  onActive: () => {},
}

  
const useIdleInterval = withPropsValidation(useIdleIntervalInternal)

export { useIdleInterval }
