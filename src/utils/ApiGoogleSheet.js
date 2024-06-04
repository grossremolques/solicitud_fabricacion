import { objectToArray, arrayToObject } from "./Tools.js";
class ApiGoogleSheet {
  constructor({ range, sheetId }) {
    this.range = range;
    this.sheetId = sheetId;
  }
  /* Obtiene los datos de la hoja de cálculo ingresada, en el rango ingresado */
  async getResponse() {
    let response;
    try {
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: this.range,
      });
      return response;
    } catch (e) {
      console.log("error getResponse()", e);
    }
  }
  async getDataInJSON() {
    try {
      let response = await this.getResponse(this.range, this.sheetId);
      if (response && response.status === 200) {
        let data = arrayToObject(response.result.values);
        return data;
      }
    } catch (e) {
      console.log("error getDataInJSON()", e);
    }
  }
  static async getEmail() {
    try {
      let response = await gapi.client.gmail.users.getProfile({
        userId: "me",
      });
      return response.result.emailAddress;
    } catch (e) {
      console.log("no se ha podido obtener el email", e);
    }
  }
  async postData(data) {
    let headers = await this.getHeaders()
    let newData = objectToArray(data, headers)
    console.log(newData)
    try {
      let response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: this.sheetId,
        range: this.range,
        includeValuesInResponse: true,
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: [newData],
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  async getHeaders() {
    let response = await this.getResponse(this.range, this.sheetId);
    response = response.result.values;
    let headers = response[0];
    headers = headers.map(item => item.toLocaleLowerCase())
    return headers
  }
  /* static async postData(range, data, sheetId) {
    try {
      let response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        includeValuesInResponse: true,
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: data,
        },
      });
      return response;
    } catch (e) {
      console.log(e)
      
    }
  } */
  /* static async getHeaders(range, sheetId) {
    let response = await this.getResponse(range, sheetId);
    response = response.result.values;
    let headers = response[0];
    headers = headers.map(item => item.toLocaleLowerCase())
    return headers
  } */
  /* static async updateData(data,sheetId) {
    try {
      let response = await gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: sheetId,
        resource: {
          data: data,
          includeValuesInResponse: false,
          responseDateTimeRenderOption: "FORMATTED_STRING",
          responseValueRenderOption: "FORMATTED_VALUE",
          valueInputOption: "USER_ENTERED"
        }
      })
      return response
    } catch (e) {
      console.log(e)
    }
  } */
  /* static createdDataToUpdate(arr, sheet) {
    //arr = [{row, colum, value}]
    let data = new Array()
    for (let item of arr) {
      data.push({
        majorDimension: "ROWS",
        range: `${sheet}!R${item.row}C${item.column}`,
        values: [
          [item.value]
        ]
      })
    }
    return data
  } */
  /*  */
  /* static async updateRow(sheetId, myRange, data) {
    try {
      let response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: myRange,
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "RAW",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: [data]
        }
      })
      return response
    } catch (e) {
      console.log(e)
    }
  } */
}
export default ApiGoogleSheet;
