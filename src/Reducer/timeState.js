export default function timeState (state = [] , action)  {
    switch (action.type) {
        case 'ADD_TIME':
            return state.concat([action.timeState])
        case 'RESET_TIME': 
            return []
        default:
            return state
    }
}