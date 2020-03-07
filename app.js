console.clear();
console.log('%cHack initialized','background:black;color:red;padding:2px');
// styles
const hackStyles = document.createElement('link');
hackStyles.rel = 'stylesheet';
hackStyles.href = 'https://cdn.liptun.dev/zieloneimperium/app.css';
if ( document.querySelector('.main_body') ) {
  document.querySelector('.main_body').appendChild(hackStyles);
}
// main hack container
const hackApp = document.createElement('aside');
hackApp.classList.add('hack-app');
if ( document.querySelector('.main_body') ) {
  document.querySelector('.main_body').appendChild(hackApp);
}
const hackWaterAll = document.createElement('div');
hackWaterAll.classList.add('hack-app__feature');
hackWaterAll.innerHTML = `
  <h2>Water all</h2>
  <button>Run</button>
`;
hackApp.appendChild(hackWaterAll);

hackWaterAll.addEventListener('click', () => {
  selectMode(2, true, selected);
  document.querySelectorAll('.feld').forEach( el => {
    const field = getField(el);
    if ( field.waterable ) {
      el.click();
    }
  });
});

function trans(str) {
  const transStr = [];
  transStr['0'] = 'empty';
  transStr['unkraut'] = 'weeds';
  transStr['baumstumpf'] = 'stump';
  transStr['maulwurf'] = 'mole';
  transStr['steine'] = 'stone';
  return transStr[str] ? transStr[str] : str;
}

function getField(field) {
  const plant = field
    .querySelector('.plantImage')
    .style.backgroundImage.split('"')[1]
    .split('/')
    .pop()
    .replace('.gif', '')
    .split('_')[0];
  const plantTrans = trans(plant);
  return {
    waterable: !['mole','weeds','stump','stone','empty'].contains(plantTrans),
    plant: plantTrans,
  };
}

// document.querySelectorAll('.feld').forEach(el => {
//   console.log(getField(el));
// });
