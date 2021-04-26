import { getEmployees, getWorklog, EmployeesType, WorkLogType } from '../dal/Api';
import { AppStateType } from './Store';

let initialState = {
  employees: [] as Array<EmployeesType>,
  worklogs: [] as Array<WorkLogType>,
  sortOrientation: 'asc' as 'asc' | 'desc',
};

export const Reducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.employees };
    case 'SET_WORKLOG':
      return { ...state, worklogs: action.worklogs };
    case 'SET_SORT_ORIENTATION':
      return { ...state, sortOrientation: action.sortOrientation === 'asc' ? 'desc' : 'asc' };
    case 'SORT_NAME':
      let newState = {
        ...state,
        employees: state.employees.map(em => {
          return { ...em };
        }),
      };
      if (action.orientation === 'asc') {
        newState.employees.sort((a, b) => {
          if (a.lastName > b.lastName) {
            return 1;
          }
          if (a.lastName < b.lastName) {
            return -1;
          }
          return 0;
        });
      } else if (action.orientation === 'desc') {
        newState.employees.sort((a, b) => {
          if (a.lastName < b.lastName) {
            return 1;
          }
          if (a.lastName > b.lastName) {
            return -1;
          }
          return 0;
        });
      }
      return newState;
    default:
      return state;
  }
};

//Action creators
export const setEmployeesAC = (employees: Array<EmployeesType>) => ({ type: 'SET_EMPLOYEES', employees } as const);
export const setWorkLogAC = (worklogs: Array<WorkLogType>) => ({ type: 'SET_WORKLOG', worklogs } as const);
export const sortNameAC = (orientation: string) => ({ type: 'SORT_NAME', orientation } as const);
export const setSortOrientationAC = (sortOrientation: string) => ({ type: 'SET_SORT_ORIENTATION', sortOrientation } as const);
//Thunk creators

export const getEmployeesTC = () => async (dispatch: any, getState: () => AppStateType) => {
  try {
    const response: any = await getEmployees();
    dispatch(setEmployeesAC(response));
  } catch (error) {}
};
export const getWorkLogTC = () => async (dispatch: any, getState: () => AppStateType) => {
  try {
    const response: any = await getWorklog();
    dispatch(setWorkLogAC(response));
  } catch (error) {}
};
//types
type ActionsType = ReturnType<typeof setEmployeesAC> | ReturnType<typeof setWorkLogAC> | ReturnType<typeof sortNameAC> | ReturnType<typeof setSortOrientationAC>;

export type InitialStateType = typeof initialState;
