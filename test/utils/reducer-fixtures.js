import { trophies } from './data-fixtures';

export const dashboard = {
    isFetchingDashboard: false,
    data: [],
    error: undefined
};

export const newModule = {
    module_id: undefined,
    name: undefined,
    medals: [39, 69],
    trophies,
    error: undefined,
    isValidatingModuleID: false,
    moduleIDExists: undefined
};
