import ApiGoogleSheet from "./ApiGoogleSheet.js";
import ConstGoggleSheet from "./ConstGoggleSheet.js";
const range = ConstGoggleSheet.reg_Areas.range.Atributos;
const sheetId = ConstGoggleSheet.reg_Areas.sheetId;
const Sectores = async () => {
    try {
        const Data = new ApiGoogleSheet({ range: range, sheetId: sheetId });
        let response = await Data.getDataInJSON();
        return response
      } catch (e) {
        console.log(e);
      }
}
export default Sectores