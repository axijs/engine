import './style.css'

import {testOneStringField, testScopeSystem} from './test-field.ts';
import {testTasks} from './test-tasks.ts';


testTasks().then(() => {
  console.log('---> done testTasks');
  return testOneStringField();
}).then(() => {
  console.log('---> done testOneStringField');
  console.log('---> start testScopeSystem');
  return testScopeSystem();
}).then(() => {
  console.log('---> done testScopeSystem');
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div></div>
`


