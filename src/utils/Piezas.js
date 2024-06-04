import ApiGoogleSheet from "./ApiGoogleSheet.js";
import ConstGoggleSheet from "./ConstGoggleSheet.js";
const range = ConstGoggleSheet.reg_Piezas.range.PDM;
const sheetId = ConstGoggleSheet.reg_Piezas.sheetId;

class Piezas {
  async isValidCod(codigo) {
    try {
      const Data = new ApiGoogleSheet({ range: range, sheetId: sheetId });
      let response = await Data.getDataInJSON();
      return response.some((item) => item.codigo === codigo);
    } catch (e) {
      console.log(e);
    }
  }
  async getDataByCod(codigo) {
    try {
      const Data = new ApiGoogleSheet({ range: range, sheetId: sheetId });
      let response = await Data.getDataInJSON();
      return response.find((item) => item.codigo === codigo);
    } catch (e) {
      console.log(e);
    }
  }
}
export default Piezas;
