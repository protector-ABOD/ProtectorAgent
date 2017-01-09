import codeTables from './codeTables';
import skills from './skills';
import userProfiles from './userProfiles';
import agents from './agents';
import serviceRequests from './serviceRequests';

export default function () {
  codeTables();
  skills();
  userProfiles();
  agents();
  serviceRequests();
}