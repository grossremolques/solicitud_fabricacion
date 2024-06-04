import ApiGoogleSheet from "./ApiGoogleSheet.js";
import ConstGoggleSheet from "./ConstGoggleSheet.js";
const range = ConstGoggleSheet.reg_Usuarios.range.Registro;
const sheetId = ConstGoggleSheet.reg_Usuarios.sheetId;

class User {
  async getData() {
    try {
      const Data = new ApiGoogleSheet({ range: range, sheetId: sheetId });
      let response = await Data.getDataInJSON();
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  async getUserByEmail() {
    try {
      let email = await ApiGoogleSheet.getEmail();
      let data = await this.getData();
      let user = data.find(item => item.email_empresa === email);
      return user !== undefined ? user : false;
      
    } catch (e) {
      console.log(e);
    }
  }
}
export default User;
