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
    user: number;
}

interface Transaction {
    id: number;
    firstName: string;
    lastName: string;
    homeCriteria: HomeCriteria;
    transactionsComplete: number;
    agent: Agent;
}
// ENUM('one_hundred','two_hundred','three_hundred','four_hundred','five_hundred','six_hundred','seven_hundred','eight_hundred','nine_hundred','one_million')")
type PriceByHundredsType = 'one_hundred' | 'two_hundred' | 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
type TransactionStatusType = 'not_started' | 'in_progress' | 'completed';
//"ENUM('not_started', 'in_progress', 'completed')")
// "ENUM('one', 'two', 'three', 'four', 'five')")
type RoomAmountType = 'one' | 'two' | 'three' | 'four' | 'five';
// type DiscountType = 'one_hundred' | 'two_hundred' | 'three_hundred' | 'four_hundred' | 'five_hundred';
interface HomeCriteria {
    id: number;
    transaction: Transaction;
    transactionStatusType : TransactionStatusType;
    minPrice: PriceByHundredsType;
    maxPrice: PriceByHundredsType;
    amountOfBed: RoomAmountType;
    amountOfBaths: RoomAmountType;
    house: boolean;
    multifamily: boolean;
    condocoop: boolean;
    townhome: boolean;
    basement: boolean;
    centralair: boolean;
    pool: boolean;
    waterfront: boolean;
    cityOne: boolean;
    cityTwo: boolean;
    cityThree: boolean;
    cityFour: boolean;
    cityFive: boolean;
    createdTimestamp: string;
}