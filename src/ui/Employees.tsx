import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeesType } from '../dal/Api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { sortNameAC, setSortOrientationAC } from '../bll/Reducer';
import { AppStateType } from '../bll/Store';

type EmployeesPropsType = {
  employees: Array<EmployeesType>;
};

export const Employees = (props: EmployeesPropsType) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sortOrientation = useSelector<AppStateType, string>(state => state.app.sortOrientation);
  const onClickEmployee = (employeeId: number) => {
    let path = `workLog/${employeeId}`;
    history.push(path);
  };
  const onClickSort = (sortOrientation: string) => {
    dispatch(setSortOrientationAC(sortOrientation));
  };

  useEffect(() => {
    dispatch(sortNameAC(sortOrientation));
  }, [sortOrientation]);
  const { employees } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: 'grey' }}>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>
              <Button
                variant='contained'
                onClick={() => {
                  onClickSort(sortOrientation);
                }}
              >
                sort
              </Button>
              employee
            </TableCell>
            <TableCell>birth Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell
                onClick={() => {
                  onClickEmployee(employee.id);
                }}
              >
                {employee.id}
              </TableCell>
              <TableCell
                onClick={() => {
                  onClickEmployee(employee.id);
                }}
              >
                {employee.lastName} {employee.firstName} {employee.middleName}
              </TableCell>
              <TableCell
                onClick={() => {
                  onClickEmployee(employee.id);
                }}
              >
                {employee.birthDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
