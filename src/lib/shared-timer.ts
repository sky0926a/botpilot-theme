type Listener = () => void;

const DEFAULT_INTERVAL_MS = 10_000;

// Store state on globalThis so it survives HMR (module-level variables
// get re-initialised on hot reload, orphaning any running setInterval).
const timerState = globalThis as unknown as {
  __CCH_SHARED_TIMER_LISTENERS__?: Set<Listener>;
  __CCH_SHARED_TIMER_INTERVAL_ID__?: ReturnType<typeof setInterval> | null;
};

if (!timerState.__CCH_SHARED_TIMER_LISTENERS__) {
  timerState.__CCH_SHARED_TIMER_LISTENERS__ = new Set();
}

function startIfNeeded(): void {
  if (timerState.__CCH_SHARED_TIMER_INTERVAL_ID__ != null) return;
  timerState.__CCH_SHARED_TIMER_INTERVAL_ID__ = setInterval(() => {
    for (const listener of timerState.__CCH_SHARED_TIMER_LISTENERS__!) {
      try {
        listener();
      } catch (err) {
        console.error("[shared-timer] subscriber threw", err);
      }
    }
  }, DEFAULT_INTERVAL_MS);
}

function stopIfEmpty(): void {
  if (
    timerState.__CCH_SHARED_TIMER_LISTENERS__!.size > 0 ||
    timerState.__CCH_SHARED_TIMER_INTERVAL_ID__ == null
  ) {
    return;
  }
  clearInterval(timerState.__CCH_SHARED_TIMER_INTERVAL_ID__);
  timerState.__CCH_SHARED_TIMER_INTERVAL_ID__ = null;
}

/**
 * Subscribe to the shared 10-second tick.
 * Auto-starts on first subscriber, auto-stops when the last unsubscribes.
 * Returns an unsubscribe function.
 */
export function subscribeToTick(listener: Listener): () => void {
  timerState.__CCH_SHARED_TIMER_LISTENERS__!.add(listener);
  startIfNeeded();
  return () => {
    timerState.__CCH_SHARED_TIMER_LISTENERS__!.delete(listener);
    stopIfEmpty();
  };
}
