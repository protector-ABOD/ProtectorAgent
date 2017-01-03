import codeTables from './codeTables';
import skills from './skills';
import users from './users';
import agents from './agents';
import serviceRequests from './serviceRequests';

export default function () {
  users();
  codeTables();
  skills();
  agents();
  serviceRequests();
}