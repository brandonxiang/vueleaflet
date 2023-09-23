import { getCurrentInstance } from "vue";

export const MAP_PROVIDE = 'mapProvide';
export const MARK_PROVIDE = 'markProvide';

const getInjectKey = (_category: string, key?: string) => {
 
  // when key has value，return init value
  if(key) {
    return  _category + '-' + key;
  } else {
    // when key has no value, return parent value
    let currentCpn = getCurrentInstance();
    const id = currentCpn?.parent?.exposed?.id;
    const parentCategory = currentCpn?.parent?.exposed?.category;

    //parent value is exactly asserted 
    if(!id || !parentCategory || parentCategory !== _category) {
      return '';
    }

    const tmp = (parentCategory || _category) + '-' + id;
    return tmp;
  }
}

/** 如果是根节点，传入id */
export const getMapInjectKey = (key?: string) => {

  return getInjectKey('map', key)
}

export const getMarkerInjectKey = (key?: string) => {
  return getInjectKey('marker', key)
}

