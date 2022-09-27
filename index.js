const redux = require ('redux')
const reduxLogger = require('redux-logger')


const applyMidldeware = redux.applyMiddleware;
const createStore = redux.createStore
const combineReducer = redux.combineReducers
const logger = reduxLogger.createLogger();

// Three Core Conpcepts - Redux

// Store - It holds the state of the appliation 
// Action = It describe the changes in the state of application
// Reducer - It executes the transition depending on the action

// Three Principles

// 1. 
// 2. State is read only, it can only be changed by reducer function
// 3. Writing pure reducers to determine how the state changes (reducer = (previousState, action) => newState)


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake () {
    return {
        type: BUY_CAKE,
        info: 'First Redux action',
    }
}

function buyIceCream () {
    return {
        type: BUY_ICECREAM,
        info: 'Seconf Redux Action',
    }
}

// defining state
const initialIceCreamState = {
    numOfIcecreams: 20,
}

const initialCakeState = {
    numOfCakes: 10,
}

const icecreamreducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        
        case BUY_ICECREAM: return {
            ...state, 
            numOfIcecreams: state.numOfIcecreams - 1,
        }

        default: return state;
    }
}

const cakereducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state, 
            numOfCakes: state.numOfCakes - 1,
        }
        default: return state;
    }
}

// Redux Store

// One store for entire apllication
const rootReducer = combineReducer({
    cake: cakereducer,
    icecream: icecreamreducer
})

const store = createStore(rootReducer,applyMidldeware(logger))
console.log("Initial State = ", store.getState())
const unsubscribe = store.subscribe(()=>{})
store.dispatch({
    type: BUY_CAKE,
})
store.dispatch({
    type: BUY_CAKE,
})
store.dispatch({
    type: BUY_CAKE,
})

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe();


// Middleware in Redux

