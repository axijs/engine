import './style.css'

import {testDataSystem} from './test-data';
import {testTasks} from './test-tasks';


testTasks().then(() => {
  console.log('---> done testOneStringField');
  console.log('---> start testScopeSystem');
  return testDataSystem();
}).then(() => {
  console.log('---> done testScopeSystem');
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div></div>
`


