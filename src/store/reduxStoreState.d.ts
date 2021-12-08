export interface State {
    form: Form;
    routing: Routing;
    componentState: ComponentState;
    api: Api;
}

interface Form {
    ClientForm?: GeneralForm;
    reaBuyerEmailForm?: GeneralForm;
    reaCreateTransactionForm?: GeneralForm;
}

interface GeneralForm {
    syncErrors: any;
    registeredFields: any;
    value: any;
    values: any;
}

interface Routing {
    locationBeforeTransitions: RoutingInfo;
}

interface RoutingInfo {
    pathname: string;
    search: string;
    hash: string;
    action: string;
    key: string;
    query: any;
}

interface ComponentState {
}

interface Api {
    accessToken: string;
    loggedInUserId: string;
    errorMessage: string;
    entities: Entities;
}

interface Entities {
    users: { [key: number]: User };
    clients:{[key: number]: Client };
    agents:{[key: number]: Agent };
    transactions:{[key: number]: Transaction };

}

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: number;
    systemAdministrator: boolean;
    createdTimestamp: string;
}

interface Client {
    id: number;
    isActive: boolean;
}
interface Agent {
    id: number;
}
interface Transaction {
    id: number;
    firstName: string;
    lastName: string;
    agent: Agent;
}
