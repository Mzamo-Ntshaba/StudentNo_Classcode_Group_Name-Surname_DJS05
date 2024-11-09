// Initial state for the Tally App
const initialState = { count: 0 };

// Reducer function to handle state transitions based on action types
function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + 1 };
        case 'SUBTRACT':
            return { count: state.count - 1 };
        case 'RESET':
            return initialState; // Reset state to initial value
        default:
            return state; // Return current state if action type is unrecognized
    }
}

// Store Implementation using the Observer pattern
const store = (() => {
    let state = initialState; // Private variable to store the current state
    const subscribers = []; // Array to store subscriber functions

    // getState: Returns the current state
    function getState() {
        return state;
    }

    // dispatch: Applies an action to update the state through the reducer and notifies subscribers
    function dispatch(action) {
        state = reducer(state, action); // Update state by passing action to reducer
        subscribers.forEach(callback => callback(state)); // Notify all subscribers of the new state
    }

    // subscribe: Adds a callback function to the list of subscribers
    function subscribe(callback) {
        subscribers.push(callback); // Register the callback to be called on state changes
    }

    // Expose public methods to interact with the store
    return {
        getState,
        dispatch,
        subscribe,
    };
})();

// Test Scenarios

// SCENARIO 1: Initial State Verification
console.log("SCENARIO 1: Initial State Verification");
console.log("The state should show a count of 0");

// Subscribe to log state updates whenever an action changes the state
store.subscribe(state => console.log("State updated to:", state));
console.log("Initial State Verification:", store.getState()); // Should display: { count: 0 }

// SCENARIO 2: Incrementing the Counter
console.log("\nSCENARIO 2: Incrementing the Counter");
console.log("The state should show a count of 2");

store.dispatch({ type: 'ADD' }); // Increment count
store.dispatch({ type: 'ADD' }); // Increment count
console.log("Verification After Incrementing Counter:", store.getState()); // Should display: { count: 2 }

// SCENARIO 3: Decrementing the Counter
console.log("\nSCENARIO 3: Decrementing the Counter");
console.log("The state should display a count of 1");

store.dispatch({ type: 'SUBTRACT' }); // Decrement count
console.log("Verification after Decrementing the Counter:", store.getState()); // Should display: { count: 1 }

// SCENARIO 4: Resetting the Counter
console.log("\nSCENARIO 4: Resetting the Counter");
console.log("The state should display a count of 0");

store.dispatch({ type: 'RESET' }); // Reset count to initial state
console.log("Verification after Resetting:", store.getState()); // Should display: { count: 0 }
