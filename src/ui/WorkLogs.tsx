import React from 'react';
import { WorkLogType, EmployeesType } from '../dal/Api';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

type WorkLogsPropsType = {
  worklogs: Array<WorkLogType>;
  employees: Array<EmployeesType>;
};

export const WorkLogs = (props: WorkLogsPropsType) => {
  const { worklogs, employees } = props;
  const { employeeId } = useParams<{ employeeId: string }>();
  const history = useHistory();
  const onClickBack = () => {
    history.push('/employees');
  };
  const filtredWorklogs = worklogs.filter(worklog => worklog.employee_id === +employeeId);
  const employee = employees.find(employee => employee.id === +employeeId);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: 'grey' }}>
            <TableRow>
              <TableCell>employee</TableCell>
              <TableCell>entrance</TableCell>
              <TableCell>exit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtredWorklogs.map(worklog => (
              <TableRow key={worklog.id}>
                <TableCell>
                  {employee && employee.lastName} {employee && employee.firstName} {employee && employee.middleName}
                </TableCell>
                <TableCell>{worklog.from}</TableCell>
                <TableCell>{worklog.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button style={{ backgroundColor: 'grey' }} onClick={onClickBack}>
        Back
      </Button>
    </div>
  );
};
