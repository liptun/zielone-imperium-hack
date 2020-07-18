console.clear();
console.log('%cHack initialized','background:black;color:red;padding:2px');
// styles
const hackStyles = document.createElement('link');
hackStyles.rel = 'stylesheet';
hackStyles.href = 'http://localhost/app.css';
if ( document.querySelector('.main_body') ) {
  document.querySelector('.main_body').appendChild(hackStyles);
}
// main hack container
const hackApp = document.createElement('aside');
hackApp.classList.add('hack-app');
hackApp.innerHTML = `
  <div class="hack-app__feature">
    <h2>Water all</h2>
    <button onclick="hack.waterAll();">Run</button>
  </div>
  <div class="hack-app__feature hack-app__feature--disabled">
    <h2>Harvest all</h2>
    <button onclick="hack.harvestAll();">Run</button>
  </div>
  <div class="hack-app__feature">
    <h2>Plant all</h2>
    <button onclick="hack.plantAll();">Run</button>
  </div>
`;
if ( document.querySelector('.main_body') ) {
  document.querySelector('.main_body').appendChild(hackApp);
}

const plantsCatalog = {
  carrot: {
    name: 'Carrot',
    time: 10 * 60,
    yields: 2,
    id: 6,
  },
  salad: {
    name: 'Salad',
    time: 14 * 60,
    yields: 2,
    id: 2
  },
}

//gardenjs.showPopup('Head', 'Tekst', () => {console.log()})

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

function getFieldInfo(fieldEl) {
  const waterImage = fieldEl.querySelector('.wasser').src.split('/').pop().replace('.gif', '');
  const imageFilename = fieldEl.querySelector('.plantImage').style.backgroundImage.split('"')[1].split('/').pop().replace('.gif', '');
  const plant = imageFilename.split('_')[0];
  const readyStatus = imageFilename.split('_').pop();
  const plantTrans = trans(plant);
  return {
    x: parseInt(Array.from(fieldEl.classList).filter(el => el.includes('col'))[0].replace('col', '')),
    y: parseInt(Array.from(fieldEl.classList).filter(el => el.includes('row'))[0].replace('row', '')),
    ready: readyStatus === '04' && !['mole','weeds','stump','stone'].contains(plantTrans),
    plant: plantTrans,
    water: waterImage !== '0',
    plantable: ['empty'].contains(plantTrans),
    waterable: !['mole','weeds','stump','stone','empty'].contains(plantTrans),
    el: fieldEl,
  };
}




class Hack {
  constructor() {
    this.gardenFields = [];
    this.gardenPlants = [];
    this.updateGardenStatus();
    this.selectedFields = [];
    this.updateStatusTimer = setInterval(() => {
      this.updateGardenStatus();
    }, 1000);
    console.log(this.gardenPlants);
  }

  getField(x, y) {
    const result = this.gardenFields.filter(el => (el.x === x && el.y === y));
    return result[0]
      ? result[0]
      : false
    ;
  }

  updateGardenStatus() {
    this.gardenFields = [];
    document.querySelectorAll('.feld').forEach(el => {
      this.gardenFields.push(getFieldInfo(el));
    });

    this.gardenPlants = []
    this.gardenFields.forEach(el => {
      if ( typeof this.gardenPlants[el.plant] === 'undefined' ) {
        this.gardenPlants[el.plant] = {
          name: el.plant,
          total: 0,
          ready: 0,
          growing: 0,
          watered: 0,
          fields: []
        };
      }
      this.gardenPlants[el.plant].total += 1;
      if (el.ready) {
        this.gardenPlants[el.plant].ready += 1;
      } else {
        this.gardenPlants[el.plant].growing += 1;
      }
      if (el.water) {
        this.gardenPlants[el.plant].watered += 1;
      }
      this.gardenPlants[el.plant].fields.push(el);
    });
  }

  clickWaterable() {
    console.log('click all waterable fields');
    document.querySelectorAll('.feld').forEach( el => {
      const field = getFieldInfo(el);
      if ( field.waterable ) {
        el.click();
      }
    });
  }

  clickPlantable() {
    console.log('click all plantable fields');
    document.querySelectorAll('.feld').forEach( el => {
      const field = getFieldInfo(el);
      if ( field.plantable ) {
        el.click();
      }
    });
  }

  clickHarvestable() {
    console.log('click all harvestable fields');
    document.querySelectorAll('.feld').forEach( el => {
      const field = getFieldInfo(el);
      if ( field.ready ) {
        el.click();
      }
    });
  }

  waterAll() {
    selectMode(2, true, selected);
    this.clickWaterable();
  }

  plantAll() {
    selectMode(0,true,selected);
    this.clickPlantable();
  }

  harvestAll() {
    selectMode(1,true,selected);
    this.clickHarvestable();
  }

  dump() {
    document.querySelectorAll('.feld').forEach(el => {
      console.log(getFieldInfo(el));
    });
  }
}

const hack = new Hack;

// hack.dump();