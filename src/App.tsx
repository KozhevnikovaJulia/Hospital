import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Employees } from './ui/Employees';
import { WorkLogs } from './ui/WorkLogs';
import { getEmployeesTC, getWorkLogTC } from './bll/Reducer';
import { AppStateType } from './bll/Store';
import { EmployeesType, WorkLogType } from './dal/Api';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeesTC());
    dispatch(getWorkLogTC());
  }, []);
  const employees = useSelector<AppStateType, Array<EmployeesType>>(state => state.app.employees);
  const worklogs = useSelector<AppStateType, Array<WorkLogType>>(state => state.app.worklogs);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={'/employees'} />} />
        <Route exact path='/employees' render={() => <Employees employees={employees} />} />
        <Route exact path='/workLog/:employeeId?' render={() => <WorkLogs worklogs={worklogs} employees={employees} />} />
      </Switch>
    </div>
  );
}

export default App;
