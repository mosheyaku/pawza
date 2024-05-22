import { animated, useSpring } from '@react-spring/web';
import React from 'react';

import { useWindowSize } from './useWindowSize';

const settings = {
  maxTilt: 25, // in deg
  rotationPower: 50,
  swipeThreshold: 0.5, // need to update this threshold for RN (1.5 seems reasonable...?)
};

// physical properties of the spring
const physics = {
  touchResponsive: {
    friction: 50,
    tension: 2000,
  },
  animateOut: {
    friction: 30,
    tension: 400,
  },
  animateBack: {
    friction: 10,
    tension: 200,
  },
};

const pythagoras = (x: number, y: number) => Math.sqrt(x ** 2 + y ** 2);

interface Vector {
  x: number;
  y: number;
}

const normalize = (vector: Vector): Vector => {
  const length = Math.sqrt(vector.x ** 2 + vector.y ** 2);
  return { x: vector.x / length, y: vector.y / length };
};

const animateOut = async (gesture: Vector, setSpringTarget: any, windowHeight: number, windowWidth: number) => {
  const diagonal = pythagoras(windowHeight, windowWidth);
  const velocity = pythagoras(gesture.x, gesture.y);
  const finalX = diagonal * gesture.x;
  const finalY = diagonal * gesture.y;
  const finalRotation = gesture.x * 45;
  const duration = diagonal / velocity;

  setSpringTarget.start({
    xyrot: [finalX, finalY, finalRotation],
    config: { duration },
  });

  // for now animate back
  return await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const animateBack = (setSpringTarget: any) =>
  // translate back to the initial position
  new Promise((resolve) => {
    setSpringTarget.start({ xyrot: [0, 0, 0], config: physics.animateBack, onRest: resolve });
  });

const getSwipeDirection = (vector: Vector) => {
  if (Math.abs(vector.x) > Math.abs(vector.y)) {
    if (vector.x > settings.swipeThreshold) {
      return 'right';
    }
    if (vector.x < -settings.swipeThreshold) {
      return 'left';
    }
  } else {
    if (vector.y > settings.swipeThreshold) {
      return 'down';
    }
    if (vector.y < -settings.swipeThreshold) {
      return 'up';
    }
  }
  return 'none';
};

// must be created outside of the TinderCard forwardRef
const AnimatedDiv = animated.div;

// eslint-disable-next-line react/display-name, react-refresh/only-export-components
export default React.forwardRef<any, any>(
  (
    {
      flickOnSwipe = true,
      children,
      onSwipe,
      onCardLeftScreen,
      className,
      preventSwipe = [],
      swipeRequirementType = 'velocity',
      swipeThreshold = settings.swipeThreshold,
      onSwipeRequirementFulfilled,
      onSwipeRequirementUnfulfilled,
    },
    ref,
  ) => {
    const { width, height } = useWindowSize();
    const [{ xyrot }, setSpringTarget] = useSpring(() => ({
      xyrot: [0, 0, 0],
      config: physics.touchResponsive,
    }));

    settings.swipeThreshold = swipeThreshold;

    React.useImperativeHandle(ref, () => ({
      async swipe(dir = 'right', power = 1.6) {
        if (onSwipe) onSwipe(dir);
        const disturbance = (Math.random() - 0.5) / 2;
        if (dir === 'right') {
          await animateOut({ x: power, y: disturbance }, setSpringTarget, width, height);
        } else if (dir === 'left') {
          await animateOut({ x: -power, y: disturbance }, setSpringTarget, width, height);
        } else if (dir === 'up') {
          await animateOut({ x: disturbance, y: -power }, setSpringTarget, width, height);
        } else if (dir === 'down') {
          await animateOut({ x: disturbance, y: power }, setSpringTarget, width, height);
        }
        if (onCardLeftScreen) onCardLeftScreen(dir);
      },
      async restoreCard(opts: { instant?: boolean } = {}) {
        const { instant = false } = opts;
        if (instant) {
          setSpringTarget.set({ xyrot: [0, 0, 0] });
        } else {
          await animateBack(setSpringTarget);
        }
      },
    }));

    const handleSwipeReleased = React.useCallback(
      async (innerSetSpringTarget: any, gesture: any) => {
        // Check if this is a swipe
        const dir = getSwipeDirection({
          x: swipeRequirementType === 'velocity' ? gesture.vx : gesture.dx,
          y: swipeRequirementType === 'velocity' ? gesture.vy : gesture.dy,
        });

        if (dir !== 'none') {
          if (flickOnSwipe) {
            if (!preventSwipe.includes(dir)) {
              if (onSwipe) onSwipe(dir);

              await animateOut(
                swipeRequirementType === 'velocity'
                  ? {
                      x: gesture.vx,
                      y: gesture.vy,
                    }
                  : normalize({ x: gesture.dx, y: gesture.dy }), // Normalize to avoid flicking the card away with super fast speed only direction is wanted here
                innerSetSpringTarget,
                width,
                height,
              );
              if (onCardLeftScreen) onCardLeftScreen(dir);
              return;
            }
          }
        }

        // Card was not flicked away, animate back to start
        animateBack(innerSetSpringTarget);
      },
      [swipeRequirementType, flickOnSwipe, preventSwipe, onSwipe, onCardLeftScreen, width, height],
    );

    let swipeThresholdFulfilledDirection = 'none';

    const gestureStateFromWebEvent = (ev: any, startPositon: Vector, lastPosition: any, isTouch: boolean) => {
      let dx = isTouch ? ev.touches[0].clientX - startPositon.x : ev.clientX - startPositon.x;
      let dy = isTouch ? ev.touches[0].clientY - startPositon.y : ev.clientY - startPositon.y;

      // We cant calculate velocity from the first event
      if (startPositon.x === 0 && startPositon.y === 0) {
        dx = 0;
        dy = 0;
      }

      const vx = -(dx - lastPosition.dx) / (lastPosition.timeStamp - Date.now());
      const vy = -(dy - lastPosition.dy) / (lastPosition.timeStamp - Date.now());

      const gestureState = { dx, dy, vx, vy, timeStamp: Date.now() };
      return gestureState;
    };

    React.useLayoutEffect(() => {
      let startPositon = { x: 0, y: 0 };
      let lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
      let isClicking = false;

      const onTouchStart = (ev: any) => {
        if (!ev.srcElement.className.includes('pressable') && ev.cancelable) {
          ev.preventDefault();
        }

        const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, true);
        lastPosition = gestureState;
        startPositon = { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
      };

      element.current!.addEventListener('touchstart', onTouchStart);

      const onMouseDown = (ev: any) => {
        isClicking = true;
        const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, false);
        lastPosition = gestureState;
        startPositon = { x: ev.clientX, y: ev.clientY };
      };

      element.current!.addEventListener('mousedown', onMouseDown);

      const handleMove = (gestureState: any) => {
        // Check fulfillment
        if (onSwipeRequirementFulfilled || onSwipeRequirementUnfulfilled) {
          const dir = getSwipeDirection({
            x: swipeRequirementType === 'velocity' ? gestureState.vx : gestureState.dx,
            y: swipeRequirementType === 'velocity' ? gestureState.vy : gestureState.dy,
          });
          if (dir !== swipeThresholdFulfilledDirection) {
            swipeThresholdFulfilledDirection = dir;
            if (swipeThresholdFulfilledDirection === 'none') {
              if (onSwipeRequirementUnfulfilled) onSwipeRequirementUnfulfilled();
            } else if (onSwipeRequirementFulfilled) onSwipeRequirementFulfilled(dir);
          }
        }

        // use guestureState.vx / guestureState.vy for velocity calculations
        // translate element
        let rot = gestureState.vx * 15; // Magic number 15 looks about right
        if (Number.isNaN(rot)) rot = 0;
        rot = Math.max(Math.min(rot, settings.maxTilt), -settings.maxTilt);
        setSpringTarget.start({ xyrot: [gestureState.dx, gestureState.dy, rot], config: physics.touchResponsive });
      };

      const onMouseMove = (ev: any) => {
        if (!isClicking) return;
        const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, false);
        lastPosition = gestureState;
        handleMove(gestureState);
      };

      window.addEventListener('mousemove', onMouseMove);

      const onMouseUp = (ev: any) => {
        if (!isClicking) return;
        isClicking = false;
        handleSwipeReleased(setSpringTarget, lastPosition);
        startPositon = { x: 0, y: 0 };
        lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
      };

      window.addEventListener('mouseup', onMouseUp);

      const onTouchMove = (ev: any) => {
        const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, true);
        lastPosition = gestureState;
        handleMove(gestureState);
      };

      element.current!.addEventListener('touchmove', onTouchMove);

      const onTouchEnd = (ev: any) => {
        handleSwipeReleased(setSpringTarget, lastPosition);
        startPositon = { x: 0, y: 0 };
        lastPosition = { dx: 0, dy: 0, vx: 0, vy: 0, timeStamp: Date.now() };
      };

      element.current!.addEventListener('touchend', onTouchEnd);

      return () => {
        element.current!.removeEventListener('touchstart', onTouchStart);
        element.current!.removeEventListener('touchmove', onTouchMove);
        element.current!.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        element.current!.removeEventListener('mousedown', onMouseDown);
      };
    }, [handleSwipeReleased, setSpringTarget, onSwipeRequirementFulfilled, onSwipeRequirementUnfulfilled]);

    const element = React.useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react/no-children-prop
    return React.createElement(AnimatedDiv, {
      ref: element,
      className,
      style: {
        transform: xyrot.to((x, y, rot) => `translate3d(${x}px, ${y}px, ${0}px) rotate(${rot}deg)`),
      },
      children,
    });
  },
);
