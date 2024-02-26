/*
 * Copyright (c) 2020-24 Prolincur Technologies LLP.
 * All Rights Reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { withPropsValidation } from 'prop-types-hook'
import { useMutableRef} from 'react-mutable-refs'

function useIntervalInternal(props) {
  const { callback, interval, pause, triggerOnMount, triggerOnUnmount } = props
  const callbackRef = useMutableRef(callback)

  React.useEffect(() => {
    if (!interval || !callbackRef.current || pause) {
      return () => {};
    }

    const handle = setInterval(() => {  callbackRef.current()  }, interval);
    return () => clearInterval(handle);
  }, [callbackRef, interval, pause])

    // Should trigger on mount/unmount
    React.useEffect(() => {
      if (pause) return () => {}
      if (triggerOnMount) callback()
      if (triggerOnUnmount) return () => callback()
      return () => {}
    }, [callback, pause, triggerOnMount, triggerOnUnmount])

}

useIntervalInternal.propTypes = {
  callback: PropTypes.func,
  interval: PropTypes.number,
  pause: PropTypes.bool,
  triggerOnUnmount:  PropTypes.bool,
  triggerOnMount:  PropTypes.bool,
}

useIntervalInternal.defaultProps = {
  callback: () => {},
  interval: 0, // milliseconds
  pause: false,
  triggerOnUnmount: false,
  triggerOnMount: false,
}

const useInterval = withPropsValidation(useIntervalInternal)

export { useInterval }