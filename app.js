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

// water all
const hackWaterAll = document.createElement('div');
hackWaterAll.classList.add('hack-app__feature');
hackWaterAll.innerHTML = `
  <h2>Water all</h2>
  <button onclick="hack.waterAll();">Run</button>
`;
hackApp.appendChild(hackWaterAll);

const hackHarvestAll = document.createElement('div');
hackHarvestAll.classList.add('hack-app__feature');
hackHarvestAll.innerHTML = `
  <h2>Harvest all</h2>
  <button onclick="hack.harvestAll();">Run</button>
`;
hackApp.appendChild(hackHarvestAll);

const hackPlantAll = document.createElement('div');
hackPlantAll.classList.add('hack-app__feature');
hackPlantAll.innerHTML = `
  <h2>Plant all</h2>
  <button onclick="hack.plantAll();">Run</button>
`;
hackApp.appendChild(hackPlantAll);


function trans(str) {
  const transStr = [];
  transStr['0'] = 'empty';
  transStr['unkraut'] = 'weeds';
  transStr['baumstumpf'] = 'stump';
  transStr['maulwurf'] = 'mole';
  transStr['steine'] = 'stone';
  transStr['karotte'] = 'carrot';
  transStr['salat'] = 'salad';
  return transStr[str] ? transStr[str] : str;
}

function getField(field) {
  const imageFilename = field.querySelector('.plantImage').style.backgroundImage.split('"')[1].split('/').pop().replace('.gif', '');
  const plant = imageFilename.split('_')[0];
  const readyStatus = imageFilename.split('_').pop();
  const plantTrans = trans(plant);
  return {
    ready: readyStatus === '04' && !['mole','weeds','stump','stone'].contains(plantTrans),
    plant: plantTrans,
    plantable: ['empty'].contains(plantTrans),
    waterable: !['mole','weeds','stump','stone','empty'].contains(plantTrans),
  };
}

const hack = {
  clickByType(type, inverse = false) {

  },
  clickWaterable() {
    console.log('click all waterable fields');
    document.querySelectorAll('.feld').forEach( el => {
      const field = getField(el);
      if ( field.waterable ) {
        el.click();
      }
    });
  },
  clickPlantable() {
    console.log('click all plantable fields');
    let index = 0;
    document.querySelectorAll('.feld').forEach( el => {
      const field = getField(el);
      if ( field.plantable ) {
        setInterval(() => {
          el.click();
        }, 200 * index);
        index++;
      }
    });
  },
  clickHarvestable() {
    console.log('click all harvestable fields');
    document.querySelectorAll('.feld').forEach( el => {
      const field = getField(el);
      if ( field.ready ) {
        el.click();
      }
    });
  },
  waterAll() {
    selectMode(2, true, selected);
    this.clickWaterable();
  },
  plantAll() {
    selectMode(0,true,selected);
    this.clickPlantable();
  },
  harvestAll() {
    selectMode(1,true,selected);
    this.clickHarvestable();
  },
  dump() {
    document.querySelectorAll('.feld').forEach(el => {
      console.log(getField(el));
    });
  }
}


// hack.dump();