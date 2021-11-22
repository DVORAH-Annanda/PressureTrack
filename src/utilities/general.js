const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  } //move to utils

 export { isObjectEmpty };