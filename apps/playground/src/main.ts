import './style.css'

import {testNewScopeSystem} from './test-data.ts';
import {testTasks} from './test-tasks.ts';


testTasks().then(() => {
  console.log('---> done testOneStringField');
  console.log('---> start testScopeSystem');
  return testNewScopeSystem();
}).then(() => {
  console.log('---> done testScopeSystem');
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div></div>
`


