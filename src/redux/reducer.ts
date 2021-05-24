// interfaces
export interface User {
    ticket: number
}

export interface Vote {
    voteId: string
    subject: string
    content: string
    voteItems: VoteItem[]
}

interface VoteItem {
    itemId: string
    subject: string
    count: number
}


// actions
const USER_UPDATE = "UPDATE_USER"
const USER_TICKET_DECREASE = "USER_TICKET_DECREASE"
export const userUpdate = (user: any) => ({type: USER_UPDATE, payload: user})
export const userTicketDecrease = (amount: any) => ({type: USER_TICKET_DECREASE, payload: amount})


// reducers
export const userReducer = (state: User = {ticket: 0}, action: { type: any; payload: number }) => {
    switch (action.type) {
        case userUpdate:
            return action.payload
        case userTicketDecrease:
            return {...state, ticket: state.ticket - action.payload}
    }

    return state
}

export const voteReducer = (state = [], action: { type: any; payload: number }) => state;
